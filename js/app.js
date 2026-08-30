document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTicker();
  initCountdown();
  initTracks();
  initSchedule();
  initVerticals();
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
   CODE HEIST COUNTDOWN TIMER
   -------------------------------------------------------------------------- */
function initCountdown() {
  const targetDate = new Date('2026-09-18T09:00:00+05:30').getTime();

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
  }

  update();
  setInterval(update, 1000);
}
function initTicker() {
  const track = document.getElementById('tickerTrack');
  if (!track) return;

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
   TRACKS GRID RENDERING
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
   SCHEDULE TIMELINE RENDERING
   -------------------------------------------------------------------------- */
function initSchedule() {
  const container = document.getElementById('scheduleTimeline');
  if (!container || !THRYVE_DATA.schedule) return;

  container.innerHTML = THRYVE_DATA.schedule.map(s => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-content-box">
        <div class="timeline-time">${s.time}</div>
        <h4 class="timeline-title">${s.title}</h4>
        <p class="timeline-desc">${s.desc}</p>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   VERTICALS GRID RENDERING
   -------------------------------------------------------------------------- */
function initVerticals() {
  const container = document.getElementById('verticalsGrid');
  if (!container) return;

  container.innerHTML = THRYVE_DATA.verticals.map(v => `
    <div class="vertical-card" onclick="filterByVertical('${v.id}')">
      <div>
        <div class="vertical-icon-box">${v.icon}</div>
        <h3 class="vertical-title">${v.title}</h3>
        <p class="vertical-desc">${v.desc}</p>
        <div class="vertical-tags">
          ${v.tags.map(t => `<span class="vertical-pill">${t}</span>`).join('')}
        </div>
      </div>
      <div>
        <a href="#events" class="vertical-link">
          Explore Lineup →
        </a>
      </div>
    </div>
  `).join('');
}

function filterByVertical(vertId) {
  const tabBtn = document.querySelector(`.dash-tab-btn[data-category="${vertId}"]`);
  if (tabBtn) {
    tabBtn.click();
    const eventSection = document.getElementById('events');
    if (eventSection) {
      eventSection.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

/* --------------------------------------------------------------------------
   ARTISTS / HEADLINERS SHOWCASE
   -------------------------------------------------------------------------- */
function initArtists() {
  const container = document.getElementById('artistsGrid');
  if (!container) return;

  container.innerHTML = THRYVE_DATA.artists.map(a => `
    <div class="artist-card">
      <div class="artist-img-wrapper">
        <img src="${a.img}" alt="${a.name}" class="artist-img" loading="lazy" />
        <div class="artist-overlay">
          <span class="artist-badge">${a.badge}</span>
        </div>
      </div>
      <div class="artist-info">
        <h4 class="artist-name">${a.name}</h4>
        <p class="artist-genre">${a.genre}</p>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   FAQ ACCORDION
   -------------------------------------------------------------------------- */
function initFaq() {
  const container = document.getElementById('faqContainer');
  if (!container) return;

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
  const inputs = ['passNameInput', 'passCollegeInput', 'passRollInput', 'passTierSelect', 'passEventSelect'];
  inputs.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', updatePassPreview);
      el.addEventListener('change', updatePassPreview);
    }
  });

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
