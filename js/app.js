/**
 * THRYVE PLATFORM CONTROLLER
 * Flagship Event: SAFARNAMA — A Trip Beyond The Classroom
 * Hall of Fame: CODE HEIST HACKATHON '26 (Photo Gallery & Recap)
 * Organized by THRYVE • Lovely Professional University, Punjab
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initTicker();
  initCountdown();
  initDestinations();
  initSchedule();
  initRules();
  initPerks();
  initCodeHeistGallery();
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
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = navMenu.classList.toggle('mobile-open');
      toggleBtn.classList.toggle('active', isOpen);
    });

    const links = navMenu.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
        toggleBtn.classList.remove('active');
      });
    });

    document.addEventListener('click', (e) => {
      if (navMenu.classList.contains('mobile-open') && !navMenu.contains(e.target) && !toggleBtn.contains(e.target)) {
        navMenu.classList.remove('mobile-open');
        toggleBtn.classList.remove('active');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   SAFARNAMA COUNTDOWN / STATUS COUNTER
   -------------------------------------------------------------------------- */
function initCountdown() {
  const targetIso = (THRYVE_DATA.eventMeta && THRYVE_DATA.eventMeta.targetIso)
    ? THRYVE_DATA.eventMeta.targetIso
    : '2026-11-20T04:00:00+05:30';

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

  track.innerHTML = itemsHtml + itemsHtml;
}

/* --------------------------------------------------------------------------
   DESTINATIONS SHOWCASE RENDERING
   -------------------------------------------------------------------------- */
