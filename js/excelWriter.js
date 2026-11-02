const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

const DATA_DIR = path.join(__dirname, '..', 'data');
const EXCEL_FILE = path.join(DATA_DIR, 'registrations.xlsx');
const CSV_FILE = path.join(DATA_DIR, 'registrations.csv');

function saveToExcel(record) {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }

    let existingRows = [];
    if (fs.existsSync(EXCEL_FILE)) {
      try {
        const wb = XLSX.readFile(EXCEL_FILE);
        const sheetName = wb.SheetNames[0] || 'Registrations';
        existingRows = XLSX.utils.sheet_to_json(wb.Sheets[sheetName]) || [];
      } catch (e) {
        existingRows = [];
      }
    }

    const members = Array.isArray(record.members) ? record.members : [];
    const primary = members[0] || {};
    const primaryName = record.primaryName || primary.name || record.name || 'Student';
    const regNo = record.registrationNo || record.regNo || primary.registrationNo || 'N/A';
    const email = record.email || primary.email || 'N/A';
    const phone = record.phone || primary.phone || 'N/A';
    const course = record.course || record.branch || primary.course || primary.branch || 'N/A';
    const year = record.year || primary.year || 'N/A';
    const seats = parseInt(record.seats || record.teamSize || record.seatCount || (members.length > 0 ? members.length : 1), 10);
    const pricePerPerson = 749;
    const totalAmount = record.totalAmount || (seats * pricePerPerson);

    const rosterText = members.length > 0
      ? members.map((m, i) => `Seat ${i + 1}: ${m.name || 'Passenger'} (${m.registrationNo || 'No Reg'}, ${m.phone || 'No Phone'}, ${m.course || 'N/A'})`).join(' | ')
      : `${primaryName} (Solo)`;

    const newRow = {
      'Pass ID': record.passId || `#SAFAR-${Date.now().toString().slice(-5)}`,
      'Booking Date & Time': new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
      'Primary Passenger': primaryName,
      'Registration No': regNo,
      'Email': email,
      'Phone / WhatsApp': phone,
      'Course & Branch': course,
      'Year': year,
      'Seats Booked': seats,
      'Price Per Seat (₹)': pricePerPerson,
      'Total Amount Paid (₹)': totalAmount,
      'Payment Status': record.paymentStatus || 'APPROVED',
      'Bank UTR / Transaction Ref': record.utr || 'N/A',
      'Payee UPI ID': 'paytm.s19wrtz@pty',
      'Payment Gateway': record.gateway || 'THRYVE Pay',
      'Event Name': 'SAFARNAMA 2026',
      'Event Date': '21 November 2026',
      'Destinations': 'Chhatbir Zoo, Rock Garden & Rose Garden, Chandigarh',
      'Full Passenger Roster': rosterText
    };

    existingRows.push(newRow);

    const ws = XLSX.utils.json_to_sheet(existingRows);
    ws['!cols'] = [
      { wch: 18 },
      { wch: 22 },
      { wch: 22 },
      { wch: 16 },
      { wch: 26 },
      { wch: 16 },
      { wch: 20 },
      { wch: 14 },
      { wch: 14 },
      { wch: 18 },
      { wch: 22 },
      { wch: 18 },
      { wch: 24 },
      { wch: 22 },
      { wch: 18 },
      { wch: 18 },
      { wch: 18 },
      { wch: 38 },
      { wch: 60 }
    ];

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Safarnama Registrations');
    XLSX.writeFile(wb, EXCEL_FILE);

    // Universal CSV fallback
    const csvContent = XLSX.utils.sheet_to_csv(ws);
    fs.writeFileSync(CSV_FILE, csvContent, 'utf8');

    return {
      success: true,
      excelFile: EXCEL_FILE,
      csvFile: CSV_FILE,
      totalAmount,
      seats,
      pricePerPerson
    };
  } catch (err) {
    console.error('Failed to save to Excel:', err);
    return { success: false, error: err.message };
  }
}

module.exports = { saveToExcel, EXCEL_FILE, CSV_FILE };
