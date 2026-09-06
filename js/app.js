document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTicker();
  initCountdown();
  initTracks();
  initSchedule();
  initRounds();
  initScoreSheet();
  initMentors();
  initSponsors();
  initRules();
  initEvents();
  initFaq();
  initPassListeners();
});

/* --------------------------------------------------------------------------
   NAVBAR & MOBILE MENU
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    // Close on link click
    const links = navMenu.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}

/* --------------------------------------------------------------------------
   CODE HEIST COUNTDOWN TIMER (5:00 PM on 18 Sep 2026)
   -------------------------------------------------------------------------- */
function initCountdown() {
  const targetIso = (THRYVE_DATA.eventMeta && THRYVE_DATA.eventMeta.targetIso) 
    ? THRYVE_DATA.eventMeta.targetIso 
    : '2026-09-18T17:00:00+05:30';
  
  const targetDate = new Date(targetIso).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById('cdDays');
    const hoursEl = document.getElementById('cdHours');
    const minsEl = document.getElementById('cdMins');
    const secsEl = document.getElementById('cdSecs');

    if (diff <= 0) {
      if (daysEl) daysEl.innerText = '00';
      if (hoursEl) hoursEl.innerText = '00';
      if (minsEl) minsEl.innerText = '00';
      if (secsEl) secsEl.innerText = '00';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const mins = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const secs = Math.floor((diff % (1000 * 60)) / 1000);

    if (daysEl) daysEl.innerText = String(days).padStart(2, '0');
    if (hoursEl) hoursEl.innerText = String(hours).padStart(2, '0');
    if (minsEl) minsEl.innerText = String(mins).padStart(2, '0');
    if (secsEl) secsEl.innerText = String(secs).padStart(2, '0');

    const heroTimerEl = document.getElementById('heroCountdownTimer');
    if (heroTimerEl) {
      if (diff <= 0) {
        heroTimerEl.innerText = '00d 00h 00m 00s';
      } else {
        heroTimerEl.innerText = `${String(days).padStart(2, '0')}d ${String(hours).padStart(2, '0')}h ${String(mins).padStart(2, '0')}m ${String(secs).padStart(2, '0')}s`;
      }
    }
  }

  update();
  setInterval(update, 1000);
}

/* --------------------------------------------------------------------------
   LIVE TICKER BAR
   -------------------------------------------------------------------------- */
function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track || !THRYVE_DATA.ticker) return;

  const itemsHtml = THRYVE_DATA.ticker.map(item => `
    <div class="ticker-item">
      <span class="ticker-tag ${item.type}">${item.tag}</span>
      <span class="ticker-title">${item.title}</span>
      <span class="ticker-detail">${item.detail}</span>
      <span class="ticker-divider">/</span>
    </div>
  `).join('');

  // Duplicate for seamless infinite loop
  track.innerHTML = itemsHtml + itemsHtml;
}

/* --------------------------------------------------------------------------
   PROBLEM TRACKS RENDERING
   -------------------------------------------------------------------------- */
