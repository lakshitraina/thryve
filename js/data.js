/**
 * THRYVE DATA STORE — OFFICIAL CLUB PORTAL
 * Flagship Event: SAFARNAMA — A Trip Beyond The Classroom (Chhatbir Zoo, Rock Garden, Rose Garden)
 * Successfully Conducted Event: CODE HEIST HACKATHON '26 (Operation 18.09)
 * Organized by THRYVE • Lovely Professional University, Punjab
 */

const THRYVE_DATA = {
  eventMeta: {
    orgName: 'THRYVE',
    eventName: 'SAFARNAMA',
    fullTitle: 'SAFARNAMA — A Trip Beyond The Classroom',
    tagline: 'EXPLORE • DISCOVER • UNWIND • TOGETHER',
    eventType: 'Educational & Recreational Trip',
    destinations: 'Chhatbir Zoo, Rock Garden & Rose Garden, Chandigarh',
    destinationList: ['Chhatbir Zoo', 'Rock Garden', 'Rose Garden'],
    city: 'Chandigarh',
    departurePoint: 'Lovely Professional University (LPU), Punjab',
    travelMode: 'AC Bus (To & Fro Included)',
    targetAudience: 'Exclusively for LPU Students',
    dateLabel: '21 November 2026',
    pricePerPerson: '₹749',
    priceNumber: 749,
    status: 'Upcoming Flagship Trip • Registrations Live',
    targetIso: '2026-11-21T04:00:00+05:30',
    scheduleWindow: '4:00 AM – 12:00 AM (Full Day Expedition)',
    posterImage: 'assets/safarnama-poster.jpg',
    shortDescription: 'SAFARNAMA is an educational and recreational trip organized by THRYVE, designed to provide students with an opportunity to explore wildlife, nature, and cultural attractions while enjoying a refreshing break from academic life. The trip will include a visit to Chhatbir Zoo, Chandigarh, where participants can explore wildlife and learn about animal conservation, followed by a visit to the Rose Garden, Chandigarh, to enjoy its natural beauty and peaceful surroundings. The event aims to promote social interaction, teamwork, and memorable experiences beyond the classroom.',
    highlights: [
      'Photography & Candid Memories',
      'Wildlife & Nature Conservation',
      'Lush Botanical Trails & Roses',
      'Friends & Social Bonding',
      'Refreshing Break from Academics',
      'Luxury AC Bus Travel (To & Fro)'
    ]
  },

  stats: [
    { value: '3', label: 'ICONIC DESTINATIONS', highlight: false },
    { value: '₹749', label: 'PER PERSON (AC BUS INCL)', highlight: true },
    { value: '20h', label: 'FULL DAY EXPEDITION', highlight: false },
    { value: 'LPU', label: 'FOR LPU STUDENTS', highlight: false },
    { value: '100%', label: 'NATURE & GOOD VIBES', highlight: false }
  ],

  ticker: [
    { type: 'now', tag: 'EXPEDITION DATE', title: '21 NOVEMBER 2026', detail: 'Reporting 4:00 AM @ LPU Campus • Luxury AC Bus to Chandigarh' },
    { type: 'upcoming', tag: 'DESTINATION 1', title: 'Chhatbir Zoo Chandigarh', detail: 'Wildlife Exploration & Animal Conservation' },
    { type: 'upcoming', tag: 'DESTINATION 2', title: 'Rock Garden Chandigarh', detail: 'Art, Culture & Unique Nek Chand Sculptures' },
    { type: 'upcoming', tag: 'DESTINATION 3', title: 'Rose Garden Chandigarh', detail: 'Beautiful Surroundings, Nature Walks & Memories' },
    { type: 'upcoming', tag: 'COMFORT', title: 'Luxury AC Bus', detail: 'Hassle-Free To & Fro Transit from LPU Campus' },
    { type: 'soldout', tag: 'HALL OF FAME', title: 'Code Heist Hackathon', detail: 'Successfully Conducted! Check Out The Photo Gallery' },
    { type: 'upcoming', tag: 'REGISTRATIONS', title: 'Seats Opening Soon', detail: 'Limited Bus Capacity — Pre-Register to Lock Your Seat' }
  ],

  destinations: [
    {
      id: 'chhatbir-zoo',
      name: 'Chhatbir Zoo (M.C. Zoological Park)',
      location: 'Chandigarh / Zirakpur',
      icon: '🦁',
      badge: 'Wildlife & Conservation',
      tagline: 'Wildlife • Nature • Friends • Good Vibes',
      desc: 'Spread across expansive lush green acres, Chhatbir Zoo is one of North India’s premier zoological reserves. Home to Royal Bengal tigers, Asiatic lions, elephants, leopards, and an exotic walk-through aviary. Explore rich biodiversity and discover real animal conservation efforts.',
      highlights: [
        'Royal Bengal Tigers & Lion Safari',
        'Walk-Through Aviary with 100+ Bird Species',
        'Conservation Education & Wildlife Ecology',
        'Scenic Forest Walking Trails & Photography'
      ]
    },
    {
      id: 'rock-garden',
      name: 'Rock Garden of Chandigarh',
      location: 'Sector 1, Chandigarh',
      icon: '🗿',
      badge: 'Art & Cultural Wonder',
      tagline: 'Art • Culture • Unique Experience',
      desc: 'A globally acclaimed open-air marvel sculpted entirely from industrial and urban waste, discarded ceramic tiles, glass bangles, and stone by visionary artist Nek Chand. Features courtyards, grand archways, amphitheaters, and picturesque man-made waterfalls.',
      highlights: [
        'Nek Chand’s Legendary Upcycled Sculptures',
        'Majestic Cascading Waterfalls & Ponds',
        'Fascinating Labyrinth of Arched Courtyards',
        'World-Renowned Example of Sustainable Art'
      ]
    },
    {
      id: 'rose-garden',
      name: 'Zakir Hussain Rose Garden',
      location: 'Sector 16, Chandigarh',
      icon: '🌹',
      badge: 'Nature & Serenity',
      tagline: 'Beautiful Surroundings • Nature Walks • Memories',
      desc: 'Asia’s largest botanical rose garden covering over 30 landscaped acres. Featuring more than 50,000 rose bushes spanning 1,600+ exotic floral varieties alongside rare medicinal trees, manicured lawns, and musical fountains. The perfect peaceful retreat.',
      highlights: [
        'Over 1,600 Distinct Varieties of Roses',
        'Vibrant Floral Walks & Shaded Benches',
        'Medicinal Plant Sanctuary & Tall Canopies',
        'Serene Golden Hour for Group Photography'
      ]
    }
  ],

  schedule: [
    {
      time: '4:00 AM – 4:30 AM',
      title: 'Reporting, Attendance & Gathering',
      desc: 'Participants report at the designated campus gathering point at Lovely Professional University. Coordinators conduct the first attendance check, roll call, and briefing.',
      phase: 'gathering',
      badge: 'Reporting'
    },
    {
      time: '4:30 AM – 5:00 AM',
      title: 'Departure Preparation & Boarding',
      desc: 'Boarding the luxury AC buses, luggage placement, emergency briefing, and final head-count before departure.',
      phase: 'boarding',
      badge: 'Boarding'
    },
    {
      time: '5:00 AM – 8:00 AM',
      title: 'Journey to Chandigarh',
      desc: 'Early morning highway ride towards Chandigarh with pleasant morning views, fun travel music, and peer networking.',
      phase: 'travel',
      badge: 'AC Bus Journey'
    },
    {
      time: '8:00 AM – 8:30 AM',
      title: 'Arrival at Chhatbir Zoo & Entry Formalities',
      desc: 'Buses arrive at Chhatbir Zoo. Group coordination, ticket distribution, and entry queue clearance handled by THRYVE team.',
      phase: 'arrival',
      badge: 'Zoo Arrival'
    },
    {
      time: '8:30 AM – 11:30 AM',
      title: 'Chhatbir Zoo Visit & Wildlife Exploration',
      desc: 'Extensive exploration of the zoological park. Discover exotic wildlife, learn about animal conservation, see Royal Bengal tigers, lions, and aviaries.',
      phase: 'zoo',
      badge: 'Wildlife Exploration'
    },
    {
      time: '11:30 AM – 12:00 PM',
      title: 'Group Photography & Gathering',
      desc: 'Assemble at the central meeting area for official THRYVE group photographs, squad portraits, and coordinator headcount.',
      phase: 'photo',
      badge: 'Group Photography'
    },
    {
      time: '12:00 PM – 1:00 PM',
      title: 'Lunch Break',
      desc: 'Wholesome lunch break to relax, re-energize, and share experiences with friends amidst pleasant open surroundings.',
      phase: 'meal',
      badge: 'Lunch Break 🍱'
    },
    {
      time: '1:00 PM – 2:00 PM',
      title: 'Travel to Rose Garden, Chandigarh',
      desc: 'Board buses and travel through the scenic sectors of Chandigarh city towards the famous Rose Garden (with Rock Garden sights).',
      phase: 'travel',
      badge: 'City Transit'
    },
    {
      time: '2:00 PM – 4:00 PM',
      title: 'Rose Garden Visit & Nature Exploration',
      desc: 'Walk through Asia’s largest rose sanctuary. Enjoy hundreds of blooming varieties, serene lawns, fresh air, and picturesque greenery.',
      phase: 'garden',
      badge: 'Nature Exploration'
    },
    {
      time: '4:00 PM – 4:30 PM',
      title: 'Group Activities, Photography & Refreshments',
      desc: 'Fun informal social games, team-building activities, golden-hour photo sessions, and light evening refreshments.',
      phase: 'activities',
      badge: 'Games & Refreshments'
    },
    {
      time: '4:30 PM – 5:00 PM',
      title: 'Gathering, Attendance & Departure Preparation',
      desc: 'Assemble at the designated bus pick-up zone, final attendance roll-call, and boarding for the return trip to LPU.',
      phase: 'evening',
      badge: 'Boarding'
    },
    {
      time: '5:00 PM – 8:00 PM',
      title: 'Return Journey',
      desc: 'Sunset and evening highway cruise back toward Punjab with lively bus games, songs, and travel memories.',
      phase: 'travel',
      badge: 'Return Journey'
    },
    {
      time: '8:00 PM – 9:00 PM',
      title: 'Dinner Break',
      desc: 'Stop at a hygienic highway restaurant/food plaza for dinner, stretching, and freshening up.',
      phase: 'meal',
      badge: 'Dinner Break 🍽️'
    },
    {
      time: '9:00 PM – 11:30 PM',
      title: 'Continued Return Journey',
      desc: 'Smooth final highway stretch cruising back directly to the Lovely Professional University campus.',
      phase: 'travel',
      badge: 'Night Drive'
    },
    {
      time: '11:30 PM – 12:00 AM',
      title: 'Arrival, Final Attendance & Trip Conclusion',
      desc: 'Safe arrival at LPU campus, final coordinator attendance verification, and concluding an unforgettable Safarnama expedition!',
      phase: 'conclusion',
      badge: 'Safe Return & Wrap-up 🌟'
    }
  ],

  rules: [
    {
      title: 'Trip Schedule & Punctuality',
      desc: 'Participants must follow the trip schedule, maintain strict punctuality, and cooperate with the organizers throughout the entire journey from reporting to final return.',
      icon: '⏱️',
      tag: 'Punctuality'
    },
    {
      title: 'Safety Guidelines & Environmental Respect',
      desc: 'Everyone must follow the safety guidelines, respect the environment, and avoid disturbing animals or damaging public property at all destinations.',
      icon: '🌿',
      tag: 'Eco-Ethics'
    },
    {
      title: 'Group Unity & Coordinator Instructions',
      desc: 'Participants must remain with the group, follow instructions from THRYVE leads, and ensure responsible, polite behavior at all locations.',
      icon: '👥',
      tag: 'Group Safety'
    },
    {
      title: 'Zero Tolerance for Misconduct',
      desc: 'Any misconduct, unruly behavior, or breach of safety rules will not be tolerated and may result in appropriate disciplinary action by the organizers.',
      icon: '🛡️',
      tag: 'Discipline'
    }
  ],

  tripPerks: [
    {
      icon: '🚌',
      title: 'Luxury AC Bus Travel',
      desc: 'Safe, comfortable, air-conditioned round trip from LPU Campus to Chandigarh and back.'
    },
    {
      icon: '🦁',
      title: 'Zoo & Garden Entry Coordination',
      desc: 'Organized group entry passes so participants don’t have to wait in long ticket lines.'
    },
    {
      icon: '📸',
      title: 'Pro Group Photography',
      desc: 'Club media crew capturing high-resolution candid shots and group memories throughout the day.'
    },
    {
      icon: '🛡️',
      title: 'Dedicated Safety Marshals',
      desc: 'Experienced THRYVE team members ensuring safety, attendance, and student support.'
    },
    {
      icon: '🤝',
      title: 'Team Bonding & Networking',
      desc: 'Meet peers from diverse disciplines, make new friends, and unwind outside the classroom.'
    },
    {
      icon: '📜',
      title: 'Official Expedition E-Pass',
      desc: 'Digital personalized boarding pass with verified QR code and itinerary guide.'
    }
  ],

  // --------------------------------------------------------------------------
  // CODE HEIST: SUCCESSFULLY CONDUCTED EVENT RECAP & PHOTO GALLERY
  // --------------------------------------------------------------------------
  codeHeist: {
    status: 'Successfully Conducted',
    statusBadge: 'COMPLETED FLAGSHIP EVENT',
    eventName: 'CODE HEIST HACKATHON 2026',
    edition: 'Operation 18.09',
    tagline: '"THE PLAN IS SET. THE REST IS UP TO YOU."',
    dates: '18–19 September 2026 (24-Hour Non-Stop Hackathon)',
    venue: 'Lovely Professional University, Punjab',
    prizePool: '₹20,000+ Distributed',
    partners: 'Powered by OSEN • Co-Powered by SectorX • Macbease',
    summary: 'CODE HEIST was successfully conducted by THRYVE as Lovely Professional University premier 24-hour hackathon. Student innovators built cutting-edge prototypes across 6 key tracks with uninterrupted 11-hour overnight coding, 1-on-1 industry mentorship, SectorX mechanical keyboard gear rewards, and verified certificates.',
    stats: [
      { val: '24 Hours', label: 'NON-STOP EXECUTION' },
      { val: '₹20,000+', label: 'REWARDS DISTRIBUTED' },
      { val: '100', label: 'MARKS SCORECARD' },
      { val: '100%', label: 'VERIFIED CERTIFICATES' },
      { val: '0', label: 'OVERNIGHT ELIMINATIONS' }
    ]
  },

  codeHeistGallery: [
    {
      id: 'gallery-poster',
      title: 'Code Heist Official Poster Artwork',
      category: 'branding',
      categoryLabel: 'Official Poster',
      type: 'image',
      src: 'assets/code-heist-poster.jpg',
      caption: 'The official visual blueprint of Code Heist Hackathon (Operation 18.09) presented by THRYVE.'
    },
    {
      id: 'gallery-mentor-praful',
      title: 'Praful Yadav — Industry Mentor',
      category: 'mentors',
      categoryLabel: 'Guest Mentor',
      type: 'image',
      src: 'assets/praful-yadav.jpg',
      caption: 'Senior Software Engineer at AlgoTutor (Ex-Siemens, Ex-Coding Blocks) mentoring participant squads.'
    },
    {
      id: 'gallery-mentor-amit',
      title: 'Amit Singh — Industry Mentor',
      category: 'mentors',
      categoryLabel: 'Guest Mentor',
      type: 'image',
      src: 'assets/amit-singh.jpg',
      caption: 'Software Engineer L2 at 6thStreet.com | IIT Jodhpur (M.Tech AI) guiding system architectures.'
    },
    {
      id: 'gallery-sectorx',
      title: 'SectorX Mechanical Keyboards & Gear',
      category: 'goodies',
      categoryLabel: 'Partner Gear',
      type: 'image',
      src: 'assets/sectorx-logo.png',
      caption: 'Official partner SectorX providing high-performance mechanical keyboards & bottles for winning teams.'
    },
    {
      id: 'gallery-arena',
      title: '24h Hackathon Arena & Night Sprint',
      category: 'arena',
      categoryLabel: 'Hacking Arena',
      type: 'placeholder',
      icon: '💻',
      placeholderText: 'Coding Sprint Moments',
      caption: 'Intense overnight coding session where teams collaborated to build functional prototypes.'
    },
    {
      id: 'gallery-pitches',
      title: 'Final Stage Pitches & Jury Demos',
      category: 'presentations',
      categoryLabel: 'Live Pitches',
      type: 'placeholder',
      icon: '🎤',
      placeholderText: 'Project Demonstrations',
      caption: 'Top shortlisted squads showcasing their live working software to the evaluation jury.'
    },
    {
      id: 'gallery-winners',
      title: 'Winners Podium & Award Ceremony',
      category: 'winners',
      categoryLabel: 'Champions',
      type: 'placeholder',
      icon: '🏆',
      placeholderText: 'Prize & Trophy Moments',
      caption: 'Champions lifting trophies with ₹20,000+ reward pool and exclusive SectorX gaming gear.'
    },
    {
      id: 'gallery-crew',
      title: 'THRYVE Organizing Crew & Leads',
      category: 'crew',
      categoryLabel: 'Organizing Team',
      type: 'placeholder',
      icon: '👥',
      placeholderText: 'Behind The Scenes',
      caption: 'The student leadership and volunteers of THRYVE who flawlessly executed Operation 18.09.'
    }
  ],

  events: [
    {
      id: 'safarnama',
      title: 'SAFARNAMA — A Trip Beyond The Classroom',
      category: 'recreational',
      status: 'live',
      statusLabel: 'New Flagship Trip • Opening Soon',
      date: '21 November 2026 (4:00 AM – 12:00 AM)',
      venue: 'Chhatbir Zoo, Rock Garden & Rose Garden, Chandigarh',
      price: '₹749 / Person',
      isFree: false,
      image: 'assets/safarnama-poster.jpg',
      description: 'Educational and recreational trip organized by THRYVE for LPU students. Explore wildlife at Chhatbir Zoo, artistic marvels at Rock Garden, and scenic flora at Rose Garden, Chandigarh. Includes luxury AC bus travel to & fro.',
      lineup: 'Chhatbir Zoo • Rock Garden • Rose Garden • AC Bus Transit',
      capacity: 'Limited Bus Capacity for LPU Students',
      spotsLeft: 'Register Now via YouPI Gateway'
    },
    {
      id: 'code-heist',
      title: 'CODE HEIST HACKATHON (Operation 18.09)',
      category: 'tech',
      status: 'completed',
      statusLabel: 'Successfully Conducted ✓',
      date: '18–19 September 2026 (Completed)',
      venue: 'Lovely Professional University, Punjab',
      price: 'Completed Event',
      isFree: false,
      image: 'assets/code-heist-poster.jpg',
      description: 'Lovely Professional University premier 24-hour hackathon. Successfully conducted with ₹20,000+ prizes, SectorX mechanical keyboards, and 1-on-1 industry mentorship. Explore the official Photo Gallery!',
      lineup: '₹20,000+ Distributed • SectorX Mechanical Keyboards • Verified Certs',
      capacity: 'Successfully Concluded',
      spotsLeft: 'View Photo Gallery'
    }
  ],

  faqs: [
    {
      q: 'What is SAFARNAMA and what will students explore?',
      a: 'SAFARNAMA is an educational and recreational trip organized by THRYVE, designed to provide students with an opportunity to explore wildlife, nature, and cultural attractions while enjoying a refreshing break from academic life. The trip includes visits to Chhatbir Zoo (wildlife and conservation), Rock Garden (recycled sculptures and art), and Rose Garden (scenic flora and peace) in Chandigarh.'
    },
    {
      q: 'Who can participate in the Safarnama trip?',
      a: 'The trip is organized exclusively for students of Lovely Professional University (LPU), Punjab. Students across all years, branches, and programs are welcome to join.'
    },
    {
      q: 'What are the travel and transport arrangements?',
      a: 'Comfortable, sanitized air-conditioned (AC) luxury buses are arranged for the entire journey (To & Fro) directly from LPU Campus to Chandigarh and back, accompanied by THRYVE coordinators.'
    },
    {
      q: 'What is the tentative minute-to-minute schedule?',
      a: 'Reporting starts early at 4:00 AM at the campus gathering point, followed by departure at 5:00 AM. We explore Chhatbir Zoo from 8:30 AM to 11:30 AM, lunch from 12:00 PM to 1:00 PM, Rose Garden from 2:00 PM to 4:00 PM, evening activities, and a safe return back to LPU between 11:30 PM and 12:00 AM. Note: The schedule is tentative and may vary depending on traffic and local conditions.'
    },
    {
      q: 'What are the rules and regulations during the trip?',
      a: 'Participants must follow the trip schedule, maintain discipline, and cooperate with the organizers throughout the journey. Everyone must follow the safety guidelines, respect the environment, and avoid disturbing animals or damaging public property. Participants must remain with the group, follow instructions, and ensure responsible behavior at all locations. Any misconduct may result in appropriate action by the organizers.'
    },
    {
      q: 'What should I carry with me on the journey?',
      a: 'Ensure you carry your physical LPU Student ID card, comfortable walking shoes, a water bottle, mobile phone and power bank, some pocket money for personal food/snacks, and a light jacket/layer for AC bus travel.'
    },
    {
      q: 'How do I register or reserve a seat for Safarnama?',
      a: 'Registration and seat booking will open shortly on the THRYVE website. Because bus seats are strictly limited to ensure comfort and safety, registrations will operate on a first-come, first-served basis.'
    },
    {
      q: 'Where can I see photos from THRYVE’s Code Heist Hackathon?',
      a: 'Code Heist Hackathon was successfully conducted! We have created a dedicated Code Heist Hall of Fame & Photo Gallery right here on the website, featuring the official poster, mentor photos, partner gear, and upcoming media uploads from the 24-hour marathon.'
    }
  ]
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = THRYVE_DATA;
}
