/**
 * THRYVE EVENT CONTROLLER
 * Handles event filtering, search, tab switching, and dynamic rendering inside the Mac Dashboard
 */

let activeCategory = 'all';
let searchQuery = '';

function initEvents() {
  renderEvents();
  setupFilterTabs();
  setupSearchInput();
}

function renderEvents() {
  const container = document.getElementById('eventsGrid');
  if (!container) return;

  const filtered = THRYVE_DATA.events.filter(evt => {
    const matchesCategory = activeCategory === 'all' || evt.category === activeCategory;
    const matchesSearch = evt.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.venue.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          evt.lineup.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (filtered.length === 0) {
    container.innerHTML = `
      <div style="grid-column: 1 / -1; text-align: center; padding: 48px 20px; color: #64748B;">
        <div style="font-size: 2.5rem; margin-bottom: 12px;">🔍</div>
        <h4 style="font-size: 1.125rem; font-weight: 700; color: #0A0F1D; margin-bottom: 6px;">No events found</h4>
        <p style="font-size: 0.875rem;">Try adjusting your category filter or search keywords.</p>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map(evt => {
    let tagClass = 'upcoming';
    if (evt.status === 'live') tagClass = 'live';
    else if (evt.status === 'fast') tagClass = 'fast';

    const catLabels = {
      concerts: '🎸 Concert',
      tech: '💻 Tech Fest',
      cultural: '🎭 Cultural',
      esports: '🎮 E-Sports',
      workshops: '🚀 Workshop'
    };

    return `
      <div class="event-card" data-event-id="${evt.id}">
        <div class="event-poster-wrap">
          <img src="${evt.image}" alt="${evt.title}" class="event-poster-img" loading="lazy" />
          <span class="event-status-tag ${tagClass}">${evt.statusLabel}</span>
          <span class="event-category-badge">${catLabels[evt.category] || evt.category}</span>
        </div>
        <div class="event-body">
          <div>
            <div class="event-meta-row">
              <span class="event-meta-item">📅 ${evt.date}</span>
              <span>•</span>
              <span class="event-meta-item">📍 ${evt.venue}</span>
            </div>
            <h3 class="event-title">${evt.title}</h3>
            <p class="event-description">${evt.description}</p>
            <div class="event-lineup">
              <span class="event-lineup-label">Lineup / Grant:</span>
              <span class="event-lineup-names">${evt.lineup}</span>
            </div>
          </div>
          <div class="event-footer">
            <div class="event-pricing">
              <span class="pricing-label">Access Pass</span>
              <span class="pricing-amount ${evt.isFree ? 'free' : ''}">${evt.price}</span>
            </div>
            <a href="https://app.macbease.com/events/6a9867eb7f1083507fb8dcf9" target="_blank" rel="noopener noreferrer" class="btn-book-pass" style="text-decoration: none; display: inline-flex; align-items: center; justify-content: center;">
              Register Now 🎟️
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function setupFilterTabs() {
  const tabs = document.querySelectorAll('.dash-tab-btn');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      activeCategory = tab.getAttribute('data-category');
      renderEvents();
    });
  });
}

function setupSearchInput() {
  const input = document.getElementById('eventSearchInput');
  if (!input) return;

  input.addEventListener('input', (e) => {
    searchQuery = e.target.value.trim();
    renderEvents();
  });
}
