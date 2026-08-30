/**
 * THRYVE LIVE HEADLINER BATTLE POLL
 * Real-time voting with animated percentage bars
 */

const pollData = {
  question: "Who should headline the THRYVE Grand ProShow '26?",
  totalVotes: 14280,
  options: [
    { id: 'opt-1', name: '⚡ Seedhe Maut (Hip-Hop / Drill)', votes: 5712, percent: 40 },
    { id: 'opt-2', name: '🌊 Ritviz (Electronic / Fusion)', votes: 4855, percent: 34 },
    { id: 'opt-3', name: '🎸 When Chai Met Toast (Indie Folk)', votes: 2570, percent: 18 },
    { id: 'opt-4', name: '🔥 Nucleya (Heavy Bass / EDM)', votes: 1143, percent: 8 }
  ],
  userVoted: false
};

function initPoll() {
  renderPoll();
}

function renderPoll() {
  const container = document.getElementById('pollOptionsContainer');
  const countEl = document.getElementById('pollTotalVotes');
  if (!container) return;

  if (countEl) {
    countEl.innerText = `${pollData.totalVotes.toLocaleString()} Live Student Votes`;
  }

  container.innerHTML = pollData.options.map(opt => `
    <button class="poll-btn ${pollData.userVoted === opt.id ? 'voted' : ''}" onclick="castVote('${opt.id}')">
      <div class="poll-btn-fill" style="width: ${pollData.userVoted ? opt.percent : 0}%"></div>
      <div class="poll-btn-content">
        <span class="poll-artist-name">
          ${pollData.userVoted === opt.id ? '✓ ' : ''}${opt.name}
        </span>
        <span class="poll-percentage">
          ${pollData.userVoted ? opt.percent + '%' : 'Vote 🗳️'}
        </span>
      </div>
    </button>
  `).join('');
}

function castVote(optionId) {
  if (pollData.userVoted) {
    showToast('✨ You have already cast your vote in this round!');
    return;
  }

  const option = pollData.options.find(o => o.id === optionId);
  if (!option) return;

  option.votes += 1;
  pollData.totalVotes += 1;
  pollData.userVoted = optionId;

  // Recalculate percentages
  pollData.options.forEach(o => {
    o.percent = Math.round((o.votes / pollData.totalVotes) * 100);
  });

  renderPoll();
  triggerCelebrationConfetti();
  showToast(`🔥 Vote registered for ${option.name}!`);
}
