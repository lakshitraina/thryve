/**
 * THRYVE BACKEND API SERVER — RENDER DEPLOYMENT
 * Node.js / Express microservice for Code Heist registrations, crew applications, and event stats.
 */

const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS for Netlify frontend, Vercel, and local development
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Storage files
const DATA_DIR = path.join(__dirname, 'data');
const REGISTRATIONS_FILE = path.join(DATA_DIR, 'registrations.json');
const RECRUITMENTS_FILE = path.join(DATA_DIR, 'recruitments.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}
if (!fs.existsSync(REGISTRATIONS_FILE)) {
  fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(RECRUITMENTS_FILE)) {
  fs.writeFileSync(RECRUITMENTS_FILE, JSON.stringify([]));
}

// 1. Health Check Endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'online',
    service: 'THRYVE Official Backend Engine',
    timestamp: new Date().toISOString(),
    event: 'CODE HEIST HACKATHON 2026 (Operation 18.09)',
    venue: 'Lovely Professional University (LPU), Punjab'
  });
});

// 2. Live Stats Endpoint
app.get('/api/stats', (req, res) => {
  try {
    const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
    const registrations = JSON.parse(raw || '[]');
    res.status(200).json({
      totalTeams: registrations.length,
      totalHackers: registrations.reduce((acc, t) => acc + (parseInt(t.teamSize) || 1), 0),
      prizePool: '₹20,000+',
      eventDate: '2026-09-18T17:00:00+05:30',
      entryFee: '₹199 / Person',
      registrationPartner: 'Macbease',
      refundPolicy: 'No refund will be provided after registration.'
    });
  } catch (err) {
    res.status(500).json({ error: 'Failed to read stats' });
  }
});

// 3. Team Registration Endpoint
app.post('/api/register', (req, res) => {
  try {
    const { teamName, teamSize, members } = req.body;

    if (!teamName || !members || !Array.isArray(members) || members.length === 0) {
      return res.status(400).json({ error: 'Missing required team registration fields' });
    }

    const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
    const registrations = JSON.parse(raw || '[]');

    const timestamp = new Date().toISOString();
    const hash = Math.abs(Math.floor(Math.random() * 90000) + 10000);
    const passId = `#HEIST-${hash}-26`;

    const newEntry = {
      passId,
      teamName,
      teamSize: teamSize || members.length,
      members,
      registeredAt: timestamp,
      status: 'CONFIRMED',
      fee: '₹199',
      venue: 'Lovely Professional University, Punjab'
    };

    registrations.push(newEntry);
    fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2));

    res.status(201).json({
      success: true,
      message: 'Code Heist registration successful!',
      passId,
      ticket: newEntry
    });
  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ error: 'Internal server error processing registration' });
  }
});

// 4. Crew Recruitment Application Endpoint
app.post('/api/recruitment', (req, res) => {
  try {
    const { name, email, phone, branch, department, portfolio } = req.body;

    if (!name || !email || !phone || !branch) {
      return res.status(400).json({ error: 'Missing required recruitment fields' });
    }

    const raw = fs.readFileSync(RECRUITMENTS_FILE, 'utf8');
    const recruitments = JSON.parse(raw || '[]');

    const newApplication = {
      id: `RECRUIT-${Date.now()}`,
      name,
      email,
      phone,
      branch,
      department: department || 'General',
      portfolio: portfolio || '',
      submittedAt: new Date().toISOString(),
      status: 'PENDING_REVIEW'
    };

    recruitments.push(newApplication);
    fs.writeFileSync(RECRUITMENTS_FILE, JSON.stringify(recruitments, null, 2));

    res.status(201).json({
      success: true,
      message: 'Crew recruitment application received successfully!',
      applicationId: newApplication.id
    });
  } catch (err) {
    console.error('Recruitment error:', err);
    res.status(500).json({ error: 'Internal server error processing application' });
  }
});

// Serve frontend static files if running standalone
app.use(express.static(path.join(__dirname, '.')));

app.get('/registration', (req, res) => {
  res.sendFile(path.join(__dirname, 'registration.html'));
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`THRYVE Backend API running on port ${PORT}`);
});
