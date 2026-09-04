/**
 * THRYVE CODE HEIST - REGISTRATION PAGE INTERACTIVITY
 * Handles countdown timer, registration redirect, and UI interactions.
 */

// Target Registration URL provided by user
const REGISTRATION_REDIRECT_URL = 'https://app.macbease.com/events/code-heist-hackathon';

// Event ISO target date
const EVENT_TARGET_ISO = '2026-09-18T17:00:00+05:30';

document.addEventListener('DOMContentLoaded', () => {
  initRegistrationCountdown();
  initNavbarScroll();
  initMobileNav();
  setupRegistrationButtons();
});

/**
 * Direct redirect handler for the Register Now button
 */
function handleRegisterRedirect(event) {
  if (event) event.preventDefault();

  // Visual feedback on button if present
  const btn = event ? event.currentTarget : null;
  if (btn) {
    btn.style.transform = 'scale(0.97)';
    setTimeout(() => {
      btn.style.transform = '';
    }, 150);
  }

  // Open the registration portal in a new tab / direct redirect
  window.open(REGISTRATION_REDIRECT_URL, '_blank', 'noopener,noreferrer');
}

/**
 * Bind all registration buttons to the target URL
 */
function setupRegistrationButtons() {
  const registerBtns = document.querySelectorAll('.js-register-trigger, .reg-btn-main');
  registerBtns.forEach(btn => {
    btn.setAttribute('href', REGISTRATION_REDIRECT_URL);
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
    btn.addEventListener('click', (e) => {
      // Let standard link navigation happen or trigger programmatic open
      console.log('Redirecting to Macbease Code Heist Registration portal:', REGISTRATION_REDIRECT_URL);
    });
  });
}

/**
 * Realtime countdown timer to 18 September 2026, 5:00 PM
 */
function initRegistrationCountdown() {
  const targetDate = new Date(EVENT_TARGET_ISO).getTime();

  function update() {
    const now = new Date().getTime();
    const diff = targetDate - now;

    const daysEl = document.getElementById('regCdDays');
    const hoursEl = document.getElementById('regCdHours');
    const minsEl = document.getElementById('regCdMins');
    const secsEl = document.getElementById('regCdSecs');

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

/**
 * Navbar scroll blur effect
 */
function initNavbarScroll() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * Mobile navigation toggle
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobileToggle');
  const navMenu = document.getElementById('navMenu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('mobile-open');
    });

    const links = navMenu.querySelectorAll('a');
    links.forEach(l => {
      l.addEventListener('click', () => {
        navMenu.classList.remove('mobile-open');
      });
    });
  }
}
