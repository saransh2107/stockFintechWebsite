/**
 * Single source of truth for every piece of site content.
 * Edit here and it updates across all pages + structured data.
 */

export const site = {
  name: 'Stock Fintech',
  legalName: 'Stock Fintech — Managed by M/s KOSOVO INDIA INC.',
  tagline: 'Learn. Grow. Shine.',
  url: 'https://mystockfintech.com',
  description:
    'Stock Fintech Lucknow teaches stock market trading, NISM certification (Series V-A, V-B, VIII, XV), Forex and Crypto — with live market analysis classes, NSE & NISM certified mentors, and one-on-one mentorship in English & Hindi.',
  shortDescription:
    'Stock market, NISM certification, Forex & Crypto training in Lucknow — taught by NSE & NISM certified mentors.',
  locale: 'en_IN',
  founded: '2019',
};

export const contact = {
  phones: [
    { label: '+91 96963 71476', href: 'tel:+919696371476' },
    { label: '+91 955 960 1555', href: 'tel:+919559601555' },
  ],
  email: 'contact@mystockfintech.com',
  whatsapp: {
    number: '919696371476',
    href: 'https://wa.me/919696371476',
  },
  address: {
    street: 'K-4, Power House Chauraha, Ashiyana',
    locality: 'Lucknow',
    region: 'Uttar Pradesh',
    postalCode: '226012',
    country: 'IN',
    full: 'K-4, Power House Chauraha, Ashiyana, Lucknow, Uttar Pradesh 226012',
  },
  hours: 'Visiting hours: Mon-Sat, 10:00 AM - 7:00 PM IST',
};

/* Social profiles - replace the `#` placeholders with the real handles. */
export const socials = [
  { name: 'YouTube', href: '#', icon: 'youtube' },
  { name: 'Instagram', href: '#', icon: 'instagram' },
  { name: 'Facebook', href: '#', icon: 'facebook' },
  { name: 'Twitter', href: '#', icon: 'twitter' },
  { name: 'LinkedIn', href: '#', icon: 'linkedin' },
];

export type NavItem = {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
};

export const nav: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Courses',
    href: '/courses/',
    children: [
      { label: 'Indian Stock Market', href: '/courses/ultimate-traders-program/' },
      { label: 'NISM Series VIII', href: '/courses/nism-series-8/' },
      { label: 'NISM Series XV', href: '/courses/nism-series-15/' },
      { label: 'Forex & Crypto', href: '/courses/forex-and-crypto/' },
      { label: 'One-on-One Mentorship', href: '/courses/one-on-one-mentorship/' },
      { label: 'Stock Market Course', href: '/stock-market-course/' },
      { label: 'Trading Course', href: '/trading-course/' },
      { label: 'Classes in Lucknow', href: '/stock-market-course-in-lucknow/' },
    ],
  },
  { label: 'Mentors', href: '/mentors/' },
  { label: 'Pricing', href: '/pricing/' },
  { label: 'News', href: '/news/' },
  {
    label: 'More',
    href: '/about/',
    children: [
      { label: 'About Us', href: '/about/' },
      { label: 'Learning Model', href: '/about/#learning-model' },
      { label: 'Career Outcomes', href: '/careers/' },
      { label: 'Student Experience', href: '/about/#student-experience' },
      { label: 'FAQs', href: '/about/#faq' },
    ],
  },
  { label: 'Contact', href: '/contact/' },
];

export const stats = [
  { value: 10000, suffix: '+', label: 'Students trained', decimals: 0 },
  { value: 4.85, suffix: '/5', label: 'Average rating', decimals: 2 },
  { value: 92, suffix: '%', label: 'NISM pass rate', decimals: 0 },
  { value: 6, suffix: '', label: 'Years of mentoring', decimals: 0 },
];

export const partners = [
  'Angel One',
  'Upstox',
  'Zerodha',
  'Groww',
  'Bajaj Finserv',
  'NSE Academy',
  'NISM',
  'TradingView',
];

export const whyUs = [
  {
    title: 'Practical, Market-Driven Learning',
    body: 'Not just theory — every concept is applied on live charts during real market hours.',
    icon: 'chart',
  },
  {
    title: 'Certified & Experienced Mentors',
    body: 'Learn from NSE & NISM certified professionals who actively trade their own capital.',
    icon: 'badge',
  },
  {
    title: 'Hybrid Learning Model',
    body: 'Classroom in Lucknow, live online batches, and lifetime access to recorded sessions.',
    icon: 'layers',
  },
  {
    title: 'Exam-Before-Exam Practice',
    body: 'Full-length NISM mock tests that replicate the real exam interface and timer.',
    icon: 'clipboard',
  },
  {
    title: 'Performance Analytics',
    body: 'Track strengths, weak chapters and improvement over time with per-topic scoring.',
    icon: 'pulse',
  },
  {
    title: 'Career-Oriented Approach',
    body: 'Skills that matter on a real desk — research, valuation, risk and execution.',
    icon: 'target',
  },
];

