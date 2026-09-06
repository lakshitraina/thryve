/**
 * THRYVE DATA STORE - CODE HEIST HACKATHON (OPERATION 18.09)
 * Official Event Planning Data • 18/09/2026 – 19/09/2026 (5:00 PM – 5:00 PM)
 * Organized by THRYVE • Lovely Professional University, Punjab
 */

const THRYVE_DATA = {
  eventMeta: {
    orgName: 'THRYVE',
    eventName: 'CODE HEIST HACKATHON',
    tagline: 'THE PLAN IS SET. THE REST IS UP TO YOU.',
    eventType: 'Technical (Hackathon)',
    startDate: '18/09/2026',
    endDate: '19/09/2026',
    startTime: '5:00 PM',
    endTime: '5:00 PM (24 Hours)',
    targetIso: '2026-09-18T17:00:00+05:30',
    registrationFee: '₹199 / person',
    registrationLink: 'https://app.macbease.com/events/6a9867eb7f1083507fb8dcf9',
    registrationPartner: 'Macbease',
    refundPolicy: 'No refund will be provided after registration.',
    prizePool: '₹20,000+ worth of prizes',
    certificates: 'Certificates for participants, winners, and organizers',
    targetAudience: 'Students interested in technology, coding, AI, and software development'
  },

  stats: [
    { value: '24h', label: 'TIME WINDOW (5PM–5PM)', highlight: false },
    { value: '₹20K+', label: 'WORTH OF PRIZES', highlight: true },
    { value: '₹199', label: 'ENTRY FEE / PERSON', highlight: false },
    { value: '100', label: 'MARKS SCORECARD', highlight: false },
    { value: '100%', label: 'CERTS FOR ALL', highlight: false }
  ],

  ticker: [
    { type: 'now', tag: 'OPERATION 18.09', title: 'CODE HEIST HACKATHON', detail: '18 Sep 5:00 PM – 19 Sep 5:00 PM (24 Hours Non-Stop @ LPU)' },
    { type: 'upcoming', tag: 'POWERED BY', title: 'OSEN', detail: 'Official Powered By Sponsor & Tech Infrastructure' },
    { type: 'upcoming', tag: 'CO-POWERED BY', title: 'SectorX', detail: 'Embrace The Unique • Official Goodies & Keyboards' },
    { type: 'upcoming', tag: 'PRIZE POOL', title: '₹20,000+ Worth of Prizes', detail: 'Cash Awards, SectorX Keyboards, Bottles & Certs' },
    { type: 'soldout', tag: 'REGISTRATION', title: 'Pass ₹199 / Person via Macbease', detail: 'Strict No-Refund Policy After Registration' },
    { type: 'upcoming', tag: 'GUEST MENTOR', title: 'Praful Yadav', detail: 'Sr. Software Engineer at AlgoTutor (Ex-Siemens, Ex-Coding Blocks)' },
    { type: 'upcoming', tag: 'GUEST MENTOR', title: 'Amit Singh', detail: 'Software Engineer L2 at 6thStreet.com | IIT Jodhpur (M.Tech AI)' },
    { type: 'upcoming', tag: 'EVALUATION', title: '3 Official Rounds', detail: '100-Mark Standardized Judge Score Sheet' }
  ],

  tracks: [
    {
      id: 'ai-everyday',
      icon: '🤖',
      title: 'AI for Everyday Life',
      desc: 'Build an AI-powered solution that solves a practical real-world problem. Leverage LLMs, autonomous agentic workflows, computer vision, or smart predictive systems.',
      tags: ['Artificial Intelligence', 'LLMs & Agents', 'Computer Vision', 'NLP & ML']
    },
    {
      id: 'smart-campus',
      icon: '🏫',
      title: 'Smart Campus Innovation',
      desc: 'Develop a solution to improve student life, campus facilities, safety, peer-to-peer resource management, automated attendance, or navigation.',
      tags: ['Campus Tech', 'Student Utility', 'IoT Systems', 'Safety & Logistics']
    },
    {
      id: 'fintech',
      icon: '💳',
      title: 'FinTech for Everyone',
      desc: 'Create an innovative solution that improves financial management, accessibility, fraud detection, security, micro-investing, or digital payments.',
      tags: ['FinTech', 'Digital Payments', 'Security & Fraud Prevention', 'Personal Finance']
    },
    {
      id: 'sustainability',
      icon: '🌱',
      title: 'Sustainable Future',
      desc: 'Build a technology-driven solution addressing critical environmental challenges such as smart waste management, energy efficiency, clean tech, or sustainability tracking.',
      tags: ['CleanTech', 'Energy Efficiency', 'Waste Management', 'Carbon Tracking']
    },
    {
      id: 'healthcare',
      icon: '🩺',
      title: 'Healthcare & Smart Tech',
      desc: 'Develop modern digital health solutions, telemedicine utilities, automated diagnostics assistance, health record accessibility, or smart patient care.',
      tags: ['HealthTech', 'Telemedicine', 'Smart Diagnostics', 'Assistive Tech']
    },
    {
      id: 'web-wildcard',
      icon: '💡',
      title: 'Web & App Open Innovation',
      desc: 'Have a disruptive concept across web, mobile, developer tooling, or cloud systems? Build and pitch your wildest tech prototype under open innovation.',
      tags: ['Full Stack', 'Cloud & DevOps', 'Mobile Apps', 'Open Source']
    }
  ],

  schedule: [
    {
      time: '18 Sep, 05:00 PM – 06:00 PM',
      title: 'Registration & Team Check-in',
      desc: 'Arrive at the hackathon arena, verify digital passes, receive official hacker kits and get settled with your squad.',
      phase: 'checkin',
      badge: 'Kickoff'
    },
    {
      time: '18 Sep, 06:00 PM – 06:30 PM',
      title: 'Opening Ceremony & Briefing',
      desc: 'Official launch of Code Heist (Operation 18.09), problem statements deep dive, judging rules breakdown, and mentor introductions.',
      phase: 'briefing',
      badge: 'Keynote'
    },
    {
      time: '18 Sep, 06:30 PM – 08:00 PM',
      title: 'Round 1: Idea Submission & Evaluation',
      desc: 'Teams present problem statements, architectural approaches, and innovation blueprints. Initial shortlisting by the evaluation committee.',
      phase: 'round1',
      badge: 'Round 1 • Shortlisting'
    },
    {
      time: '18 Sep, 08:00 PM – 19 Sep, 07:00 AM',
      title: 'Development Phase — No Elimination',
      desc: 'The uninterrupted 11-hour overnight coding marathon! Hackers build prototypes with zero fear of elimination. Continuous hacker support provided.',
      phase: 'overnight',
      badge: '🛡️ Safe Coding Zone (No Elimination)'
    },
    {
      time: '19 Sep, 07:00 AM – 09:00 AM',
      title: 'Round 2: Progress/Prototype Evaluation & Elimination',
      desc: 'Jury reviews working codebases, UI/UX flows, and progress milestones. Further shortlisting and elimination round.',
      phase: 'round2',
      badge: 'Round 2 • Elimination'
    },
    {
      time: '19 Sep, 09:00 AM – 12:00 PM',
      title: 'Development & Mentorship Session',
      desc: 'Hands-on 1-on-1 mentorship rounds with industry leaders Praful Yadav and Amit Singh to refine architectures, pitch decks, and APIs.',
      phase: 'mentorship',
      badge: 'Mentorship Sprint'
    },
    {
      time: '19 Sep, 12:00 PM – 01:30 PM',
      title: 'Round 3: Technical Evaluation & Elimination',
      desc: 'Deep technical code review, scalability analysis, database verification, and final round qualifying team selection.',
      phase: 'round3',
      badge: 'Round 3 • Elimination'
    },
    {
      time: '19 Sep, 01:30 PM – 03:00 PM',
      title: 'Final Development & Submission Freeze',
      desc: 'Final polish, GitHub repository freeze, live URL deployment, and pitch slide submissions. Code submission portal closes promptly.',
      phase: 'submission',
      badge: 'Code Freeze'
    },
    {
      time: '19 Sep, 03:00 PM – 04:00 PM',
      title: 'Final Round: Project Presentation & Jury Evaluation',
      desc: 'Finalist teams present live working product demonstrations on the main stage followed by direct technical Q&A with the jury panel.',
      phase: 'finalround',
      badge: 'Final Stage Pitches'
    },
    {
      time: '19 Sep, 04:00 PM – 04:30 PM',
      title: 'Final Judging & Result Compilation',
      desc: 'Judges compute scores across all 6 predefined criteria (100 Marks total) to determine winners and special mentions.',
      phase: 'judging',
      badge: '100-Mark Compilation'
    },
    {
      time: '19 Sep, 04:30 PM – 05:00 PM',
      title: 'Winner Announcement, Prize Distribution & Closing Ceremony',
      desc: 'Declaration of Code Heist champions! Distribution of ₹20,000+ prizes, official SectorX mechanical keyboards, specialized bottles, and verified certificates.',
      phase: 'awards',
      badge: 'Grand Finale 🏆'
    }
  ],

  rounds: [
    {
      number: '01',
      title: 'Round 1 — Idea & Innovation Evaluation',
      timing: '6:30 PM – 8:00 PM (18 Sep)',
      desc: 'Teams present their chosen problem statement, core idea, proposed architectural solution, and innovation quotient. Teams are shortlisted to progress.',
      status: 'Initial Shortlist'
    },
    {
      number: '02',
      title: 'Round 2 — Prototype & Technical Evaluation',
      timing: '7:00 AM – 9:00 AM (19 Sep)',
      desc: 'Shortlisted teams demonstrate their working prototype, code structure, technical progress, and database/API integration. Further teams may be eliminated.',
      status: 'Technical Checkpoint'
    },
    {
      number: '03',
      title: 'Round 3 — Final Presentation & Live Demo',
      timing: '3:00 PM – 4:00 PM (19 Sep)',
      desc: 'Finalist teams present their completed working solution to the full jury panel, followed by live demonstration and an interactive technical Q&A session.',
      status: 'Grand Final & Jury'
    },
    {
      number: '04',
      title: 'Final Selection — Winner Declaration',
      timing: '4:00 PM – 5:00 PM (19 Sep)',
      desc: 'Judges evaluate the finalists based on the standardized 100-mark score sheet to determine podium winners, category grants, and special partner awards.',
      status: 'Victory & ₹20K+ Rewards'
    }
  ],

  scoreSheet: [
    {
      criteria: 'Innovation & Creativity',
      marks: 20,
      desc: 'Uniqueness and originality of the idea. How groundbreaking and novel is the proposed solution compared to existing market tools?'
    },
    {
      criteria: 'Technical Implementation',
      marks: 20,
      desc: 'Effective use of technology, software architecture, clean code quality, scalability, and mastery of technical skills.'
    },
    {
      criteria: 'Functionality & Working Prototype',
      marks: 20,
      desc: 'Working prototype readiness, feature completion, robustness, and execution quality demonstrated during the hackathon.'
    },
    {
      criteria: 'Real-World Impact & Relevance',
      marks: 15,
      desc: 'Practicality, usefulness, market applicability, and potential impact on solving the designated problem statement.'
    },
    {
      criteria: 'User Experience & Design',
      marks: 10,
      desc: 'Simplicity, intuitiveness, visual design, responsiveness, accessibility, and overall user interaction flow.'
    },
    {
      criteria: 'Presentation & Demo',
      marks: 15,
      desc: 'Clarity, confidence, pitch effectiveness, live demo stability, and articulate answers during the jury Q&A.'
    }
  ],

  mentors: [
    {
      id: 'praful-yadav',
      name: 'Praful Yadav',
      role: 'Senior Software Engineer at AlgoTutor',
      company: 'AlgoTutor',
      headline: 'Building AlgoTutor • Ex-Siemens • Ex-Coding Blocks • Ex-ISRO Intern',
      education: 'GLA University Alumnus • GoogleCloudReady Facilitator 2022',
      experience: [
        'Senior Software Engineer at AlgoTutor (Software Infrastructure & Engineering)',
        'Ex-Software Engineer at Siemens Digital Industries Software',
        'Ex-Full-stack Mentor at Coding Blocks',
        'Ex-Outreach Intern at ISRO (Indian Space Research Organisation)'
      ],
      linkedin: 'https://www.linkedin.com/in/praful-yadav-b46100215/',
      avatarText: 'PY',
      image: 'assets/praful-yadav.jpg',
      skills: ['Software Infrastructure', 'Full-Stack Engineering', 'Cloud & Distributed Systems', 'Mentorship']
    },
    {
      id: 'amit-singh',
      name: 'Amit Singh',
      role: 'Software Engineer (L2) at 6thStreet.com',
      company: '6thStreet.com (Apparel Group, Dubai)',
      headline: 'M.Tech in AI (IIT Jodhpur) • Ex-Product Engineer at Pepcoding',
      education: 'IIT Jodhpur (M.Tech Artificial Intelligence) | Dr. A.P.J. Abdul Kalam Technical University',
      experience: [
        'Software Engineer (L2) at 6thStreet.com (Apparel Group, Dubai) — Built CMS for Crocs & Tommy Hilfiger',
        'Ex-Product Engineer & Data Structure Content Creator at Pepcoding Education',
        'Master of Technology (Artificial Intelligence) from IIT Jodhpur',
        'Ex-DSA Instructor with 4+ years of industry experience'
      ],
      linkedin: 'https://www.linkedin.com/in/amit-singh-8562a0162/',
      avatarText: 'AS',
      image: 'assets/amit-singh.jpg',
      skills: ['Artificial Intelligence', 'React.js & Node.js', 'E-Commerce CMS', 'DSA & Algorithms']
    }
  ],

  sponsors: [
    {
      id: 'osen',
      name: 'OSEN',
      tagline: 'POWERED BY',
      status: 'Powered By Partner',
      statusType: 'confirmed',
      logo: 'assets/osen-logo.png',
      icon: '💎',
      title: 'Official Powered By Partner',
      desc: 'OSEN powers the infrastructure, developer ecosystem, and technological support for Code Heist Hackathon at Lovely Professional University.',
      perks: ['Official Powered By Sponsor', 'Developer Ecosystem Support', 'Partner Tech Ecosystem']
    },
    {
      id: 'sectorx',
      name: 'SectorX',
      tagline: 'CO-POWERED BY • EMBRACE THE UNIQUE',
      status: 'Co-Powered By',
      statusType: 'confirmed',
      logo: 'assets/sectorx-logo.png',
      icon: '⚡',
      title: 'Official Goodies & Gear Partner',
      desc: 'SectorX is the official co-powered by and goodies partner for Code Heist Hackathon, providing high-performance mechanical keyboards, specialized bottles, and exclusive tech kits for winning teams.',
      perks: ['Official Mechanical Keyboards', 'Specialized SectorX Bottles', 'Winner Goody Kits & Swag']
    },
    {
      id: 'macbease',
      name: 'Macbease',
      tagline: 'REGISTRATION GATEWAY',
      status: 'Official Partner',
      statusType: 'confirmed',
      icon: '🎫',
      title: 'Official Ticketing & Registration Partner',
      desc: 'Macbease powers the seamless registration, pass issuance, and verification gateway for Code Heist Hackathon. Secure your ₹199 per person entry pass with instant verification.',
      perks: ['Official Registration Link', 'Fast Checkout & Pass Issue', 'Direct Event Sync']
    }
  ],

  rules: [
    {
      title: 'Hackathon Timeline Adherence',
      desc: 'Participants must follow the minute-to-minute hackathon timeline, maintain discipline, and be present during their designated evaluation slots.'
    },
    {
      title: 'Original Work Only',
      desc: 'All project code, architectures, and design assets must be developed during the 24-hour hackathon duration. Using pre-existing completed projects is strictly forbidden.'
    },
    {
      title: 'Strict Anti-Plagiarism & Disqualification',
      desc: 'Plagiarism, misconduct, unauthorized external assistance, or violation of event rules will result in immediate disqualification without warning.'
    },
    {
      title: 'Judges’ Decision is Final',
      desc: 'Evaluation is based on the official 100-mark score sheet across 6 parameters. The decisions of the judging panel and jury will be final and binding.'
    },
    {
      title: 'No Elimination Overnight Window',
      desc: 'Eliminations will take place only during designated evaluation rounds. Absolutely NO elimination will occur during the overnight phase (8:00 PM to 7:00 AM).'
    },
    {
      title: 'Official Refund Policy',
      desc: 'Strict Policy: No refund will be provided after registration under any circumstances once the entry pass is booked.'
    }
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
      date: '18 Sep 5:00 PM – 19 Sep 5:00 PM (24h)',
      venue: 'Lovely Professional University, Punjab',
      price: '₹199 / Person',
      isFree: false,
      image: 'assets/code-heist-poster.jpg',
      description: 'The Plan is Set. The Rest is Up to You. A 24-hour student hackathon organized by THRYVE featuring ₹20,000+ worth of prizes, SectorX mechanical keyboards & specialized bottles for winners, and verified certificates for all participants, winners, and organizers.',
      lineup: '₹20,000+ Prize Pool • SectorX Winner Goodies • Verified Certs',
      capacity: 'Limited Slots Across Batches',
      spotsLeft: 'Registrations Open via Macbease'
    }
  ],

  faqs: [
    {
      q: 'What is CODE HEIST HACKATHON and when is it happening?',
      a: 'CODE HEIST is a 24-hour student hackathon organized by THRYVE. It is scheduled from 18 September 2026 at 5:00 PM to 19 September 2026 at 5:00 PM at Lovely Professional University (LPU), Punjab. It is designed to provide students with a platform to collaborate, innovate, and develop technology-driven solutions to real-world problems.'
    },
    {
      q: 'Who can participate and what is the registration fee?',
      a: 'The event is open to all students interested in technology, coding, AI, and software development. The registration fee is ₹199/- per person. Registration is officially managed via Macbease.'
    },
    {
      q: 'What is the refund policy for registration?',
      a: 'Refund Policy: No refund will be provided after registration under any circumstances. Please confirm your team details and availability before booking.'
    },
    {
      q: 'What prizes and perks are offered for winners and participants?',
      a: 'Winners will be awarded ₹20,000+ worth of prizes, official goodies from SectorX including mechanical keyboards and specialized water bottles, cash rewards, and vouchers. Verified certificates will be provided to all participants, winners, and organizers!'
    },
    {
      q: 'How does the evaluation process and 100-mark score sheet work?',
      a: 'Evaluation occurs in 3 rounds: Round 1 (Idea & Innovation), Round 2 (Prototype & Technical), and Round 3 (Final Presentation & Demo). The jury scores projects out of 100 Marks: Innovation & Creativity (20), Technical Implementation (20), Functionality & Prototype (20), Real-World Impact (15), UX & Design (10), and Presentation & Demo (15).'
    },
    {
      q: 'Are there eliminations during the night?',
      a: 'No! Eliminations take place only during the designated evaluation rounds (Round 1 at 6:30 PM, Round 2 at 7:00 AM, Round 3 at 12:00 PM). Absolutely no elimination will occur between 8:00 PM and 7:00 AM, giving your team an uninterrupted overnight build sprint.'
    },
    {
      q: 'Who are the guest mentors and judges?',
      a: 'The panel features renowned tech leaders: Praful Yadav (Senior Software Engineer at AlgoTutor, Ex-Siemens, Ex-Coding Blocks) and Amit Singh (Software Engineer L2 at 6thStreet.com, IIT Jodhpur M.Tech AI, Ex-Pepcoding).'
    },
    {
      q: 'How can I contact the THRYVE Help Desk for queries or partnerships?',
      a: 'You can email us directly at thryveofficial@gmail.com or support@clubthryve.in, or reach our help desk via phone/WhatsApp at +91 787684881.'
    }
  ]
};
