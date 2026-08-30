/**
 * CODE HEIST TEAM REGISTRATION & DIGITAL PASS GENERATOR
 * Clean placeholder hints, Indian student names, 1-4 Members selection, and official Pass ID
 */

let teamMemberCount = 1; // Default to 1 member

function openPassModal(eventId) {
  const modal = document.getElementById('passModal');
  if (modal) {
    modal.classList.add('open');
    renderMemberFields();
    updatePassPreview();
  }
}

function closePassModal() {
  const modal = document.getElementById('passModal');
  if (modal) modal.classList.remove('open');
}

function setTeamSize(count) {
  teamMemberCount = parseInt(count, 10);
  
  // Update button active states
  const buttons = document.querySelectorAll('.team-size-btn');
  buttons.forEach(btn => {
    if (parseInt(btn.getAttribute('data-size'), 10) === teamMemberCount) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });

  renderMemberFields();
  updatePassPreview();
}

function renderMemberFields() {
  const container = document.getElementById('teamMembersContainer');
  if (!container) return;

  const sampleNames = ['Aarav Sharma', 'Rohan Verma', 'Priya Patel', 'Ananya Singh'];
  const sampleRegs = ['12204592', '12208831', '12201945', '12207320'];
  const sampleEmails = ['aarav@lpu.in', 'rohan@lpu.in', 'priya@lpu.in', 'ananya@lpu.in'];

  let html = '';

  for (let i = 1; i <= teamMemberCount; i++) {
    const isLeader = i === 1;
    const label = isLeader ? 'Team Leader (Member 1)' : `Member ${i}`;
    const badgeClass = isLeader ? 'leader-tag' : 'member-tag';
    const badgeText = isLeader ? '⭐ TEAM LEADER' : `MEMBER #${i}`;

    const hintName = sampleNames[i - 1] || 'Student Name';
    const hintReg = sampleRegs[i - 1] || '12204592';
    const hintEmail = sampleEmails[i - 1] || 'student@lpu.in';

    html += `
      <div class="member-block-card ${isLeader ? 'leader-card' : ''}" data-member-idx="${i}">
        <div class="member-card-title">
          <span>${label}</span>
          <span class="${badgeClass}">${badgeText}</span>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="mem_${i}_name">Full Name *</label>
            <input type="text" id="mem_${i}_name" class="form-input mem-input" placeholder="e.g. ${hintName}" value="" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="mem_${i}_reg">Registration / Roll No *</label>
            <input type="text" id="mem_${i}_reg" class="form-input mem-input" placeholder="e.g. ${hintReg}" value="" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="mem_${i}_email">Email Address *</label>
            <input type="email" id="mem_${i}_email" class="form-input mem-input" placeholder="e.g. ${hintEmail}" value="" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="mem_${i}_phone">Phone / WhatsApp *</label>
            <input type="tel" id="mem_${i}_phone" class="form-input mem-input" placeholder="e.g. +91 98765 43210" value="" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="mem_${i}_course">Course / Degree *</label>
            <input type="text" id="mem_${i}_course" class="form-input mem-input" placeholder="e.g. B.Tech CSE / BCA / MCA" value="" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="mem_${i}_year">Academic Year *</label>
            <select id="mem_${i}_year" class="form-select mem-input">
              <option value="" disabled selected>Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  // Attach live event listeners to inputs
  const inputs = container.querySelectorAll('.mem-input');
  inputs.forEach(input => {
    input.addEventListener('input', updatePassPreview);
    input.addEventListener('change', updatePassPreview);
  });
}

function updatePassPreview() {
  const teamNameInput = document.getElementById('teamNameInput');
  const teamNameVal = teamNameInput && teamNameInput.value.trim() ? teamNameInput.value.trim() : 'YOUR SQUAD NAME';

  const leaderNameInput = document.getElementById('mem_1_name');
  const leaderRegInput = document.getElementById('mem_1_reg');
  const leaderCourseInput = document.getElementById('mem_1_course');
  const leaderYearInput = document.getElementById('mem_1_year');

  const leaderName = leaderNameInput && leaderNameInput.value.trim() ? leaderNameInput.value.trim() : 'Team Leader Name';
  const leaderReg = leaderRegInput && leaderRegInput.value.trim() ? leaderRegInput.value.trim() : '12204592';
  const leaderCourse = leaderCourseInput && leaderCourseInput.value.trim() ? leaderCourseInput.value.trim() : 'Course';
  const leaderYear = leaderYearInput && leaderYearInput.value ? leaderYearInput.value : 'Year';

  // Gather member names list
  let memberNames = [];
  for (let i = 1; i <= teamMemberCount; i++) {
    const input = document.getElementById(`mem_${i}_name`);
    if (input && input.value.trim()) {
      memberNames.push(input.value.trim());
    } else {
      memberNames.push(i === 1 ? 'Leader' : `Member ${i}`);
    }
  }

  // Update preview badge DOM elements
  const previewTeam = document.getElementById('previewTeamName');
  const previewLeader = document.getElementById('previewLeaderName');
  const previewReg = document.getElementById('previewLeaderReg');
  const previewCourse = document.getElementById('previewLeaderCourse');
  const previewCount = document.getElementById('previewTeamCount');
  const previewRoster = document.getElementById('previewRosterNames');
  const previewSerial = document.getElementById('previewPassSerial');

  if (previewTeam) previewTeam.innerText = teamNameVal;
  if (previewLeader) previewLeader.innerText = leaderName;
  if (previewReg) previewReg.innerText = leaderReg;
  if (previewCourse) previewCourse.innerText = `${leaderCourse} ${leaderYear !== 'Year' ? '(' + leaderYear + ')' : ''}`;
  if (previewCount) previewCount.innerText = `${teamMemberCount} Member${teamMemberCount > 1 ? 's' : ''}`;
  if (previewRoster) previewRoster.innerText = memberNames.join(', ');

  const hash = Math.abs(hashString(teamNameVal + leaderReg + teamMemberCount)).toString(36).toUpperCase().padEnd(5, '9').slice(0, 5);
  const serialNumber = `#HEIST-${hash}-26`;
  if (previewSerial) previewSerial.innerText = serialNumber;
}

async function handlePassFormSubmit(e) {
  e.preventDefault();
  
  const teamNameInput = document.getElementById('teamNameInput');
  const teamName = teamNameInput && teamNameInput.value ? teamNameInput.value.trim() : 'Team';
  
  // Gather all member objects
  const members = [];
  for (let i = 1; i <= teamMemberCount; i++) {
    const nameEl = document.getElementById(`mem_${i}_name`);
    const regEl = document.getElementById(`mem_${i}_reg`);
    const emailEl = document.getElementById(`mem_${i}_email`);
    const phoneEl = document.getElementById(`mem_${i}_phone`);
    const courseEl = document.getElementById(`mem_${i}_course`);
    const yearEl = document.getElementById(`mem_${i}_year`);

    members.push({
      role: i === 1 ? 'Leader' : `Member ${i}`,
      name: nameEl ? nameEl.value.trim() : '',
      registrationNo: regEl ? regEl.value.trim() : '',
      email: emailEl ? emailEl.value.trim() : '',
      phone: phoneEl ? phoneEl.value.trim() : '',
      course: courseEl ? courseEl.value.trim() : '',
      year: yearEl ? yearEl.value : ''
    });
  }

  // Trigger Confetti Celebration
  triggerCelebrationConfetti();

  const payload = {
    teamName,
    teamSize: teamMemberCount,
    members
  };

  try {
    const apiEndpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'https://thryve-9nka.onrender.com/api/register'
      : '/api/register';

    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.log('Backend sync note:', err));
  } catch (err) {
    console.log('Submission note:', err);
  }

  showToast(`🎉 Registration confirmed for ${teamName} (${teamMemberCount} Members)! Entry pass issued.`);
}

function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0;
  }
  return hash;
}

function triggerCelebrationConfetti() {
  const count = 140;
  const colors = ['#DC2626', '#EF4444', '#B91C1C', '#FF3B3B', '#FFD700', '#FFFFFF'];
  
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.zIndex = '9999';
    el.style.left = (window.innerWidth / 2) + (Math.random() * 200 - 100) + 'px';
    el.style.top = (window.innerHeight / 2) + (Math.random() * 100 - 50) + 'px';
    el.style.width = (Math.random() * 10 + 6) + 'px';
    el.style.height = (Math.random() * 8 + 4) + 'px';
    el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    el.style.borderRadius = '2px';
    el.style.pointerEvents = 'none';
    el.style.transition = 'all 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
    
    document.body.appendChild(el);

    const angle = Math.random() * Math.PI * 2;
    const velocity = Math.random() * 450 + 150;
    const destX = Math.cos(angle) * velocity;
    const destY = Math.sin(angle) * velocity + 200;

    requestAnimationFrame(() => {
      el.style.transform = `translate(${destX}px, ${destY}px) rotate(${Math.random() * 720}deg)`;
      el.style.opacity = '0';
    });

    setTimeout(() => {
      el.remove();
    }, 1400);
  }
}
