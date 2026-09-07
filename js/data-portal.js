/**
 * THRYVE EXECUTIVE COMMAND & ANALYTICS PORTAL CONTROLLER
 * Manages live dashboard rendering, real-time polling, and data export features.
 * Authenticates dynamically via the backend security engine.
 */

(function () {
  'use strict';

  const AUTH_SESSION_KEY = 'thryve_admin_auth_state';
  const PASS_STORAGE_KEY = 'thryve_admin_session_key';
  const API_AUTH_URL = '/api/analytics/auth';
  const API_DATA_URL = '/api/analytics/data';
  const API_RESET_URL = '/api/analytics/reset';
  const API_TRACK_URL = '/api/analytics/track';

  // Client-side offline fallback hash (SHA-256)
  const FALLBACK_HASH = '5480a1450bf6baf7da27ba90884f100c31c09863bb5f7ff30b084642fe511b87';

  let currentPasscode = '';
  let autoRefreshInterval = null;
  let isAutoRefreshActive = true;
  let cachedData = null;

  // DOM Elements
  let lockScreen, dashboardScreen, passForm, passInput, toggleEyeBtn, lockError;
  let btnSyncNow, btnLockTerminal, autoRefreshCheckbox, lastUpdatedEl, serverTimeEl;
  let statTotalViews, statUniqueVisitors, statRegisterClicks, statConversionRate, statConversionFill;
  let statConfirmedTeams, statRecruitApps, breakdownContainer, eventFeedContainer;
  let btnExportCsv, btnExportJson, btnResetData, btnSimulateClick;

  document.addEventListener('DOMContentLoaded', () => {
    initElements();
    setupEventListeners();
    checkExistingSession();
  });

  function initElements() {
    lockScreen = document.getElementById('lockScreen');
    dashboardScreen = document.getElementById('dashboardScreen');
    passForm = document.getElementById('passForm');
    passInput = document.getElementById('passInput');
    toggleEyeBtn = document.getElementById('toggleEyeBtn');
    lockError = document.getElementById('lockError');

    btnSyncNow = document.getElementById('btnSyncNow');
    btnLockTerminal = document.getElementById('btnLockTerminal');
    autoRefreshCheckbox = document.getElementById('autoRefreshCheckbox');
    lastUpdatedEl = document.getElementById('lastUpdatedEl');
    serverTimeEl = document.getElementById('serverTimeEl');

    statTotalViews = document.getElementById('statTotalViews');
    statUniqueVisitors = document.getElementById('statUniqueVisitors');
    statRegisterClicks = document.getElementById('statRegisterClicks');
    statConversionRate = document.getElementById('statConversionRate');
    statConversionFill = document.getElementById('statConversionFill');
    statConfirmedTeams = document.getElementById('statConfirmedTeams');
    statRecruitApps = document.getElementById('statRecruitApps');

    breakdownContainer = document.getElementById('breakdownContainer');
    eventFeedContainer = document.getElementById('eventFeedContainer');

    btnExportCsv = document.getElementById('btnExportCsv');
    btnExportJson = document.getElementById('btnExportJson');
    btnResetData = document.getElementById('btnResetData');
    btnSimulateClick = document.getElementById('btnSimulateClick');
  }

  function setupEventListeners() {
    // 1. Password Form Submission
    if (passForm) {
      passForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const entered = passInput.value.trim();
        await attemptUnlock(entered);
      });
    }

    // 2. Toggle Password Visibility
    if (toggleEyeBtn && passInput) {
      toggleEyeBtn.addEventListener('click', () => {
        const type = passInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passInput.setAttribute('type', type);
        toggleEyeBtn.innerText = type === 'password' ? '👁️' : '🔒';
      });
    }

    // 3. Lock Terminal
    if (btnLockTerminal) {
      btnLockTerminal.addEventListener('click', () => {
        lockTerminal();
      });
    }

    // 4. Sync Now
    if (btnSyncNow) {
      btnSyncNow.addEventListener('click', () => {
        btnSyncNow.innerText = '⏳ Syncing...';
        fetchAnalytics(true).then(() => {
          setTimeout(() => {
            btnSyncNow.innerText = '🔄 Sync Now';
          }, 400);
        });
      });
    }

    // 5. Auto Refresh Toggle
    if (autoRefreshCheckbox) {
      autoRefreshCheckbox.addEventListener('change', (e) => {
        isAutoRefreshActive = e.target.checked;
        if (isAutoRefreshActive) {
          startAutoRefresh();
          showToast('🟢 Auto-sync activated (5s interval)');
        } else {
          stopAutoRefresh();
          showToast('⏸️ Auto-sync paused');
        }
      });
    }

    // 6. Export CSV
    if (btnExportCsv) {
      btnExportCsv.addEventListener('click', exportCsv);
    }

    // 7. Export JSON
    if (btnExportJson) {
      btnExportJson.addEventListener('click', exportJson);
    }

    // 8. Reset Analytics
    if (btnResetData) {
      btnResetData.addEventListener('click', handleResetData);
    }

    // 9. Simulate Register Click Test
    if (btnSimulateClick) {
      btnSimulateClick.addEventListener('click', simulateTestClick);
    }
  }

  // Check if user is already authenticated in this session
  function checkExistingSession() {
    const isAuthed = sessionStorage.getItem(AUTH_SESSION_KEY) === 'true';
    const savedKey = sessionStorage.getItem(PASS_STORAGE_KEY);
    if (isAuthed && savedKey) {
      currentPasscode = savedKey;
      unlockDashboard();
    } else {
      showLockScreen();
    }
  }

  // Helper: SHA-256 for browser offline fallback
  async function computeSha256(text) {
    try {
      const msgBuffer = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
    } catch (e) {
      return '';
    }
  }

  // Unlock attempt handler
  async function attemptUnlock(passcode) {
    if (!passcode) return;

    let isAuthenticated = false;

    try {
      // 1. Authenticate against Backend API
      const res = await fetch(API_AUTH_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: passcode })
      });

      if (res.ok) {
        const data = await res.json();
        if (data.authenticated || data.success) {
          isAuthenticated = true;
        }
      }
    } catch (err) {
      // 2. Offline fallback via secure SHA-256 comparison
      const hex = await computeSha256(passcode);
      if (hex === FALLBACK_HASH) {
        isAuthenticated = true;
      }
    }

    if (isAuthenticated) {
      currentPasscode = passcode;
      sessionStorage.setItem(AUTH_SESSION_KEY, 'true');
      sessionStorage.setItem(PASS_STORAGE_KEY, passcode);
      if (lockError) lockError.classList.remove('visible');
      unlockDashboard();
    } else {
      if (lockError) {
        lockError.innerText = '⛔ ACCESS DENIED: Invalid Security Passcode';
        lockError.classList.remove('visible');
        void lockError.offsetWidth; // Trigger reflow for animation
        lockError.classList.add('visible');
      }
      if (passInput) {
        passInput.value = '';
        passInput.focus();
      }
    }
  }

  function showLockScreen() {
    stopAutoRefresh();
    if (lockScreen) lockScreen.classList.remove('hidden');
    if (dashboardScreen) dashboardScreen.classList.add('hidden');
    if (passInput) passInput.focus();
  }

  function unlockDashboard() {
    if (lockScreen) lockScreen.classList.add('hidden');
    if (dashboardScreen) dashboardScreen.classList.remove('hidden');
    fetchAnalytics();
    if (isAutoRefreshActive) {
      startAutoRefresh();
    }
  }

  function lockTerminal() {
    sessionStorage.removeItem(AUTH_SESSION_KEY);
    currentPasscode = '';
    showToast('🔒 Terminal Locked');
    showLockScreen();
  }

  // Fetch Live Analytics from Backend
  async function fetchAnalytics(isManual = false) {
    try {
      const res = await fetch(API_DATA_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${currentPasscode}`
        },
        body: JSON.stringify({ password: currentPasscode })
      });

      if (!res.ok) {
        if (res.status === 401) {
          lockTerminal();
          return;
        }
        throw new Error('Server returned ' + res.status);
      }

      const data = await res.json();
      cachedData = data;
      renderDashboard(data);
      if (isManual) showToast('✅ Intelligence Data Synchronized');
    } catch (err) {
      console.warn('Backend fetch fallback to local stats:', err);
      // Fallback rendering with local storage data
      renderFallbackData();
    }
  }

  // Render Fallback if backend offline
  function renderFallbackData() {
    try {
      const local = JSON.parse(localStorage.getItem('thryve_local_stats') || '{"views":0,"clicks":0}');
      const data = {
        totalViews: local.views || 0,
        uniqueVisitors: Math.max(1, local.views || 0),
        registerClicks: local.clicks || 0,
        conversionRate: local.views > 0 ? ((local.clicks / local.views) * 100).toFixed(1) + '%' : '0.0%',
        ctaBreakdown: {
          hero_cta: Math.round(local.clicks * 0.5),
          navbar: Math.round(local.clicks * 0.25),
          spotlight_card: Math.round(local.clicks * 0.15),
          registration_page: Math.round(local.clicks * 0.1),
          events_list: 0,
          bottom_banner: 0,
          other: 0
        },
        recentEvents: [
          { type: 'page_view', page: '/index.html', timestamp: new Date().toISOString() }
        ],
        registrationsCount: 0,
        recruitmentsCount: 0,
        lastUpdated: new Date().toISOString()
      };
      cachedData = data;
      renderDashboard(data);
    } catch (e) {}
  }

  // Render Dashboard Elements
  function renderDashboard(data) {
    // 1. Core KPIs
    animateCounter(statTotalViews, data.totalViews || 0);
    if (statUniqueVisitors) statUniqueVisitors.innerText = formatNumber(data.uniqueVisitors || 0);
    animateCounter(statRegisterClicks, data.registerClicks || 0);

    const conversionStr = data.conversionRate || '0.0%';
    if (statConversionRate) statConversionRate.innerText = conversionStr;
    const numConv = parseFloat(conversionStr) || 0;
    if (statConversionFill) statConversionFill.style.width = Math.min(100, Math.max(0, numConv)) + '%';

    if (statConfirmedTeams) statConfirmedTeams.innerText = formatNumber(data.registrationsCount || 0);
    if (statRecruitApps) statRecruitApps.innerText = formatNumber(data.recruitmentsCount || 0);

    // 2. Timestamps
    if (lastUpdatedEl) {
      const dt = data.lastUpdated ? new Date(data.lastUpdated) : new Date();
      lastUpdatedEl.innerText = `Updated: ${dt.toLocaleTimeString()} (${dt.toLocaleDateString()})`;
    }
    if (serverTimeEl) {
      serverTimeEl.innerText = new Date().toLocaleTimeString();
    }

    // 3. CTA Breakdown
    renderCtaBreakdown(data.ctaBreakdown || {}, data.registerClicks || 0);

    // 4. Live Event Feed
    renderEventFeed(data.recentEvents || []);
  }

  // Render CTA Breakdown Bars
  function renderCtaBreakdown(breakdown, totalClicks) {
    if (!breakdownContainer) return;

    const ctaLabels = {
      hero_cta: { label: 'Hero Section CTA ("Register Now →")', icon: '🚀' },
      navbar: { label: 'Top Navigation Register Button', icon: '🧭' },
      spotlight_card: { label: 'Spotlight / Pass Card Register', icon: '🎫' },
      registration_page: { label: 'Dedicated /registration Page CTA', icon: '📝' },
      events_list: { label: 'Event Cards "Book Pass" Button', icon: '🎪' },
      bottom_banner: { label: 'Bottom Banner CTA', icon: '⚡' },
      other: { label: 'Direct Link / Other Elements', icon: '🔗' }
    };

    const keys = Object.keys(ctaLabels);
    const html = keys.map(key => {
      const count = breakdown[key] || 0;
      const pct = totalClicks > 0 ? Math.round((count / totalClicks) * 100) : 0;
      const info = ctaLabels[key];

      return `
        <div class="cyber-breakdown-item">
          <div class="cyber-breakdown-row">
            <span class="cyber-breakdown-name">
              <span>${info.icon}</span>
              <span>${info.label}</span>
            </span>
            <span class="cyber-breakdown-count">${count} clicks (${pct}%)</span>
          </div>
          <div class="cyber-bar-track">
            <div class="cyber-bar-fill" style="width: ${pct}%;"></div>
          </div>
        </div>
      `;
    }).join('');

    breakdownContainer.innerHTML = html;
  }

  // Render Recent Activity Stream
  function renderEventFeed(events) {
    if (!eventFeedContainer) return;

    if (!events || events.length === 0) {
      eventFeedContainer.innerHTML = `
        <div style="text-align: center; padding: 24px; color: var(--cyber-text-dim);">
          No recent activity recorded yet.
        </div>
      `;
      return;
    }

    const html = events.slice(0, 30).map(evt => {
      const isClick = evt.type === 'register_click';
      const badgeClass = isClick ? 'click' : 'view';
      const badgeLabel = isClick ? 'REGISTER CLICK' : 'SITE VIEW';
      const desc = isClick
        ? `Clicked Register via <strong>${evt.cta || 'button'}</strong>`
        : `Page visit on <code>${evt.page || '/'}</code>`;
      const timeStr = getRelativeTime(evt.timestamp);

      return `
        <div class="cyber-event-item">
          <div class="cyber-event-left">
            <span class="cyber-event-badge ${badgeClass}">${badgeLabel}</span>
            <span class="cyber-event-desc">${desc}</span>
          </div>
          <span class="cyber-event-time">${timeStr}</span>
        </div>
      `;
    }).join('');

    eventFeedContainer.innerHTML = html;
  }

  // Helper: Number Animation
  function animateCounter(el, targetVal) {
    if (!el) return;
    const current = parseInt(el.getAttribute('data-val') || '0', 10);
    el.setAttribute('data-val', targetVal);

    if (current === targetVal) {
      el.innerText = formatNumber(targetVal);
      return;
    }

    const duration = 400;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const val = Math.floor(current + (targetVal - current) * progress);
      el.innerText = formatNumber(val);

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.innerText = formatNumber(targetVal);
      }
    }
    requestAnimationFrame(step);
  }

  function formatNumber(num) {
    return new Intl.NumberFormat('en-IN').format(num);
  }

  function getRelativeTime(isoString) {
    if (!isoString) return 'Just now';
    const diff = Date.now() - new Date(isoString).getTime();
    const secs = Math.floor(diff / 1000);
    if (secs < 10) return 'Just now';
    if (secs < 60) return `${secs}s ago`;
    const mins = Math.floor(secs / 60);
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return new Date(isoString).toLocaleDateString();
  }

  // Auto Refresh Controller
  function startAutoRefresh() {
    stopAutoRefresh();
    autoRefreshInterval = setInterval(() => {
      fetchAnalytics(false);
    }, 5000);
  }

  function stopAutoRefresh() {
    if (autoRefreshInterval) {
      clearInterval(autoRefreshInterval);
      autoRefreshInterval = null;
    }
  }

  // Simulate test click event for immediate verification
  async function simulateTestClick() {
    try {
      showToast('⚡ Dispatching test register click...');
      await fetch(API_TRACK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          event: 'register_click',
          cta: 'hero_cta',
          page: '/data'
        })
      });
      fetchAnalytics(true);
    } catch (e) {
      showToast('Simulation failed');
    }
  }

  // Handle Reset Analytics
  async function handleResetData() {
    const confirmed = confirm('⚠️ Are you sure you want to reset all site view and register click counters? This cannot be undone.');
    if (!confirmed) return;

    try {
      const res = await fetch(API_RESET_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: currentPasscode })
      });
      const data = await res.json();
      if (data.success) {
        showToast('🔄 Analytics counters reset to 0');
        fetchAnalytics(true);
      } else {
        showToast('❌ Reset failed: ' + (data.error || 'Unauthorized'));
      }
    } catch (e) {
      showToast('❌ Failed to connect to server');
    }
  }

  // Export CSV
  function exportCsv() {
    if (!cachedData) return showToast('No data available to export');
    const rows = [
      ['Metric', 'Value'],
      ['Total Site Views', cachedData.totalViews || 0],
      ['Unique Visitors', cachedData.uniqueVisitors || 0],
      ['Register Button Clicks', cachedData.registerClicks || 0],
      ['Conversion Rate', cachedData.conversionRate || '0.0%'],
      ['Teams Registered', cachedData.registrationsCount || 0],
      ['Crew Applications', cachedData.recruitmentsCount || 0],
      ['Export Timestamp', new Date().toISOString()]
    ];

    const csvContent = 'data:text/csv;charset=utf-8,' + rows.map(e => e.join(',')).join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `THRYVE_Analytics_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 CSV report downloaded');
  }

  // Export JSON
  function exportJson() {
    if (!cachedData) return showToast('No data available to export');
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(cachedData, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `THRYVE_Analytics_${Date.now()}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('📥 JSON backup downloaded');
  }

  // Simple Toast UI
  function showToast(msg) {
    let toast = document.getElementById('cyberToast');
    if (!toast) {
      toast = document.createElement('div');
      toast.id = 'cyberToast';
      toast.className = 'cyber-toast';
      document.body.appendChild(toast);
    }
    toast.innerText = msg;
    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }

})();