export const learningModel = [
  'Interactive & Tech-Enabled Classrooms',
  'Live Market Analysis Classes',
  'Speed Test & Smart Labs',
  '24/7 Doubt Resolution Support',
  'Study Materials, Question Banks & E-Books',
  'Weekly Market Outlook & Analysis',
];

export const studentExperience = [
  'Trading Psychology Sessions',
  'Strategy Building & Back-Testing Labs',
  'Regular Mock Tests for NISM Exams',
  'Personal Portfolio Review',
  'Live Events & Workshops',
  'Community Trading & Discussion Groups',
];

export const careerRoles = [
  {
    title: 'Equity Research Analyst',
    body: 'Build sector coverage, model earnings and publish buy/sell theses.',
  },
  {
    title: 'Investment Research Associate',
    body: 'Support senior analysts with screening, data work and thematic research.',
  },
  {
    title: 'Buy-Side / Sell-Side Analyst',
    body: 'Work inside an AMC, PMS or broking desk covering listed companies.',
  },
  {
    title: 'Valuation Analyst',
    body: 'DCF, comparables and precedent-transaction valuation for deals and reporting.',
  },
  {
    title: 'Portfolio Analyst',
    body: 'Monitor allocation, risk exposure and performance attribution.',
  },
  {
    title: 'Financial Data Analyst',
    body: 'Turn market and fundamental data into dashboards and decision inputs.',
  },
  {
    title: 'Independent Trader / Investor',
    body: 'Trade your own capital with a written, back-tested and risk-managed system.',
  },
];

export type Mentor = {
  name: string;
  slug: string;
  role: string;
  credentials: string;
  /** One-paragraph summary used on the mentors grid and in cards. */
  bio: string;
  /** Long-form paragraphs rendered on the individual profile page. */
  profile: string[];
  specialities: string[];
  /** What this mentor actually takes, by course title. */
  teaches: string[];
  initials: string;
};

export const mentors: Mentor[] = [
  {
    name: 'Govindam Pal',
    slug: 'govindam-pal',
    role: 'Founder & Lead Mentor',
    credentials: 'NISM Certified · 8+ years in markets',
    bio: 'Govindam leads the Ultimate Traders Program and the NISM certification track. His teaching focuses on price action, risk-first position sizing and the trading psychology that keeps a system alive through drawdowns.',
    profile: [
      'Govindam Pal founded Stock Fintech to teach the market the way he had to learn it — slowly, from the chart outwards, and with the risk question answered before the entry question. He leads the Ultimate Traders Program and takes the NISM certification track himself.',
      'His sessions are built around price action rather than indicators. Students spend most of their time reading structure, marking levels and sizing positions against a defined loss, on the view that a trader who cannot survive a drawdown never gets to find out whether their edge was real.',
      'He also runs the trade-journal reviews, where learners submit their own entries and exits and have them picked apart — separating the losses that came from a broken process from the ones that were simply the cost of doing business.',
    ],
    specialities: ['Price Action', 'Options Strategies', 'Risk Management', 'NISM Series VIII'],
    teaches: ['Ultimate Traders Program', 'NISM Series VIII', 'One-on-One Mentorship'],
    initials: 'GP',
  },
  {
    // ────────────────────────────────────────────────────────────────────
    // PLACEHOLDER PROFILE — NOT YET VERIFIED.
    // mystockfintech.com carries no biography, designation, experience or
    // certification for Anwar; /instructor/anwar/ is an empty template.
    // Everything below except the name is written copy, not sourced fact.
    // Replace it with details confirmed by Stock Fintech before launch, and
    // do not publish any credential claim that has not been checked.
    // ────────────────────────────────────────────────────────────────────
    name: 'Anwar',
    slug: 'anwar',
    role: 'Mentor',
    credentials: 'Details to be confirmed',
    bio: 'Anwar teaches on the Stock Fintech programs alongside the founding desk. His full profile is being finalised.',
    profile: [
      'Anwar teaches on the Stock Fintech programs alongside the founding desk.',
      'A full profile — covering his background, years in the market, certifications and the subjects he takes — is being finalised and will be published here shortly.',
    ],
    specialities: [],
    teaches: [],
    initials: 'A',
  },
  {
    name: 'Research & Analytics Desk',
    slug: 'research-desk',
    role: 'Weekly Market Outlook Team',
    credentials: 'NSE & NISM certified analysts',
    bio: 'The in-house desk publishes the weekly market outlook, maintains the question banks and runs the back-testing labs that students use to validate their own strategies.',
    profile: [
      'The Research & Analytics Desk is the team behind everything students read between classes. It publishes the weekly market outlook, maintains the chapter-wise question banks used across the certification tracks, and runs the back-testing labs.',
      'The desk does not issue calls. Its output is written to show the reasoning — why a sector is being watched, what the breadth is doing underneath an index level, which assumption in a model would have to break for the thesis to fail.',
      'Learners on the research track work directly with the desk, writing their own notes to the same format and having them reviewed before they go into the portfolio they take to interviews.',
    ],
    specialities: ['Technical Analysis', 'Fundamental Research', 'Back-Testing', 'Market Breadth'],
    teaches: ['NISM Series XV', 'Ultimate Traders Program'],
    initials: 'RD',
  },
];

