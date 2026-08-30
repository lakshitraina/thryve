/**
 * THRYVE DATA STORE - CODE HEIST HACKATHON (OPERATION 18.09)
 * Official Flagship Platform for Lovely Professional University, Punjab
 */

const THRYVE_DATA = {
  stats: [
    { value: '24h', label: 'TIME WINDOW', highlight: false },
    { value: '₹20K+', label: 'WORTH OF PRIZES', highlight: true },
    { value: '₹199', label: 'ENTRY FEE / PASS', highlight: false },
    { value: '100%', label: 'CERTIFICATES FOR ALL', highlight: false },
    { value: 'LPU', label: 'PUNJAB CAMPUS', highlight: false }
  ],

  ticker: [
    { type: 'now', tag: 'OPERATION 18.09', title: 'CODE HEIST HACKATHON', detail: 'Registrations Live • 18 Sep 2026 • LPU Punjab' },
    { type: 'upcoming', tag: 'PRIZE POOL', title: '₹20,000+ Worth of Prizes', detail: 'Cash, Goodies, Trophy & Certs' },
    { type: 'upcoming', tag: 'DURATION', title: '24 Hours Non-Stop Hack', detail: 'Collaborate • Build • Win' },
    { type: 'soldout', tag: 'SLOTS', title: 'Early Bird Pass ₹199', detail: 'Batch Registrations Open' },
    { type: 'upcoming', tag: 'VENUE', title: 'Lovely Professional University', detail: 'Main Campus, Punjab' }
  ],

  tracks: [
    {
      icon: '🤖',
      title: 'AI & Autonomous Systems',
      desc: 'Build next-gen LLM tools, agentic workflows, computer vision apps, and intelligent developer tools.',
      tags: ['Generative AI', 'Agentic Workflows', 'Computer Vision', 'NLP']
    },
    {
      icon: '⚡',
      title: 'Web3 & FinTech Solutions',
      desc: 'Smart money management, fraud detection algorithms, micro-investing tools, or decentralized utilities.',
      tags: ['FinTech', 'Smart Contracts', 'Security', 'Payment Sprints']
    },
    {
      icon: '🏫',
      title: 'Smart Campus & EdTech',
      desc: 'Transform university life: automated attendance, campus navigation, peer resource sharing, and student tools.',
      tags: ['Campus Tech', 'Student Utility', 'EdTech', 'Productivity']
    },
    {
      icon: '💡',
      title: 'Open Innovation (Wildcard)',
      desc: 'Got a disruptive idea that doesn\'t fit standard boxes? Build and pitch your wildest tech prototype.',
      tags: ['Hardware/IoT', 'HealthTech', 'Sustainability', 'Social Good']
    }
  ],

  schedule: [
    { time: '18 Sep, 09:00 AM', title: 'Check-In & Hacker Badge Issuance', desc: 'Arrive at the main hall, collect your hacker kit and digital pass verification.' },
    { time: '18 Sep, 10:00 AM', title: 'Operation 18.09 Briefing & Opening', desc: 'Problem statements breakdown and introduction of mentors and jury panel.' },
    { time: '18 Sep, 11:00 AM', title: '⚡ 24-Hour Heist Coding Begins', desc: 'The countdown starts! Teams begin executing their architectural plans.' },
    { time: '18 Sep, 04:00 PM', title: 'Mentorship & Checkpoint Round 1', desc: 'Senior developer mentors review your progress and help clear blockers.' },
    { time: '18 Sep, 10:00 PM', title: 'Midnight Code Sprint & Energizers', desc: 'Late night coding session with refreshments and mini-challenges.' },
    { time: '19 Sep, 08:00 AM', title: 'Code Freeze & GitHub Submissions', desc: 'Final commits, demo video uploads, and project deployment links submitted.' },
    { time: '19 Sep, 10:00 AM', title: 'Live Project Pitching to Jury', desc: 'Top finalist teams present live 5-minute pitches on the main stage.' },
    { time: '19 Sep, 01:00 PM', title: 'Award Ceremony & ₹20K+ Prize Distribution', desc: 'Winners announced, cash prizes awarded, and certificates issued to all.' }
  ],

  ladder: [
    { step: 'IDEA', title: 'The Concept', desc: 'Brainstorm the high-impact solution' },
    { step: 'PLAN', title: 'The Blueprint', desc: 'Architect your tech stack & MVP' },
    { step: 'CODE', title: 'The Execution', desc: 'Write clean, robust code in 24h' },
    { step: 'BUILD', title: 'The Prototype', desc: 'Deploy a live working product' },
    { step: 'TEST', title: 'The Stress-Test', desc: 'Verify edge cases & UX flow' },
    { step: 'WIN', title: 'The Heist', desc: 'Pitch to judges & claim ₹20K+' }
  ],

  events: [
    {
      id: 'code-heist',
      title: 'CODE HEIST HACKATHON (Operation 18.09)',
      category: 'tech',
      status: 'live',
      statusLabel: 'Flagship • Registrations Live',
      date: '18 Sep 2026 • 24 Hours',
      venue: 'Lovely Professional University, Punjab',
      price: '₹199 / Entry Pass',
      isFree: false,
      image: 'assets/code-heist-poster.jpg',
      description: 'The Plan is Set. The Rest is Up to You. A 24-hour non-stop hackathon by THRYVE featuring ₹20,000+ worth of prizes, certificates for all participants, and top industry mentors.',
      lineup: '₹20,000+ Prize Pool • Certificates for All',
      capacity: 'Limited Slots Across Batches',
      spotsLeft: 'Registrations Open'
    }
  ],

  faqs: [
    {
      q: 'What is CODE HEIST HACKATHON and who can participate?',
      a: 'CODE HEIST is THRYVE\'s 24-hour flagship hackathon scheduled for 18 September 2026 at Lovely Professional University (LPU), Punjab. It is open to all university students! Whether you are a coder, designer, or idea enthusiast, you can form a team and build an impactful project.'
    },
    {
      q: 'What is the registration fee and prize pool?',
      a: 'The entry fee is just ₹199 per team. The prize pool includes ₹20,000+ worth of cash awards, goodies, certificates of excellence, and verified participation certificates for all registered hackers.'
    },
    {
      q: 'What are the rules and team size for Code Heist?',
      a: 'Teams can consist of 1 to 4 members. You will have 24 continuous hours to code, build, and deploy your idea following the roadmap: IDEA → PLAN → CODE → BUILD → TEST → WIN.'
    },
    {
      q: 'How do I get my official Code Heist entry pass?',
      a: 'Click "Register for Code Heist (₹199)" anywhere on this site. Enter your details and download your custom digital lanyard badge with your unique hacker ID and scannable QR code.'
    },
    {
      q: 'How can I contact THRYVE team for queries or partnerships?',
      a: 'You can email us directly at thryveofficial@gmail.com or support@clubthryve.in, or call/WhatsApp us at +91 787684881. You can also visit our student desk at Student Activity Center, Lovely Professional University (LPU), Punjab.'
    },
    {
      q: 'How can I join the THRYVE organizing crew at LPU?',
      a: 'THRYVE is actively recruiting for Tech, Event Operations, PR & Media, Design, and Logistics. Click "Join The Crew" to submit your application directly to the executive council!'
    }
  ]
};