function initDestinations() {
  const container = document.getElementById('destinationsGrid');
  if (!container || !THRYVE_DATA.destinations) return;

  container.innerHTML = THRYVE_DATA.destinations.map(d => `
    <div class="destination-card" id="${d.id}">
      <div class="destination-header">
        <div class="destination-icon-box">${d.icon}</div>
        <span class="destination-badge">${d.badge}</span>
      </div>

      <h3 class="destination-title">${d.name}</h3>
      <div class="destination-location">📍 ${d.location}</div>
      <div class="destination-tagline">🌿 ${d.tagline}</div>
      <p class="destination-desc">${d.desc}</p>

      <div class="destination-highlights-box">
        <div class="highlights-label">EXPEDITION HIGHLIGHTS</div>
        <ul class="destination-bullets">
          ${d.highlights.map(h => `<li><span class="bullet-dot">✓</span> <span>${h}</span></li>`).join('')}
        </ul>
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

  const phaseIcons = {
    gathering: '📍',
    boarding: '🚌',
    travel: '🛣️',
    arrival: '🎟️',
    zoo: '🦁',
    photo: '📸',
    meal: '🍱',
    garden: '🌹',
    activities: '🎉',
    evening: '🌅',
    conclusion: '🌟'
  };

  container.innerHTML = THRYVE_DATA.schedule.map((s, index) => {
    const icon = phaseIcons[s.phase] || '⏱️';
    const isSpecial = s.phase === 'zoo' || s.phase === 'garden' || s.phase === 'conclusion';
    const specialClass = isSpecial ? 'timeline-special-card' : '';

    return `
      <div class="timeline-item">
        <div class="timeline-marker ${isSpecial ? 'special-marker' : ''}">
          <span class="timeline-marker-icon">${icon}</span>
        </div>
        <div class="timeline-content-box ${specialClass}">
          <div class="timeline-header-row">
            <span class="timeline-time">${s.time}</span>
            <span class="timeline-badge-pill ${s.phase}">${s.badge}</span>
          </div>
          <h4 class="timeline-title">${s.title}</h4>
          <p class="timeline-desc">${s.desc}</p>
        </div>
      </div>
    `;
  }).join('');
}

/* --------------------------------------------------------------------------
   RULES & REGULATIONS RENDERING
   -------------------------------------------------------------------------- */
function initRules() {
  const container = document.getElementById('rulesGrid');
  if (!container || !THRYVE_DATA.rules) return;

  container.innerHTML = THRYVE_DATA.rules.map((rule, idx) => `
    <div class="rule-card">
      <div class="rule-top-row">
        <span class="rule-icon-box">${rule.icon}</span>
        <span class="rule-num">RULE #${idx + 1}</span>
      </div>
      <h4 class="rule-title">${rule.title}</h4>
      <p class="rule-desc">${rule.desc}</p>
      <div class="rule-tag">🛡️ ${rule.tag}</div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   TRIP PERKS RENDERING
   -------------------------------------------------------------------------- */
function initPerks() {
  const container = document.getElementById('perksGrid');
  if (!container || !THRYVE_DATA.tripPerks) return;

  container.innerHTML = THRYVE_DATA.tripPerks.map(perk => `
    <div class="perk-card">
      <div class="perk-icon-wrap">${perk.icon}</div>
      <h4 class="perk-title">${perk.title}</h4>
      <p class="perk-desc">${perk.desc}</p>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   CODE HEIST PHOTO GALLERY & RECAP (SUCCESSFULLY CONDUCTED)
   -------------------------------------------------------------------------- */
let activeGalleryCategory = 'all';

function initCodeHeistGallery() {
  renderGalleryGrid();
  setupGalleryFilters();
}

function renderGalleryGrid() {
  const container = document.getElementById('galleryGrid');
  if (!container || !THRYVE_DATA.codeHeistGallery) return;

  const filtered = THRYVE_DATA.codeHeistGallery.filter(item => {
    return activeGalleryCategory === 'all' || item.category === activeGalleryCategory;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="gallery-empty-state">
        <div class="empty-icon">📸</div>
        <h4>No photos in this category yet</h4>
        <p>Club media team is curating snapshots. Stay tuned!</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(item => {
    if (item.type === 'image') {
      return `
        <div class="gallery-card image-card" onclick="openLightbox('${item.src}', '${item.title.replace(/'/g, "\\'")}', '${item.caption.replace(/'/g, "\\'")}')">
          <div class="gallery-thumb-wrap">
            <img src="${item.src}" alt="${item.title}" class="gallery-img" loading="lazy" />
            <div class="gallery-overlay">
              <span class="gallery-zoom-btn">🔍 View Fullscreen</span>
            </div>
            <span class="gallery-badge">${item.categoryLabel}</span>
          </div>
          <div class="gallery-meta">
            <h4 class="gallery-title">${item.title}</h4>
            <p class="gallery-caption">${item.caption}</p>
          </div>
        </div>
      `;
    } else {
      return `
        <div class="gallery-card placeholder-card" onclick="openPlaceholderModal('${item.title.replace(/'/g, "\\'")}', '${item.caption.replace(/'/g, "\\'")}')">
          <div class="gallery-placeholder-wrap">
            <div class="placeholder-icon-ring">
              <span class="placeholder-icon">${item.icon}</span>
            </div>
            <div class="placeholder-tag">${item.placeholderText}</div>
            <div class="placeholder-action">📸 Uploading Soon</div>
            <span class="gallery-badge">${item.categoryLabel}</span>
          </div>
          <div class="gallery-meta">
            <h4 class="gallery-title">${item.title}</h4>
            <p class="gallery-caption">${item.caption}</p>
          </div>
        </div>
      `;
    }
  }).join('');
}

function setupGalleryFilters() {
  const filterButtons = document.querySelectorAll('.gallery-filter-btn');
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeGalleryCategory = btn.getAttribute('data-filter');
      renderGalleryGrid();
    });
  });
}

/* Lightbox Modal Manager */
function openLightbox(src, title, caption) {
  let modal = document.getElementById('lightboxModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'lightboxModal';
    modal.className = 'lightbox-modal';
    modal.innerHTML = `
      <div class="lightbox-backdrop" onclick="closeLightbox()"></div>
      <div class="lightbox-dialog">
        <button class="lightbox-close-btn" onclick="closeLightbox()">✕</button>
        <div class="lightbox-img-wrap">
          <img id="lightboxImg" src="" alt="" />
        </div>
        <div class="lightbox-caption-box">
          <h3 id="lightboxTitle"></h3>
          <p id="lightboxDesc"></p>
        </div>
      </div>
    `;
    document.body.appendChild(modal);
  }

  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightboxTitle').innerText = title;
  document.getElementById('lightboxDesc').innerText = caption;
  modal.classList.add('open');
}

function closeLightbox() {
  const modal = document.getElementById('lightboxModal');
  if (modal) modal.classList.remove('open');
}

function openPlaceholderModal(title, caption) {
  showToast(`📸 "${title}": Event photos from Code Heist are being compiled by THRYVE media crew! Check back soon or share your photos at thryveofficial@gmail.com.`);
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
    <span class="toast-icon">🌿</span>
    <span>${message}</span>
  `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4500);
}
