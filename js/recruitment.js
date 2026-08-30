/**
 * THRYVE RECRUITMENT & MEMBERSHIP PORTAL
 * Handles department selections and crew onboarding applications
 */

let selectedDepartment = 'tech';

function openRecruitModal() {
  const modal = document.getElementById('recruitModal');
  if (modal) modal.classList.add('open');
}

function closeRecruitModal() {
  const modal = document.getElementById('recruitModal');
  if (modal) modal.classList.remove('open');
}

function selectDeptRadio(deptId) {
  selectedDepartment = deptId;
  const cards = document.querySelectorAll('.dept-card-radio');
  cards.forEach(card => {
    if (card.getAttribute('data-dept') === deptId) {
      card.classList.add('selected');
    } else {
      card.classList.remove('selected');
    }
  });
}

async function handleRecruitSubmit(e) {
  e.preventDefault();

  const nameEl = document.getElementById('recruitName');
  const emailEl = document.getElementById('recruitEmail');
  const phoneEl = document.getElementById('recruitPhone');
  const branchEl = document.getElementById('recruitBranch');
  const portfolioEl = document.getElementById('recruitPortfolio');

  const name = nameEl ? nameEl.value.trim() : 'Applicant';
  const email = emailEl ? emailEl.value.trim() : '';
  const phone = phoneEl ? phoneEl.value.trim() : '';
  const branch = branchEl ? branchEl.value.trim() : '';
  const portfolio = portfolioEl ? portfolioEl.value.trim() : '';

  const payload = {
    name,
    email,
    phone,
    branch,
    department: selectedDepartment,
    portfolio
  };

  try {
    const apiEndpoint = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
      ? 'https://thryve-9nka.onrender.com/api/recruitment'
      : '/api/recruitment';

    fetch(apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).catch(err => console.log('Backend sync note:', err));
  } catch (err) {
    console.log('Submission note:', err);
  }

  showToast(`🚀 Application submitted for ${name} (${selectedDepartment.toUpperCase()} Crew)! Check your email for next steps.`);
  
  closeRecruitModal();
  e.target.reset();
}
