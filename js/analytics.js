/**
 * THRYVE REALTIME ANALYTICS TRACKER
 * Ultra-lightweight, zero-dependency analytics client
 * Accurately tracks page views, unique visitors, and registration CTA click events.
 */

(function () {
  'use strict';

  const STORAGE_KEY_VID = 'thryve_analytics_vid';
  const STORAGE_KEY_LOCAL_STATS = 'thryve_local_stats';
  const TRACK_API_URL = '/api/analytics/track';

  // 1. Manage Unique Visitor ID
  function getVisitorId() {
    let vid = null;
    try {
      vid = localStorage.getItem(STORAGE_KEY_VID);
      if (!vid) {
        vid = 'v_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
        localStorage.setItem(STORAGE_KEY_VID, vid);
      }
    } catch (e) {
      vid = 'v_fallback_' + Date.now();
    }
    return vid;
  }

  // 2. Determine CTA Source Context
  function determineCtaSource(element) {
    if (!element) return 'other';
    
    // Check closest containers
    if (element.closest('.site-header, header, .nav-container')) return 'navbar';
    if (element.closest('.hero-section, #hero, .hero-content')) return 'hero_cta';
    if (element.closest('.spotlight-card, .spotlight-section, #codeheist')) return 'spotlight_card';
    if (element.closest('.event-card, #eventsGrid, #events')) return 'events_list';
    if (element.closest('.reg-standalone-page, .reg-content-box')) return 'registration_page';
    if (element.closest('.cta-banner, footer, .site-footer')) return 'bottom_banner';
    
    // Check ID or classes
    const id = element.id || '';
    const className = element.className || '';
    if (id === 'mainRegisterBtn' || className.includes('reg-btn-main')) return 'registration_page';
    if (className.includes('btn-pill-main')) return 'hero_cta';
    if (className.includes('btn-book-pass')) return 'events_list';
    if (className.includes('btn-heist-register')) return 'spotlight_card';

    return 'other';
  }

  // 3. Dispatch Tracking Event
  function sendEvent(eventType, metadata = {}) {
    const payload = {
      event: eventType,
      visitorId: getVisitorId(),
      page: window.location.pathname || '/',
      title: document.title,
      referrer: document.referrer || '',
      cta: metadata.cta || null,
      timestamp: new Date().toISOString()
    };

    // Update client-side offline storage snapshot
    try {
      const local = JSON.parse(localStorage.getItem(STORAGE_KEY_LOCAL_STATS) || '{"views":0,"clicks":0}');
      if (eventType === 'page_view') local.views = (local.views || 0) + 1;
      if (eventType === 'register_click') local.clicks = (local.clicks || 0) + 1;
      localStorage.setItem(STORAGE_KEY_LOCAL_STATS, JSON.stringify(local));
    } catch (e) {}

    // Send payload to backend server
    try {
      if (navigator.sendBeacon) {
        const blob = new Blob([JSON.stringify(payload)], { type: 'application/json' });
        navigator.sendBeacon(TRACK_API_URL, blob);
      } else {
        fetch(TRACK_API_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
          keepalive: true
        }).catch(() => {});
      }
    } catch (err) {
      // Fallback standard fetch
      fetch(TRACK_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      }).catch(() => {});
    }
  }

  // 4. Track Page View
  function trackPageView() {
    // Avoid double counting on duplicate script execution
    if (window.__thryve_pv_tracked) return;
    window.__thryve_pv_tracked = true;

    // Do not count the private /data dashboard page as a general visitor impression
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('data.html') || currentPath === '/data' || currentPath === '/data/') {
      return;
    }

    sendEvent('page_view');
  }

  // 5. Global Click Delegation for Register CTAs
  function initRegisterClickTracking() {
    document.addEventListener('click', (e) => {
      // Look up target button or anchor link
      const target = e.target.closest('a, button, [role="button"]');
      if (!target) return;

      const href = (target.getAttribute('href') || '').toLowerCase();
      const text = (target.innerText || '').toLowerCase();
      const id = (target.id || '').toLowerCase();
      const className = (typeof target.className === 'string' ? target.className : '').toLowerCase();

      const isMacbease = href.includes('macbease.com');
      const isRegistrationLink = href.includes('/registration') || href.includes('registration.html');
      const isRegisterButton = className.includes('js-register-trigger') ||
                               className.includes('reg-btn-main') ||
                               className.includes('btn-heist-register') ||
                               className.includes('btn-book-pass') ||
                               id.includes('register') ||
                               text.includes('register') ||
                               text.includes('book pass');

      if (isMacbease || isRegistrationLink || isRegisterButton) {
        const ctaSource = determineCtaSource(target);
        sendEvent('register_click', { cta: ctaSource, text: text.trim().substring(0, 30) });
      }
    }, { capture: true });
  }

  // 6. Expose Global API for programmatic tracking if needed
  window.THRYVE_TRACKER = {
    trackPageView,
    trackRegisterClick: (source) => sendEvent('register_click', { cta: source || 'manual' }),
    getVisitorId
  };

  // 7. Auto-initialize
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      trackPageView();
      initRegisterClickTracking();
    });
  } else {
    trackPageView();
    initRegisterClickTracking();
  }
})();
