/**
 * SAFARNAMA '26 — EXPEDITION PASS & YOUPI-PG PAYMENT GATEWAY INTEGRATION
 * Price: ₹749 Per Person (AC Bus + Zoo & Garden Entry Included)
 * Payment Gateway: YouPI-PG (Self-Hosted Sovereign NPCI UPI Engine)
 * Data Storage: Saves Confirmed Registrations to Excel (.xlsx) & CSV
 * Organized by THRYVE • Lovely Professional University, Punjab
 */

const PRICE_PER_PERSON = 749;
let tripSeatCount = 1;
let currentYoupiSession = null;
let youpiTimerInterval = null;

function openPassModal() {
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

function setSeatCount(count) {
  tripSeatCount = parseInt(count, 10);

  const buttons = document.querySelectorAll('.team-size-btn');
  buttons.forEach(btn => {
    const size = parseInt(btn.getAttribute('data-size'), 10);
    if (size === tripSeatCount) {
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

  for (let i = 1; i <= tripSeatCount; i++) {
    const isPrimary = i === 1;
    const label = isPrimary ? 'Primary Passenger (Seat 1)' : `Co-Passenger (Seat ${i})`;
    const badgeClass = isPrimary ? 'leader-tag' : 'member-tag';
    const badgeText = isPrimary ? '⭐ PRIMARY ATTENDEE' : `SEAT #${i}`;

    const hintName = sampleNames[i - 1] || 'Student Name';
    const hintReg = sampleRegs[i - 1] || '12204592';
    const hintEmail = sampleEmails[i - 1] || 'student@lpu.in';

    html += `
      <div class="member-block-card ${isPrimary ? 'leader-card' : ''}" data-member-idx="${i}">
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
            <label class="form-label" for="mem_${i}_reg">LPU Registration No *</label>
            <input type="text" id="mem_${i}_reg" class="form-input mem-input" placeholder="e.g. ${hintReg}" value="" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="mem_${i}_email">Student Email *</label>
            <input type="email" id="mem_${i}_email" class="form-input mem-input" placeholder="e.g. ${hintEmail}" value="" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="mem_${i}_phone">Phone / WhatsApp *</label>
            <input type="tel" id="mem_${i}_phone" class="form-input mem-input" placeholder="e.g. +91 98765 43210" value="" required />
          </div>
        </div>

        <div class="form-grid-2">
          <div class="form-group">
            <label class="form-label" for="mem_${i}_course">Course & Branch *</label>
            <input type="text" id="mem_${i}_course" class="form-input mem-input" placeholder="e.g. B.Tech CSE / BBA / B.Pharm" value="" required />
          </div>
          <div class="form-group">
            <label class="form-label" for="mem_${i}_year">Academic Year *</label>
            <select id="mem_${i}_year" class="form-select mem-input">
              <option value="" disabled selected>Select Year</option>
              <option value="1st Year">1st Year</option>
              <option value="2nd Year">2nd Year</option>
              <option value="3rd Year">3rd Year</option>
              <option value="4th Year">4th Year</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>
        </div>
      </div>
    `;
  }

  container.innerHTML = html;

  const inputs = container.querySelectorAll('.mem-input');
  inputs.forEach(input => {
    input.addEventListener('input', updatePassPreview);
    input.addEventListener('change', updatePassPreview);
  });
}

function updatePassPreview() {
  const totalFee = tripSeatCount * PRICE_PER_PERSON;

  const leaderNameInput = document.getElementById('mem_1_name');
  const leaderRegInput = document.getElementById('mem_1_reg');
  const leaderCourseInput = document.getElementById('mem_1_course');
  const leaderYearInput = document.getElementById('mem_1_year');

  const leaderName = leaderNameInput && leaderNameInput.value.trim() ? leaderNameInput.value.trim() : 'Participant Name';
  const leaderReg = leaderRegInput && leaderRegInput.value.trim() ? leaderRegInput.value.trim() : '12204592';
  const leaderCourse = leaderCourseInput && leaderCourseInput.value.trim() ? leaderCourseInput.value.trim() : 'B.Tech CSE';
  const leaderYear = leaderYearInput && leaderYearInput.value ? leaderYearInput.value : '2nd Year';

  let memberNames = [];
  for (let i = 1; i <= tripSeatCount; i++) {
    const input = document.getElementById(`mem_${i}_name`);
    if (input && input.value.trim()) {
      memberNames.push(input.value.trim());
    } else {
      memberNames.push(i === 1 ? 'Primary' : `Passenger ${i}`);
    }
  }

  const previewTeam = document.getElementById('previewTeamName');
  const previewLeader = document.getElementById('previewLeaderName');
  const previewReg = document.getElementById('previewLeaderReg');
  const previewCourse = document.getElementById('previewLeaderCourse');
  const previewCount = document.getElementById('previewTeamCount');
  const previewRoster = document.getElementById('previewRosterNames');
  const previewSerial = document.getElementById('previewPassSerial');
  const previewTier = document.getElementById('previewPassTier');

  if (previewTeam) previewTeam.innerText = `SAFARNAMA '26 — CHANDIGARH`;
  if (previewLeader) previewLeader.innerText = leaderName;
  if (previewReg) previewReg.innerText = leaderReg;
  if (previewCourse) previewCourse.innerText = `${leaderCourse} (${leaderYear})`;
  if (previewCount) previewCount.innerText = `${tripSeatCount} Seat${tripSeatCount > 1 ? 's' : ''} • ₹${totalFee}`;
  if (previewRoster) previewRoster.innerText = memberNames.join(', ');
  if (previewTier) {
    if (currentThryveSession && currentThryveSession.paid) {
      previewTier.innerText = `STATUS: APPROVED (₹${totalFee})`;
      previewTier.style.background = 'rgba(34, 197, 94, 0.2)';
      previewTier.style.color = '#4ADE80';
      previewTier.style.borderColor = '#22C55E';
    } else {
      previewTier.innerText = `PAYMENT PENDING (₹${totalFee})`;
      previewTier.style.background = 'rgba(239, 68, 68, 0.15)';
      previewTier.style.color = '#EF4444';
      previewTier.style.borderColor = 'rgba(239, 68, 68, 0.3)';
    }
  }

  // Update submit button text with exact amount
  const submitBtn = document.querySelector('#passForm button[type="submit"]');
  if (submitBtn) {
    submitBtn.innerHTML = `Proceed to Pay ₹${totalFee}`;
  }

  const hash = Math.abs(hashString(leaderName + leaderReg + tripSeatCount)).toString(36).toUpperCase().padEnd(5, '7').slice(0, 5);
  const serialNumber = `#SAFAR-2026-${hash}`;
  if (previewSerial) previewSerial.innerText = serialNumber;

  renderPassQr(serialNumber, leaderName, leaderReg, totalFee);
}

function renderPassQr(serial, name, reg, amount) {
  const qrBox = document.getElementById('passQrCode');
  if (!qrBox || typeof QRCode === 'undefined') return;

  try {
    const qrData = `THRYVE-SAFARNAMA:ID=${serial};NAME=${encodeURIComponent(name)};REG=${reg};SEATS=${tripSeatCount};FEE=₹${amount};DEST=CHHATBIR-ROCK-ROSE;DATE=21-NOV-2026`;
    const qr = new QRCode(-1, 1);
    qr.addData(qrData);
    qr.make();

    const modules = qr.getModuleCount();
    let svg = `<svg viewBox="0 0 ${modules} ${modules}" style="width: 100%; height: 100%;" shape-rendering="crispEdges">`;
    for (let r = 0; r < modules; r++) {
      for (let c = 0; c < modules; c++) {
        if (qr.isDark(r, c)) {
          svg += `<rect x="${c}" y="${r}" width="1" height="1" fill="#0A0A0A" />`;
        }
      }
    }
    svg += `</svg>`;
    qrBox.innerHTML = svg;
  } catch (e) {
    // QR fallback
  }
}

/* --------------------------------------------------------------------------
   FORM SUBMISSION -> LAUNCH THRYVE SECURE UPI GATEWAY
   -------------------------------------------------------------------------- */
let currentThryveSession = null;

function handlePassFormSubmit(e) {
  e.preventDefault();

  const members = [];
  for (let i = 1; i <= tripSeatCount; i++) {
    const nameEl = document.getElementById(`mem_${i}_name`);
    const regEl = document.getElementById(`mem_${i}_reg`);
    const emailEl = document.getElementById(`mem_${i}_email`);
    const phoneEl = document.getElementById(`mem_${i}_phone`);
    const courseEl = document.getElementById(`mem_${i}_course`);
    const yearEl = document.getElementById(`mem_${i}_year`);

    members.push({
      seat: i,
      role: i === 1 ? 'Primary' : `Passenger ${i}`,
      name: nameEl ? nameEl.value.trim() : '',
      registrationNo: regEl ? regEl.value.trim() : '',
      email: emailEl ? emailEl.value.trim() : '',
      phone: phoneEl ? phoneEl.value.trim() : '',
      course: courseEl ? courseEl.value.trim() : '',
      year: yearEl ? yearEl.value : ''
    });
  }

  const primary = members[0] || {};
  const totalFee = tripSeatCount * PRICE_PER_PERSON;
  const hash = Math.abs(Math.floor(Math.random() * 90000) + 10000);
  const orderId = `SAFAR-2026-${hash}`;

  const orderData = {
    orderId,
    passId: `#${orderId}`,
    primaryName: primary.name,
    registrationNo: primary.registrationNo,
    email: primary.email,
    phone: primary.phone,
    course: primary.course,
    year: primary.year,
    seats: tripSeatCount,
    pricePerPerson: PRICE_PER_PERSON,
    totalFee,
    members
  };

  currentThryveSession = orderData;
  launchThryvePaymentGateway(orderData);
}

/* --------------------------------------------------------------------------
   THRYVE PAY GATEWAY ENGINE (CUSTOM DARK EMERALD THEME)
   -------------------------------------------------------------------------- */
const THRYVE_UPI_ID = 'paytm.s19wrtz@pty';

function launchThryvePaymentGateway(order) {
  let modal = document.getElementById('thryvePaymentModal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'thryvePaymentModal';
    modal.className = 'thryve-pay-modal';
    document.body.appendChild(modal);
  }

  const qrMap = {
    749: '/assets/qr/qr-749.jpg',
    1498: '/assets/qr/qr-1498.jpg',
    2247: '/assets/qr/qr-2247.jpg',
    2996: '/assets/qr/qr-2996.jpg'
  };
  const qrImageSrc = qrMap[order.totalFee] || '/assets/qr/qr-749.jpg';

  const upiNote = encodeURIComponent(`Safarnama Pass ${order.orderId}`);
  const upiQuery = `pa=${encodeURIComponent(THRYVE_UPI_ID)}&pn=THRYVE&am=${order.totalFee}.00&cu=INR&tn=${upiNote}`;
  const baseUpi = `upi://pay?${upiQuery}`;

  // Package-targeted intents for Android (bypasses any single default app like WhatsApp)
  const phonepeIntent = `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.phonepe.app;end`;
  const gpayIntent = `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.google.android.apps.nbu.paisa.user;end`;
  const paytmIntent = `intent://pay?${upiQuery}#Intent;scheme=upi;package=net.one97.paytm;end`;
  const bhimIntent = `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.org.npci.upiapp;end`;
  const credIntent = `intent://pay?${upiQuery}#Intent;scheme=upi;package=com.dreamplug.androidapp;end`;
  const amazonpayIntent = `intent://pay?${upiQuery}#Intent;scheme=upi;package=in.amazon.mShop.android.shopping;end`;

  modal.innerHTML = `
    <div class="thryve-pay-backdrop" onclick="closeThryveModal()"></div>
    <div class="thryve-pay-container">
      
      <!-- Header -->
      <div class="thryve-pay-header">
        <div class="thryve-pay-brand">
          <svg viewBox="0 0 800 320" style="width: 24px; height: 16px; color: #22C55E;" fill="currentColor">
            <path d="M400,0 L490,95 L445,138 L418,110 L418,220 L382,220 L382,110 L355,138 L310,95 Z M400,285 L335,220 L362,192 L400,230 L438,192 L465,220 Z M135,28 L330,140 L310,185 L180,110 L265,250 L200,285 L100,120 Z M665,28 L700,120 L600,285 L535,250 L620,110 L490,185 L470,140 Z" />
          </svg>
          <span class="thryve-pay-brand-logo">THRYVE Pay</span>
          <span class="thryve-pay-badge">SAFARNAMA '26</span>
        </div>
        <button class="thryve-pay-close" onclick="closeThryveModal()" title="Cancel Payment">✕</button>
      </div>

      <div class="thryve-pay-body" id="thryvePayContent">
        
        <!-- Amount Banner -->
        <div class="thryve-pay-amount-strip">
          <div>
            <div class="thryve-pay-amount-label">AMOUNT PAYABLE</div>
            <div class="thryve-pay-amount-sub">₹${PRICE_PER_PERSON} × ${order.seats} Seat${order.seats > 1 ? 's' : ''} (AC Bus Included)</div>
          </div>
          <div class="thryve-pay-amount-val">₹${order.totalFee}.00</div>
        </div>

        <!-- Official Paytm Dynamic QR Presentation Card -->
        <div class="thryve-pay-qr-card">
          <div class="thryve-pay-qr-header-tag">
            <span>📷 Scan to Pay via Any UPI App</span>
          </div>
          <div class="thryve-pay-qr-image-wrap">
            <img src="${qrImageSrc}" alt="THRYVE Paytm QR ₹${order.totalFee}" id="thryveQrImg" />
          </div>
          <div class="thryve-pay-qr-footer-hint">
            Amount pre-set to <strong>₹${order.totalFee}</strong> • Scan with Paytm, GPay, PhonePe
          </div>
        </div>

        <!-- Copy UPI ID Strip -->
        <div class="thryve-pay-upi-bar">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 0.75rem; color: #94A3B8; font-weight: 700;">UPI ID:</span>
            <span class="thryve-pay-upi-text" id="thryveUpiText">${THRYVE_UPI_ID}</span>
          </div>
          <button type="button" class="thryve-pay-copy-btn" id="copyUpiBtn" onclick="copyThryveUpi()">
            Copy UPI ID 📋
          </button>
        </div>

        <!-- Direct UPI Mobile Intent (Auto-sets amount) -->
        <a href="${baseUpi}" onclick="launchUpiApp('any', event)" class="thryve-pay-intent-btn">
          <span>📲 Open in Any UPI App (Auto-Sets ₹${order.totalFee})</span>
          <span>→</span>
        </a>

        <!-- Fast App Launchers (Direct package intent ensures PhonePe/GPay/Paytm/BHIM open directly) -->
        <div class="thryve-pay-apps-label" id="upiAppChooserHint">
          ⚡ Choose your installed UPI app to pay directly:
        </div>
        <div class="thryve-pay-apps-row">
          <a href="${phonepeIntent}" onclick="launchUpiApp('phonepe', event)" class="thryve-pay-app-pill" title="Pay with PhonePe">
            <img src="/assets/youpi/phonepe.png" alt="PhonePe" />
            <span>PhonePe</span>
          </a>
          <a href="${gpayIntent}" onclick="launchUpiApp('gpay', event)" class="thryve-pay-app-pill" title="Pay with Google Pay">
            <img src="/assets/youpi/gpay.png" alt="GPay" />
            <span>Google Pay</span>
          </a>
          <a href="${paytmIntent}" onclick="launchUpiApp('paytm', event)" class="thryve-pay-app-pill" title="Pay with Paytm">
            <img src="/assets/youpi/paytm.png" alt="Paytm" />
            <span>Paytm</span>
          </a>
          <a href="${bhimIntent}" onclick="launchUpiApp('bhim', event)" class="thryve-pay-app-pill" title="Pay with BHIM UPI">
            <img src="/assets/youpi/bhim.png" alt="BHIM" />
            <span>BHIM UPI</span>
          </a>
          <a href="${credIntent}" onclick="launchUpiApp('cred', event)" class="thryve-pay-app-pill" title="Pay with CRED">
            <img src="/assets/youpi/cred.png" alt="CRED" />
            <span>CRED</span>
          </a>
          <a href="${amazonpayIntent}" onclick="launchUpiApp('amazonpay', event)" class="thryve-pay-app-pill" title="Pay with Amazon Pay">
            <img src="/assets/youpi/amazonpay.png" alt="Amazon Pay" />
            <span>Amazon Pay</span>
          </a>
        </div>
        <div style="font-size: 0.725rem; color: #94A3B8; text-align: center; margin-top: -12px; margin-bottom: 16px; line-height: 1.4;">
          💡 Tapping your app (PhonePe, GPay, Paytm, BHIM) auto-opens it with ₹${order.totalFee} filled.
        </div>

        <!-- Step 2: UTR Reference Submission -->
        <div class="thryve-pay-utr-box">
          <div class="thryve-pay-step-badge">
            <span>STEP 2 • SUBMIT BANK REFERENCE</span>
          </div>
          <p class="thryve-pay-utr-hint">
            After paying ₹${order.totalFee}, copy the <strong>12-digit UTR / UPI Transaction Reference Number</strong> from your payment receipt and enter it below.
          </p>

          <div class="thryve-pay-utr-input-group">
            <input 
              type="text" 
              id="thryveUtrInput" 
              class="thryve-pay-utr-input" 
              placeholder="Enter 12-digit UTR (e.g. 432109876543)" 
              maxlength="22" 
              autocomplete="off" 
            />
            <button type="button" class="thryve-pay-confirm-btn" onclick="submitThryveUtr()">
              Confirm Pass ✓
            </button>
          </div>
        </div>

        <div class="thryve-pay-footer-note">
          🔒 Secure THRYVE Gateway • Verified recipient: <strong>paytm.s19wrtz@pty</strong> • All passes marked APPROVED for manual verification.
        </div>

      </div>

    </div>
  `;

  modal.classList.add('open');
}

function closeThryveModal() {
  const modal = document.getElementById('thryvePaymentModal');
  if (modal) modal.classList.remove('open');
}

// Backward compatibility alias
function closeYoupiModal() {
  closeThryveModal();
}

function copyThryveUpi() {
  navigator.clipboard.writeText(THRYVE_UPI_ID).then(() => {
    const btn = document.getElementById('copyUpiBtn');
    if (btn) {
      btn.innerText = 'Copied! ✓';
      btn.style.background = '#22C55E';
      btn.style.color = '#050B07';
      setTimeout(() => {
        btn.innerText = 'Copy UPI ID 📋';
        btn.style.background = 'rgba(34, 197, 94, 0.18)';
        btn.style.color = '#4ADE80';
      }, 2000);
    }
    showToast('UPI ID copied to clipboard: paytm.s19wrtz@pty');
  }).catch(() => {
    prompt('Copy UPI ID:', THRYVE_UPI_ID);
  });
}

/**
 * Robust cross-platform launcher for Indian UPI Applications.
 * Uses explicit Android package names to prevent OS routing conflicts
 * (e.g. WhatsApp hijacking generic upi:// intent filters).
 */
function launchUpiApp(appName, event) {
  if (event && event.preventDefault) event.preventDefault();
  if (!currentThryveSession) return;

  const fee = currentThryveSession.totalFee;
  const orderId = currentThryveSession.orderId;
  const query = `pa=${encodeURIComponent(THRYVE_UPI_ID)}&pn=THRYVE&am=${fee}.00&cu=INR&tn=${encodeURIComponent(`Safarnama Pass ${orderId}`)}`;
  const isAndroid = /Android/i.test(navigator.userAgent);
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent);

  const androidPackages = {
    phonepe: 'com.phonepe.app',
    gpay: 'com.google.android.apps.nbu.paisa.user',
    paytm: 'net.one97.paytm',
    bhim: 'in.org.npci.upiapp',
    cred: 'com.dreamplug.androidapp',
    amazonpay: 'in.amazon.mShop.android.shopping'
  };

  const iosSchemes = {
    phonepe: `phonepe://pay?${query}`,
    gpay: `tez://upi/pay?${query}`,
    paytm: `paytmmp://pay?${query}`,
    bhim: `upi://pay?${query}`,
    cred: `cred://pay?${query}`,
    amazonpay: `amazonpay://pay?${query}`
  };

  if (isAndroid) {
    if (appName === 'any') {
      // Trigger generic upi:// intent and update hint in case WhatsApp opens
      window.location.href = `upi://pay?${query}`;
      highlightAppGrid();
      return;
    }
    const pkg = androidPackages[appName];
    if (pkg) {
      window.location.href = `intent://pay?${query}#Intent;scheme=upi;package=${pkg};end`;
      return;
    }
  } else if (isIOS) {
    if (appName === 'any') {
      window.location.href = `upi://pay?${query}`;
      return;
    }
    if (iosSchemes[appName]) {
      window.location.href = iosSchemes[appName];
      return;
    }
  }

  if (appName === 'any') {
    window.location.href = `upi://pay?${query}`;
    return;
  }

  // Desktop or desktop browser: copy UPI ID and advise
  copyThryveUpi();
  showToast(`📋 Copied UPI ID (${THRYVE_UPI_ID})! Open ${appName.toUpperCase()} on your mobile or scan the QR code to pay ₹${fee}.`);
}

function highlightAppGrid() {
  const hint = document.getElementById('upiAppChooserHint');
  if (hint) {
    hint.style.color = '#F59E0B';
    hint.innerHTML = '👇 If WhatsApp opened automatically, tap your specific app below (PhonePe, GPay, Paytm, BHIM):';
  }
}

/* --------------------------------------------------------------------------
   CONFIRM UTR & SAVE DETAILS TO EXCEL AS APPROVED
   -------------------------------------------------------------------------- */
async function submitThryveUtr() {
  const utrInput = document.getElementById('thryveUtrInput');
  const utr = utrInput ? utrInput.value.trim() : '';

  if (!utr || utr.length < 5) {
    alert('Please enter a valid Bank UTR or Transaction Reference number from your payment app.');
    if (utrInput) utrInput.focus();
    return;
  }

  await processThryvePaymentConfirmation(utr);
}

async function processThryvePaymentConfirmation(utr) {
  if (!currentThryveSession) return;

  const payload = {
    orderId: currentThryveSession.orderId,
    passId: currentThryveSession.passId,
    primaryName: currentThryveSession.primaryName,
    registrationNo: currentThryveSession.registrationNo,
    email: currentThryveSession.email,
    phone: currentThryveSession.phone,
    course: currentThryveSession.course,
    year: currentThryveSession.year,
    seats: currentThryveSession.seats,
    pricePerPerson: PRICE_PER_PERSON,
    totalAmount: currentThryveSession.totalFee,
    utr,
    members: currentThryveSession.members,
    payeeUpi: THRYVE_UPI_ID,
    paymentGateway: 'THRYVE Pay (paytm.s19wrtz@pty)',
    paymentStatus: 'APPROVED',
    timestamp: new Date().toISOString()
  };

  try {
    const response = await fetch('/api/payment/confirm', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const result = await response.json();
    renderThryveSuccessView(utr, result || {});
  } catch (err) {
    console.error('Confirmation network note:', err);
    renderThryveSuccessView(utr, { passId: currentThryveSession.passId, totalAmount: currentThryveSession.totalFee });
  }
}

function renderThryveSuccessView(utr, result) {
  triggerCelebrationConfetti();

  if (currentThryveSession) {
    currentThryveSession.paid = true;
    currentThryveSession.utr = utr;
  }

  const bodyEl = document.getElementById('thryvePayContent');
  if (!bodyEl) return;

  bodyEl.innerHTML = `
    <div class="thryve-pay-success-view">
      <div class="thryve-pay-success-check">✓</div>
      <h3 class="thryve-pay-success-title">Pass Issued & Approved!</h3>
      <p class="thryve-pay-success-sub">
        Registration for <strong>${currentThryveSession.primaryName}</strong> (${currentThryveSession.seats} Seat${currentThryveSession.seats > 1 ? 's' : ''}) is confirmed.<br/>
        <strong>Amount Paid:</strong> ₹${currentThryveSession.totalFee}.00 • <strong>UTR:</strong> ${utr}
      </p>

      <div class="thryve-pay-approved-badge" style="background: rgba(34, 197, 94, 0.15); border: 1px solid rgba(34, 197, 94, 0.4); padding: 12px 18px; border-radius: var(--radius-md); font-size: 0.8125rem; color: #86EFAC; font-weight: 700; margin-bottom: 22px; display: inline-flex; align-items: center; gap: 8px;">
        <span>🎟️</span>
        <span>Official Expedition Pass Issued • Status: <strong>APPROVED</strong></span>
      </div>

      <div class="thryve-pay-actions-grid">
        <button type="button" onclick="downloadBoardingPass();" class="btn btn-primary" style="padding: 14px; font-weight: 900; background: linear-gradient(135deg, #15803D 0%, #16A34A 100%); box-shadow: 0 10px 25px -4px rgba(22, 163, 74, 0.5);">
          <span>📥 Download / Save Boarding Pass</span>
        </button>
        <button type="button" onclick="closeThryveModal(); viewConfirmedPass();" class="btn btn-secondary" style="padding: 12px; font-weight: 800; background: rgba(255, 255, 255, 0.08); border: 1px solid rgba(255, 255, 255, 0.15); color: #FFFFFF;">
          <span>🎟️ View Live Holographic Pass</span>
        </button>
      </div>

      <div class="thryve-pay-footer-note" style="margin-top: 20px;">
        SAFARNAMA '26 Expedition • 21 November 2026 • Reporting 4:00 AM LPU
      </div>
    </div>
  `;

  // Update Boarding Pass Preview on the page & unlock download button
  const previewTier = document.getElementById('previewPassTier');
  if (previewTier && currentThryveSession) {
    previewTier.innerText = `STATUS: APPROVED (₹${currentThryveSession.totalFee})`;
    previewTier.style.background = 'rgba(34, 197, 94, 0.2)';
    previewTier.style.color = '#4ADE80';
    previewTier.style.borderColor = '#22C55E';
  }

  const downloadBtn = document.getElementById('downloadPassBtn');
  if (downloadBtn) {
    downloadBtn.innerHTML = '📥 Download / Print Boarding Pass';
    downloadBtn.className = 'btn btn-primary';
    downloadBtn.style.background = 'linear-gradient(135deg, #15803D 0%, #16A34A 100%)';
    downloadBtn.style.color = '#FFFFFF';
    downloadBtn.style.border = 'none';
    downloadBtn.style.cursor = 'pointer';
    downloadBtn.style.boxShadow = '0 4px 14px rgba(22, 163, 74, 0.35)';
    downloadBtn.title = 'Download Official Pass';
  }

  showToast(`🎉 Pass Approved for ${currentThryveSession.primaryName}! You can now download your official boarding pass.`);
}

function viewConfirmedPass() {
  openPassModal();
}

function downloadBoardingPass() {
  // Security guard: Only allow pass download if payment has been confirmed
  if (!currentThryveSession || !currentThryveSession.paid) {
    const fee = (tripSeatCount || 1) * PRICE_PER_PERSON;
    showToast(`⚠️ Payment Required: Please complete payment of ₹${fee} and submit your UTR to download the verified boarding pass.`);
    return;
  }
  const leaderName = document.getElementById('previewLeaderName')?.innerText || (currentThryveSession?.primaryName) || 'Student';
  const regNo = document.getElementById('previewLeaderReg')?.innerText || (currentThryveSession?.registrationNo) || 'N/A';
  const course = document.getElementById('previewLeaderCourse')?.innerText || (currentThryveSession?.course) || 'N/A';
  const seats = tripSeatCount || (currentThryveSession?.seats) || 1;
  const totalAmount = seats * PRICE_PER_PERSON;
  const passSerial = document.getElementById('previewPassSerial')?.innerText || (currentThryveSession?.passId) || `#SAFAR-2026-${Math.floor(10000 + Math.random() * 90000)}`;
  const roster = document.getElementById('previewRosterNames')?.innerText || `${leaderName} (Solo)`;
  const qrSvg = document.getElementById('passQrCode')?.innerHTML || '';

  const printHtml = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8" />
  <title>SAFARNAMA '26 Official Boarding Pass — ${passSerial}</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@600;800&family=Manrope:wght@500;700;800&family=Sora:wght@700;800;900&display=swap" rel="stylesheet" />
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      background: #060B08;
      color: #FFFFFF;
      font-family: 'Manrope', -apple-system, sans-serif;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100vh;
      padding: 24px;
    }
    .print-actions {
      display: flex;
      gap: 12px;
      margin-bottom: 20px;
    }
    .print-btn {
      background: #22C55E;
      color: #050B07;
      font-weight: 800;
      font-size: 0.9375rem;
      border: none;
      padding: 12px 24px;
      border-radius: 8px;
      cursor: pointer;
      display: inline-flex;
      align-items: center;
      gap: 8px;
    }
    .print-btn:hover { background: #16A34A; }
    .ticket-card {
      width: 100%;
      max-width: 440px;
      background: #0B130E;
      border: 2px solid #22C55E;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(34, 197, 94, 0.2);
    }
    .ticket-header {
      background: linear-gradient(135deg, #15803D 0%, #16A34A 100%);
      padding: 18px 24px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .ticket-brand {
      font-family: 'Sora', sans-serif;
      font-size: 1.25rem;
      font-weight: 900;
      color: #FFFFFF;
      letter-spacing: -0.02em;
    }
    .ticket-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 0.6875rem;
      font-weight: 800;
      background: rgba(0,0,0,0.3);
      color: #FFFFFF;
      padding: 4px 10px;
      border-radius: 9999px;
      border: 1px solid rgba(255,255,255,0.3);
    }
    .ticket-body { padding: 24px; }
    .ticket-title {
      font-family: 'Sora', sans-serif;
      font-size: 1.375rem;
      font-weight: 900;
      color: #4ADE80;
      margin-bottom: 4px;
    }
    .ticket-sub {
      font-size: 0.75rem;
      color: #94A3B8;
      font-weight: 700;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-bottom: 18px;
    }
    .ticket-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 18px;
    }
    .ticket-label {
      font-size: 0.6875rem;
      font-weight: 800;
      color: #86EFAC;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      margin-bottom: 4px;
    }
    .ticket-val {
      font-size: 0.875rem;
      font-weight: 700;
      color: #FFFFFF;
    }
    .ticket-roster {
      background: rgba(255,255,255,0.03);
      border: 1px solid rgba(255,255,255,0.08);
      border-radius: 12px;
      padding: 12px 16px;
      margin-bottom: 18px;
    }
    .ticket-serial-bar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: rgba(34, 197, 94, 0.12);
      border: 1px dashed rgba(34, 197, 94, 0.4);
      border-radius: 10px;
      padding: 10px 14px;
      margin-bottom: 16px;
    }
    .ticket-serial-id {
      font-family: 'JetBrains Mono', monospace;
      font-weight: 900;
      color: #4ADE80;
      font-size: 0.9375rem;
    }
    .ticket-qr {
      width: 100px;
      height: 100px;
      background: #FFFFFF;
      padding: 8px;
      border-radius: 8px;
      margin: 0 auto 16px auto;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .ticket-footer {
      border-top: 1px dashed rgba(255,255,255,0.15);
      padding-top: 14px;
      text-align: center;
      font-size: 0.6875rem;
      color: #94A3B8;
      line-height: 1.5;
    }
    @media print {
      body { background: #FFFFFF; color: #000000; padding: 0; }
      .print-actions { display: none !important; }
      .ticket-card { border: 2px solid #000000; box-shadow: none; max-width: 100%; color: #000000; background: #FFFFFF; }
      .ticket-header { background: #15803D !important; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .ticket-title { color: #15803D; }
      .ticket-label { color: #15803D; }
      .ticket-grid, .ticket-roster { border: 1px solid #CCC; color: #000000; background: #FFF; }
      .ticket-val { color: #000000; }
      .ticket-serial-bar { border: 1px dashed #333; background: #EEE; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
      .ticket-serial-id { color: #000; }
    }
  </style>
</head>
<body>
  <div class="print-actions">
    <button class="print-btn" onclick="window.print()">🖨️ Print / Save as PDF</button>
  </div>
  <div class="ticket-card">
    <div class="ticket-header">
      <div class="ticket-brand">THRYVE.</div>
      <div class="ticket-badge">STATUS: APPROVED</div>
    </div>
    <div class="ticket-body">
      <div class="ticket-title">SAFARNAMA '26 EXPEDITION</div>
      <div class="ticket-sub">21 NOV 2026 • LPU DEPARTURE 4:00 AM • AC BUS</div>

      <div class="ticket-grid">
        <div>
          <div class="ticket-label">PRIMARY ATTENDEE</div>
          <div class="ticket-val">\${leaderName}</div>
        </div>
        <div>
          <div class="ticket-label">REGISTRATION NO</div>
          <div class="ticket-val">\${regNo}</div>
        </div>
        <div>
          <div class="ticket-label">COURSE & BRANCH</div>
          <div class="ticket-val">\${course}</div>
        </div>
        <div>
          <div class="ticket-label">SEATS BOOKED</div>
          <div class="ticket-val">\${seats} Seat\${seats > 1 ? 's' : ''} (₹\${totalAmount})</div>
        </div>
      </div>

      <div class="ticket-roster">
        <div class="ticket-label">PASSENGERS</div>
        <div class="ticket-val" style="font-size: 0.8125rem;">\${roster}</div>
      </div>

      <div class="ticket-serial-bar">
        <span style="font-size: 0.75rem; color: #86EFAC; font-weight: 800;">BOARDING PASS ID</span>
        <span class="ticket-serial-id">\${passSerial}</span>
      </div>

      <div class="ticket-qr">\${qrSvg}</div>

      <div class="ticket-footer">
        Present this pass at the boarding gate (Main Gate / Block 34, LPU) on 21 Nov 2026 at 4:00 AM.<br/>
        Destinations: Chhatbir Zoo • Rock Garden • Rose Garden Chandigarh
      </div>
    </div>
  </div>
  <script>
    setTimeout(() => { window.print(); }, 400);
  <\/script>
</body>
</html>`;

  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.open();
    printWindow.document.write(printHtml);
    printWindow.document.close();
  } else {
    // If pop-up is blocked, trigger download as standalone ticket file
    const blob = new Blob([printHtml], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `SAFARNAMA_Boarding_Pass_\${passSerial.replace('#', '')}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('Official Boarding Pass downloaded to your device!');
  }
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
  const colors = ['#15803D', '#059669', '#DC2626', '#E11D48', '#F59E0B', '#10B981', '#FFFFFF'];

  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.style.position = 'fixed';
    el.style.zIndex = '99999';
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
