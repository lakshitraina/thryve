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

function handleRecruitSubmit(e) {
  e.preventDefault();

  const nameInput = document.getElementById('recruitName');
  const applicantName = nameInput && nameInput.value ? nameInput.value : 'Applicant';

  triggerCelebrationConfetti();
  closeRecruitModal();
  
  showToast(`🚀 Application submitted for ${applicantName}! Check your email for interview slot details.`);
  
  // Reset form
  const form = document.getElementById('recruitForm');
  if (form) form.reset();
}
