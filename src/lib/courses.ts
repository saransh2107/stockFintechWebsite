/**
 * Course catalogue.
 *
 * Fees are the real list prices supplied by Stock Fintech. There is no
 * struck-through "MRP" — inventing a higher original price to imply a
 * discount is misleading and, under Indian consumer law, risky. If a genuine
 * promotional price is ever run, set `mrp` on that course and the discount
 * badge appears automatically.
 */

export type Course = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  description: string;
  level: string;
  duration: string;
  mode: string;
  language: string;
  price: number;
  /** Optional. Only set during a genuine promotion. */
  mrp?: number;
  featured?: boolean;
  accent: 'mint' | 'cyan' | 'violet' | 'amber';
  icon: 'candles' | 'certificate' | 'globe' | 'mentor';
  highlights: string[];
  modules: { title: string; lessons: string[] }[];
  outcomes: string[];
  audience: string[];
};

export const courses: Course[] = [
  {
    slug: 'ultimate-traders-program',
    title: 'Ultimate Traders Program (UTP) — Complete Stock Market Certification',
    shortTitle: 'Indian Stock Market',
    tagline: 'Basics to advanced, on real charts',
    summary:
      'From basics to advanced strategies including technical analysis, fundamental analysis, options trading and price action.',
    description:
      'The UTP Combo is our flagship track and the fastest route from complete beginner to a trader with a written, tested system. You start with market structure and order types, move through technical and fundamental analysis, then spend the back half of the program on options strategies, price action and risk management — applied to real NSE charts during market hours, not to slides.',
    level: 'Beginner to Advanced',
    duration: '2.5 months',
    mode: 'Classroom + Live Online + Recorded',
    language: 'English & Hindi',
    price: 40000,
    featured: true,
    accent: 'mint',
    icon: 'candles',
    highlights: [
      'Live market analysis classes during NSE hours',
      'Options strategy lab with payoff builder',
      'Personal portfolio review with a mentor',
      'Lifetime access to recordings & updates',
    ],
    modules: [
      {
        title: 'Market Foundations',
        lessons: [
          'How exchanges, brokers and depositories actually work',
          'Order types, margins, settlement and charges',
          'Reading the index: Nifty, Bank Nifty and sector rotation',
          'Opening and configuring your trading terminal',
        ],
      },
      {
        title: 'Technical Analysis',
        lessons: [
          'Candlestick anatomy and high-probability patterns',
          'Support, resistance, trendlines and market structure',
          'Moving averages, RSI, MACD and volume profile',
          'Multi-timeframe analysis and confluence',
        ],
      },
      {
        title: 'Fundamental Analysis',
        lessons: [
          'Reading a balance sheet, P&L and cash flow statement',
          'Ratio analysis and peer comparison',
          'Valuation: P/E, EV/EBITDA and a simple DCF',
          'Building a watchlist from a screener',
        ],
      },
      {
        title: 'Price Action & Strategy',
        lessons: [
          'Supply and demand zones, breakouts and retests',
          'Intraday, swing and positional playbooks',
          'Writing your strategy down and back-testing it',
          'Journaling, review and iteration',
        ],
      },
      {
        title: 'Options & Derivatives',
        lessons: [
          'Calls, puts, premium and the Greeks in plain language',
          'Spreads, straddles, strangles and iron condors',
          'Expiry-day behaviour and open interest analysis',
          'Hedging an equity portfolio with options',
        ],
      },
      {
        title: 'Risk & Psychology',
        lessons: [
          'Position sizing and the 1% rule',
          'Drawdown maths and why recovery is asymmetric',
          'Handling tilt, revenge trading and FOMO',
          'Building a routine that survives a bad month',
        ],
      },
    ],
    outcomes: [
      'Analyse any listed stock technically and fundamentally',
      'Build, back-test and journal your own trading system',
      'Trade options with defined risk and a clear thesis',
      'Size positions so a losing streak cannot wipe you out',
    ],
    audience: [
      'Complete beginners who want a structured start',
      'Self-taught traders who keep giving back their profits',
      'Working professionals building a second income skill',
      'Students targeting a career on a research or trading desk',
    ],
  },
  {
    slug: 'nism-series-8',
    title: 'NISM Series VIII — Equity Derivatives Certification',
    shortTitle: 'NISM Series VIII',
    tagline: 'Equity derivatives, exam-ready',
    summary:
      'Structured preparation for the NISM Series VIII Equity Derivatives exam, with chapter-wise question banks and full-length mocks.',
    description:
      'NISM Series VIII is the certification required for anyone working on an equity derivatives desk, and it is the one most broking employers ask for. We teach it chapter by chapter against the official NISM workbook, reinforce each chapter with a question bank, and finish with full-length mock tests that replicate the real exam interface and timer. Per-topic analytics show you exactly which chapters to revise before you book your slot.',
    level: 'Beginner to Intermediate',
    duration: '6 weeks',
    mode: 'Classroom + Live Online + Recorded',
    language: 'English & Hindi',
    price: 50000,
    accent: 'cyan',
    icon: 'certificate',
    highlights: [
      'Full official Series VIII syllabus, chapter by chapter',
      'Full-length mocks in a replica exam interface',
      'Chapter-wise question bank with explanations',
      'Per-topic analytics before you book the exam',
    ],
    modules: [
      {
        title: 'Derivatives Foundations',
        lessons: [
          'Forwards, futures and options, and what each is for',
          'Payoff diagrams and how to read them quickly',
          'Participants: hedgers, speculators and arbitrageurs',
          'The Indian derivatives market and its instruments',
        ],
      },
      {
        title: 'Trading Mechanics',
        lessons: [
          'Contract specifications, lot sizes and expiry cycles',
          'Order types and the trading system',
          'Price discovery, basis and cost of carry',
          'Strategies: spreads, straddles, strangles and covered calls',
        ],
      },
      {
        title: 'Clearing, Settlement & Risk',
        lessons: [
          'The clearing corporation and its guarantee',
          'Margining: SPAN, exposure and mark-to-market',
          'Settlement of futures and options',
          'Risk management at the member and client level',
        ],
      },
      {
        title: 'Regulation & Compliance',
        lessons: [
          'SEBI regulatory framework for derivatives',
          'Eligibility criteria and position limits',
          'Code of conduct and investor grievance redressal',
          'Accounting and taxation basics for derivatives',
        ],
      },
      {
        title: 'Exam Readiness Lab',
        lessons: [
          'Timed full-length mocks in the replica interface',
          'Negative-marking strategy and question triage',
          'Per-chapter weakness report and revision plan',
          'Booking, exam-day logistics and what to expect',
        ],
      },
    ],
    outcomes: [
      'Walk into the Series VIII exam having already sat it a dozen times',
      'Explain any derivative payoff without reaching for a formula',
      'Understand margining well enough to manage a real position',
      'Qualify for derivatives desk roles that list Series VIII as mandatory',
    ],
    audience: [
      'Broking and dealing staff with a compliance deadline',
      'Aspiring derivatives dealers and desk traders',
      'Options traders who want the regulation behind the practice',
      'Finance students adding a recognised credential',
    ],
  },
  {
    slug: 'nism-series-15',
    title: 'NISM Series XV — Research Analyst Certification',
    shortTitle: 'NISM Series XV',
    tagline: 'The research analyst credential',
    summary:
      'Complete preparation for NISM Series XV, the certification SEBI requires of research analysts — valuation, modelling and report writing included.',
    description:
      'Series XV is the hardest and most valuable of the NISM certifications, and it is a SEBI requirement for anyone working as a research analyst. This is our most comprehensive track: alongside the full official syllabus we teach the practical craft the exam assumes — economy and industry analysis, financial modelling, valuation, and writing a research note someone would actually act on. You finish with a certification and a portfolio of your own written research.',
    level: 'Intermediate to Advanced',
    duration: '10 weeks',
    mode: 'Classroom + Live Online + Recorded',
    language: 'English & Hindi',
    price: 125000,
    accent: 'violet',
    icon: 'certificate',
    highlights: [
      'Full official Series XV syllabus plus practical modelling',
      'Build and defend your own valuation models',
      'Write research notes reviewed by a mentor',
      'Full-length mocks in a replica exam interface',
    ],
    modules: [
      {
        title: 'The Research Ecosystem',
        lessons: [
          'What a research analyst does, and for whom',
          'Buy side versus sell side, and how reports are consumed',
          'Terminology, data sources and research infrastructure',
          'Qualities and ethics of a credible analyst',
        ],
      },
      {
        title: 'Economy & Industry Analysis',
        lessons: [
          'Macroeconomic indicators that actually move markets',
          'Business cycles and sector sensitivity',
          'Porter, SWOT and structural industry analysis',
          'Regulatory and policy risk in Indian sectors',
        ],
      },
      {
        title: 'Company & Financial Analysis',
        lessons: [
          'Reading annual reports past the headline numbers',
          'Quality of earnings and accounting red flags',
          'Ratio analysis, DuPont and peer benchmarking',
          'Building a three-statement financial model',
        ],
      },
      {
        title: 'Valuation',
        lessons: [
          'Discounted cash flow from first principles',
          'Relative valuation: P/E, EV/EBITDA, P/B and when each fails',
          'Sum-of-the-parts and sector-specific methods',
          'Sensitivity analysis and defending your assumptions',
        ],
      },
      {
        title: 'Report Writing & Recommendation',
        lessons: [
          'Structuring a research note: thesis, evidence, risks',
          'Target price derivation and rating frameworks',
          'Writing for a reader who will disagree with you',
          'Peer review of your own published notes',
        ],
      },
      {
        title: 'Regulation & Exam Readiness',
        lessons: [
          'SEBI (Research Analysts) Regulations and disclosures',
          'Conflicts of interest and the code of conduct',
          'Timed full-length mocks in the replica interface',
          'Per-chapter weakness report and revision plan',
        ],
      },
    ],
    outcomes: [
      'Clear NISM Series XV and meet the SEBI research analyst requirement',
      'Build a three-statement model and a defensible DCF from scratch',
      'Write a research note that stands up to cross-examination',
      'Walk into interviews with published work, not just a certificate',
    ],
    audience: [
      'Aspiring equity research analysts and associates',
      'Finance graduates targeting AMC, PMS or broking research roles',
      'Working professionals moving into research from other functions',
      'Anyone required by SEBI to hold the Research Analyst certification',
    ],
  },
  {
    slug: 'forex-and-crypto',
    title: 'Forex & Crypto Trading — Institutional Concepts',
    shortTitle: 'Forex & Crypto',
    tagline: 'Smart money concepts, disciplined risk',
    summary:
      'Learn institutional-level trading concepts, smart money strategies and disciplined risk management.',
    description:
      'A 24-hour market behaves nothing like a 6-hour one. This track covers currency pairs and digital assets on their own terms: session behaviour, liquidity, funding and the institutional order-flow concepts that explain why price returns to the levels it does. Heavy emphasis on risk, because leverage in these markets is unforgiving.',
    level: 'Intermediate',
    duration: '8 weeks',
    mode: 'Live Online + Recorded',
    language: 'English & Hindi',
    price: 30000,
    accent: 'amber',
    icon: 'globe',
    highlights: [
      'Smart money and liquidity concepts',
      'Session-based strategies for a 24-hour market',
      'On-chain and funding-rate basics for crypto',
      'Leverage, margin and blow-up prevention',
    ],
    modules: [
      {
        title: 'Forex Foundations',
        lessons: [
          'Majors, minors, exotics and how a pair is quoted',
          'Pips, lots, spreads, swaps and broker mechanics',
          'London, New York and Asian session behaviour',
          'The legal picture for Indian residents',
        ],
      },
      {
        title: 'Smart Money Concepts',
        lessons: [
          'Liquidity pools, sweeps and stop hunts',
          'Order blocks, fair value gaps and imbalance',
          'Market structure shifts and change of character',
          'Building an entry model with confluence',
        ],
      },
      {
        title: 'Crypto Markets',
        lessons: [
          'Spot, perpetuals, funding rates and basis',
          'Exchange mechanics, custody and wallet safety',
          'On-chain signals and market-cycle context',
          'Narrative rotation and risk of illiquid alts',
        ],
      },
      {
        title: 'Risk at Leverage',
        lessons: [
          'Position sizing when leverage is 20x',
          'Liquidation maths and how to never see one',
          'Correlation risk across pairs and assets',
          'Written rules, kill switches and daily loss limits',
        ],
      },
    ],
    outcomes: [
      'Read a 24-hour market by session and liquidity',
      'Apply institutional order-flow concepts to entries',
      'Trade leveraged instruments without blowing an account',
      'Tell a tradable setup apart from social-media noise',
    ],
    audience: [
      'Equity traders diversifying into FX and digital assets',
      'Crypto holders who want a system instead of conviction',
      'Night-shift professionals who cannot trade Indian hours',
      'Anyone burned by leverage who wants the risk side fixed',
    ],
  },
  {
    slug: 'one-on-one-mentorship',
    title: 'One-on-One Personal Mentorship',
    shortTitle: 'Personal Mentorship',
    tagline: 'Your charts, your trades, your plan',
    summary:
      'Customised learning path, private trade reviews, behavioural coaching and faster skill development.',
    description:
      'Private mentorship built entirely around where you are now. We audit your current trades and journal, find the two or three habits actually costing you money, and rebuild your process around them. Sessions are scheduled to suit you, and between sessions you get direct access for trade reviews.',
    level: 'All levels',
    duration: '3 months · 12 private sessions',
    mode: 'One-on-one, online or in person',
    language: 'English & Hindi',
    price: 175000,
    accent: 'violet',
    icon: 'mentor',
    highlights: [
      'Fully customised curriculum after a skills audit',
      'Private review of your trades and journal every week',
      'Behavioural coaching on tilt and discipline',
      'Direct mentor access between sessions',
    ],
    modules: [
      {
        title: 'Diagnostic & Plan',
        lessons: [
          'Audit of your last 50 trades and your journal',
          'Identifying the two habits costing you the most',
          'Goal setting against capital, time and risk appetite',
          'A written 12-week curriculum built for you',
        ],
      },
      {
        title: 'System Build',
        lessons: [
          'Choosing a strategy that fits your schedule',
          'Writing entry, exit and invalidation rules down',
          'Back-testing the system over multiple regimes',
          'Forward-testing on paper before going live',
        ],
      },
      {
        title: 'Trade Review',
        lessons: [
          'Weekly screen-share review of your actual trades',
          'Separating process errors from bad outcomes',
          'Refining position sizing to your real risk tolerance',
          'Scaling up only when the metrics justify it',
        ],
      },
      {
        title: 'Psychology & Routine',
        lessons: [
          'Pre-market routine and preparation checklist',
          'Managing tilt, revenge trades and overtrading',
          'Handling drawdowns without abandoning the system',
          'Long-term review cadence after mentorship ends',
        ],
      },
    ],
    outcomes: [
      'A trading system written down and tested, not improvised',
      'The specific leaks in your process identified and closed',
      'Measurable improvement tracked trade by trade',
      'A routine you can run on your own after 12 weeks',
    ],
    audience: [
      'Traders who know the theory but cannot stay consistent',
      'Anyone who has finished a course and needs accountability',
      'Full-time traders wanting an outside eye on their process',
      'Learners who prefer private sessions to a classroom',
    ],
  },
];

export const courseBySlug = (slug: string) => courses.find((c) => c.slug === slug);