function initTracks() {
  const container = document.getElementById('tracksGrid');
  if (!container || !THRYVE_DATA.tracks) return;

  container.innerHTML = THRYVE_DATA.tracks.map(t => `
    <div class="track-card">
      <div class="track-icon-box">${t.icon}</div>
      <h3 class="track-title">${t.title}</h3>
      <p class="track-desc">${t.desc}</p>
      <div class="track-tags">
        ${t.tags.map(tag => `<span class="track-pill">${tag}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   MINUTE-TO-MINUTE SCHEDULE TIMELINE
   -------------------------------------------------------------------------- */
function initSchedule() {
  const container = document.getElementById('scheduleTimeline');
  if (!container || !THRYVE_DATA.schedule) return;

  container.innerHTML = THRYVE_DATA.schedule.map(s => {
    const isSafeZone = s.phase === 'overnight';
    const isAwards = s.phase === 'awards';
    const badgeClass = isSafeZone ? 'timeline-badge-pill safe-badge' : 'timeline-badge-pill';
    const markerClass = isSafeZone ? 'timeline-marker safe' : 'timeline-marker';

    return `
      <div class="timeline-item">
        <div class="${markerClass}"></div>
        <div class="timeline-content-box" style="${isSafeZone ? 'border-color: #86EFAC; background: #F0FDF4;' : ''}">
          <div class="timeline-header-row">
            <span class="timeline-time">${s.time}</span>
            <span class="${badgeClass}">${s.badge}</span>
          </div>
          <h4 class="timeline-title" style="${isAwards ? 'color: #DC2626;' : ''}">${s.title}</h4>
          <p class="timeline-desc">${s.desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

/* --------------------------------------------------------------------------
   EVALUATION ROUNDS RENDERING
   -------------------------------------------------------------------------- */
function initRounds() {
  const container = document.getElementById('roundsGrid');
  if (!container || !THRYVE_DATA.rounds) return;

  container.innerHTML = THRYVE_DATA.rounds.map(r => `
    <div class="round-card">
      <div>
        <div class="round-top-row">
          <span class="round-num-pill">STAGE ${r.number}</span>
          <span class="round-status-pill">${r.status}</span>
        </div>
        <h4 class="round-title">${r.title}</h4>
        <div class="round-timing">⏱️ ${r.timing}</div>
        <p class="round-desc">${r.desc}</p>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   100-MARK JUDGE SCORE SHEET RENDERING
   -------------------------------------------------------------------------- */
function initScoreSheet() {
  const container = document.getElementById('scoreGrid');
  if (!container || !THRYVE_DATA.scoreSheet) return;

  container.innerHTML = THRYVE_DATA.scoreSheet.map(item => {
    const percent = Math.round((item.marks / 20) * 100);
    return `
      <div class="score-card">
        <div class="score-card-top">
          <span class="score-card-title">${item.criteria}</span>
          <span class="score-marks-tag">${item.marks} MARKS</span>
        </div>
        <div class="score-bar-bg">
          <div class="score-bar-fill" style="width: ${percent}%;"></div>
        </div>
        <p class="score-card-desc">${item.desc}</p>
      </div>
    `;
  }).join('');
}

/* --------------------------------------------------------------------------
   DISTINGUISHED GUESTS & MENTORS RENDERING
   -------------------------------------------------------------------------- */
function initMentors() {
  const container = document.getElementById('mentorsGrid');
  if (!container || !THRYVE_DATA.mentors) return;

  container.innerHTML = THRYVE_DATA.mentors.map(m => `
    <div class="mentor-card">
      <div>
        <div class="mentor-header">
          <div class="mentor-avatar">${m.image ? `<img src="${m.image}" alt="${m.name}" class="mentor-avatar-img" />` : m.avatarText}</div>
          <div class="mentor-meta">
            <h3 class="mentor-name">${m.name}</h3>
            <div class="mentor-role">${m.role}</div>
            <span class="mentor-company-badge">${m.company}</span>
          </div>
        </div>

        <div class="mentor-headline">⚡ ${m.headline}</div>

        <div class="mentor-exp-box">
          <div class="mentor-exp-title">Track Record & Background</div>
          <ul class="mentor-exp-list">
            ${m.experience.map(exp => `<li class="mentor-exp-item">${exp}</li>`).join('')}
          </ul>
        </div>

        <div class="mentor-skills-row">
          ${m.skills.map(skill => `<span class="mentor-skill-pill">${skill}</span>`).join('')}
        </div>
      </div>

      <div class="mentor-footer-row">
        <div class="mentor-education">🎓 ${m.education}</div>
        <a href="${m.linkedin}" target="_blank" rel="noopener noreferrer" class="mentor-linkedin-btn">
          <span>in</span> Connect on LinkedIn
        </a>
      </div>
    </div>
  `).join('');
}

function initSponsors() {
  const container = document.getElementById('sponsorsGrid');
  if (!container || !THRYVE_DATA.sponsors) return;

  container.innerHTML = THRYVE_DATA.sponsors.map(s => `
    <div class="sponsor-card ${s.id}-card">
      <div>
        <div class="sponsor-card-top">
          ${s.logo 
            ? `<div class="sponsor-brand-box"><img src="${s.logo}" alt="${s.name}" class="sponsor-logo-img" /></div>` 
            : `<div class="sponsor-icon">${s.icon}</div>`}
          <span class="sponsor-status-badge ${s.statusType}">${s.status}</span>
        </div>
        <h3 class="sponsor-name">${s.name}</h3>
        ${s.tagline ? `<div class="sponsor-tagline">${s.tagline}</div>` : ''}
        <div class="sponsor-title">${s.title}</div>
        <p class="sponsor-desc">${s.desc}</p>
      </div>

      <div class="sponsor-perks-box">
        ${s.perks.map(perk => `<div class="sponsor-perk-item">✓ ${perk}</div>`).join('')}
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   RULES & REGULATIONS RENDERING
   -------------------------------------------------------------------------- */
function initRules() {
  const container = document.getElementById('rulesGrid');
  if (!container || !THRYVE_DATA.rules) return;

  container.innerHTML = THRYVE_DATA.rules.map((rule, idx) => `
    <div class="rule-card">
      <div class="rule-num">RULE #${idx + 1}</div>
      <h4 class="rule-title">${rule.title}</h4>
      <p class="rule-desc">${rule.desc}</p>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaq() {
  const container = document.getElementById('faqContainer');
  if (!container || !THRYVE_DATA.faqs) return;

  container.innerHTML = THRYVE_DATA.faqs.map((f, idx) => `
    <div class="faq-item ${idx === 0 ? 'active' : ''}">
      <button class="faq-question" onclick="toggleFaq(this)">
        <span>${f.q}</span>
        <span class="faq-icon">↓</span>
      </button>
      <div class="faq-answer">
        <p>${f.a}</p>
      </div>
    </div>
  `).join('');
}

function toggleFaq(btn) {
  const item = btn.closest('.faq-item');
  const wasActive = item.classList.contains('active');

  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));

  if (!wasActive) {
    item.classList.add('active');
  }
}

/* --------------------------------------------------------------------------
   PASS INPUT LISTENERS
   -------------------------------------------------------------------------- */
function initPassListeners() {
  // Modal backdrop click close
  const passModal = document.getElementById('passModal');
  if (passModal) {
    passModal.addEventListener('click', (e) => {
      if (e.target === passModal) closePassModal();
    });
  }

  const recruitModal = document.getElementById('recruitModal');
  if (recruitModal) {
    recruitModal.addEventListener('click', (e) => {
      if (e.target === recruitModal) closeRecruitModal();
    });
  }
}

/* --------------------------------------------------------------------------
   TOAST NOTIFICATION MANAGER
   -------------------------------------------------------------------------- */
function showToast(message) {
  let container = document.getElementById('toastContainer');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toastContainer';
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast-msg';
  toast.innerHTML = `
    <span class="toast-icon">⚡</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
