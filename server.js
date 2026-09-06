/**
 * THRYVE PLATFORM & CODE HEIST SERVER
 * Zero-dependency robust HTTP server & API engine
 * Serves frontend static assets + API endpoints seamlessly.
 */

const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = process.env.PORT || 3000;
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

// MIME types lookup
const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf',
  '.txt': 'text/plain; charset=utf-8'
};

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization'
  });
  res.end(JSON.stringify(data));
}

function parseBody(req, callback) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
    if (body.length > 1e6) {
      req.connection.destroy();
    }
  });
  req.on('end', () => {
    try {
      const parsed = body ? JSON.parse(body) : {};
      callback(null, parsed);
    } catch (e) {
      callback(e, null);
    }
  });
}

const server = http.createServer((req, res) => {
  // Handle CORS Preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    });
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  let pathname = decodeURIComponent(parsedUrl.pathname);

  // 1. API: Health check
  if (pathname === '/api/health' && req.method === 'GET') {
    return sendJson(res, 200, {
      status: 'online',
      service: 'THRYVE Official Backend Engine',
      timestamp: new Date().toISOString(),
      event: 'CODE HEIST HACKATHON 2026 (Operation 18.09)',
      poweredBy: 'OSEN',
      coPoweredBy: 'SectorX',
      registrationPartner: 'Macbease',
      venue: 'Lovely Professional University (LPU), Punjab'
    });
  }

  // 2. API: Live Stats
  if (pathname === '/api/stats' && req.method === 'GET') {
    try {
      const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
      const registrations = JSON.parse(raw || '[]');
      return sendJson(res, 200, {
        totalTeams: registrations.length,
        totalHackers: registrations.reduce((acc, t) => acc + (parseInt(t.teamSize) || 1), 0),
        prizePool: '₹20,000+',
        eventDate: '2026-09-18T17:00:00+05:30',
        entryFee: '₹199 / Person',
        registrationPartner: 'Macbease',
        refundPolicy: 'No refund will be provided after registration.'
      });
    } catch (err) {
      return sendJson(res, 500, { error: 'Failed to read stats' });
    }
  }

  // 3. API: Register Team
  if (pathname === '/api/register' && req.method === 'POST') {
    return parseBody(req, (err, data) => {
      if (err || !data.teamName || !data.members) {
        return sendJson(res, 400, { error: 'Missing required team registration fields' });
      }
      try {
        const raw = fs.readFileSync(REGISTRATIONS_FILE, 'utf8');
        const registrations = JSON.parse(raw || '[]');
        const hash = Math.abs(Math.floor(Math.random() * 90000) + 10000);
        const passId = `#HEIST-${hash}-26`;
        const newEntry = {
          passId,
          teamName: data.teamName,
          teamSize: data.teamSize || data.members.length,
          members: data.members,
          registeredAt: new Date().toISOString(),
          status: 'CONFIRMED',
          venue: 'Lovely Professional University, Punjab'
        };
        registrations.push(newEntry);
        fs.writeFileSync(REGISTRATIONS_FILE, JSON.stringify(registrations, null, 2));
        return sendJson(res, 201, {
          success: true,
          message: 'Code Heist registration successful!',
          passId,
          ticket: newEntry
        });
      } catch (e) {
        return sendJson(res, 500, { error: 'Internal server error' });
      }
    });
  }

  // 4. API: Crew Recruitment
  if (pathname === '/api/recruitment' && req.method === 'POST') {
    return parseBody(req, (err, data) => {
      if (err || !data.name || !data.email || !data.phone || !data.branch) {
        return sendJson(res, 400, { error: 'Missing required recruitment fields' });
      }
      try {
        const raw = fs.readFileSync(RECRUITMENTS_FILE, 'utf8');
        const recruitments = JSON.parse(raw || '[]');
        const newApp = {
          id: `RECRUIT-${Date.now()}`,
          name: data.name,
          email: data.email,
          phone: data.phone,
          branch: data.branch,
          department: data.department || 'General',
          portfolio: data.portfolio || '',
          submittedAt: new Date().toISOString(),
          status: 'PENDING_REVIEW'
        };
        recruitments.push(newApp);
        fs.writeFileSync(RECRUITMENTS_FILE, JSON.stringify(recruitments, null, 2));
        return sendJson(res, 201, {
          success: true,
          message: 'Crew recruitment application received successfully!',
          applicationId: newApp.id
        });
      } catch (e) {
        return sendJson(res, 500, { error: 'Internal server error' });
      }
    });
  }

  // 5. Static File Routing
  if (pathname === '/' || pathname === '') {
    pathname = '/index.html';
  } else if (pathname === '/registration' || pathname === '/registration/') {
    pathname = '/registration.html';
  }

  const safePath = path.normalize(path.join(__dirname, pathname));
  if (!safePath.startsWith(__dirname)) {
    res.writeHead(403, { 'Content-Type': 'text/plain' });
    return res.end('Access Denied');
  }

  fs.stat(safePath, (err, stats) => {
    if (!err && stats.isFile()) {
      const ext = path.extname(safePath).toLowerCase();
      const contentType = MIME_TYPES[ext] || 'application/octet-stream';
      res.writeHead(200, {
        'Content-Type': contentType,
        'Cache-Control': 'no-cache',
        'Access-Control-Allow-Origin': '*'
      });
      fs.createReadStream(safePath).pipe(res);
    } else {
      // Fallback to index.html for SPA/clean routing
      const indexPath = path.join(__dirname, 'index.html');
      fs.stat(indexPath, (indexErr, indexStats) => {
        if (!indexErr && indexStats.isFile()) {
          res.writeHead(200, { 'Content-Type': 'text/html; charset=utf-8' });
          fs.createReadStream(indexPath).pipe(res);
        } else {
          res.writeHead(404, { 'Content-Type': 'text/plain' });
          res.end('404 Not Found');
        }
      });
    }
  });
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`\n======================================================`);
  console.log(`  🚀 THRYVE Official Server Running!`);
  console.log(`  🔗 Local URL:  http://localhost:${PORT}`);
  console.log(`  🔗 Network:    http://127.0.0.1:${PORT}`);
  console.log(`  🎟️ Register:   http://localhost:${PORT}/registration`);
  console.log(`======================================================\n`);
});