export const testimonials = [
  {
    name: 'Rahul Verma',
    role: 'Business Owner',
    quote:
      'Stock Fintech Lucknow has completely changed my understanding of the stock market. The practical training and live market analysis classes helped me gain real confidence in trading.',
  },
  {
    name: 'Priya Sharma',
    role: 'MBA Student',
    quote:
      'The faculty explains concepts in a very simple and practical way. I enrolled in the NISM course and cleared my exam on the first attempt. Highly recommended!',
  },
  {
    name: 'Neha Gupta',
    role: 'Homemaker & Investor',
    quote:
      'I always wanted to learn stock trading but did not know where to start. Stock Fintech provided step-by-step guidance and personal support.',
  },
  {
    name: 'Abhishek Mishra',
    role: 'Engineering Student',
    quote:
      'The live market analysis classes and practical exposure make this institute different from others. They focus on real market experience.',
  },
  {
    name: 'Pooja Srivastava',
    role: 'Banker',
    quote:
      'The NISM certification training was very structured and exam-oriented. The trainers are knowledgeable and supportive.',
  },
  {
    name: 'Rohit Tiwari',
    role: 'Entrepreneur',
    quote:
      'Best stock market institute in Lucknow. The risk management and technical analysis training are very practical.',
  },
  {
    name: 'Swati Yadav',
    role: 'B.Com Student',
    quote: 'I gained both knowledge and confidence. The environment is professional and motivating.',
  },
  {
    name: 'Ankit Tripathi',
    role: 'Sales Manager',
    quote:
      'The mentorship and doubt-clearing sessions are very helpful. They do not just teach theory; they focus on practical learning.',
  },
  {
    name: 'Shalini Saxena',
    role: 'Finance Aspirant',
    quote:
      'Stock Fintech helped me understand market psychology and trading strategies clearly. Great place to start a career in finance.',
  },
];

export const faqs = [
  {
    q: 'Do I need any prior knowledge of the stock market to join?',
    a: 'No. Every program starts from absolute basics — what a share is, how an exchange works, how to place an order — before moving to analysis and strategy. Around half of our students join with zero market background.',
  },
  {
    q: 'Are classes taught in Hindi or English?',
    a: 'Both. Sessions are delivered bilingually in English and Hindi so that terminology stays precise while explanations remain easy to follow. Recorded sessions and study material are provided in English.',
  },
  {
    q: 'Which NISM certifications do you prepare students for?',
    a: 'NISM Series V-A (Mutual Fund Distributors), Series V-B (Mutual Fund Foundation), Series VIII (Equity Derivatives) and Series XV (Research Analyst). Each track includes the full syllabus, chapter-wise question banks and full-length mock tests in a replica exam interface.',
  },
  {
    q: 'Is this classroom-only, or can I learn online?',
    a: 'Both. We run a hybrid model — attend in person at our Ashiyana, Lucknow centre, join the same batch live online, or catch up with the recording. Your enrolment covers all three.',
  },
  {
    q: 'Will I get to trade during the course?',
    a: 'Yes. Live market analysis classes run during NSE hours where mentors mark up real charts in real time. You also get back-testing labs and a simulated environment before risking your own capital.',
  },
  {
    q: 'Do you guarantee profits or give buy/sell tips?',
    a: 'No. Stock Fintech is an education provider, not a SEBI-registered investment adviser or research analyst. We teach you how to analyse and decide for yourself. We never sell tips, calls or assured-return schemes.',
  },
  {
    q: 'Do I get a certificate after completing a course?',
    a: 'Yes, you receive a Stock Fintech course completion certificate. The NISM certification itself is awarded by NISM after you clear their official exam, which we prepare you for.',
  },
  {
    q: 'What support do I get after the course ends?',
    a: 'Lifetime access to your recorded sessions and updated study material, the alumni community group, the weekly market outlook, and doubt-resolution support.',
  },
];
