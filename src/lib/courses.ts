/**
 * Course catalogue.
 *
 * NOTE: the live site shows no prices anywhere, so the `price` / `mrp` values
 * below are PLACEHOLDERS at realistic Indian market rates. Replace them with
 * your actual fees before going live — they feed the pricing page and the
 * Course structured data that Google reads.
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
  mrp: number;
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
    tagline: 'Basics to advanced, on live charts',
    summary:
      'From basics to advanced strategies including technical analysis, fundamental analysis, options trading and price action.',
    description:
      'The UTP Combo is our flagship track and the fastest route from complete beginner to a trader with a written, tested system. You start with market structure and order types, move through technical and fundamental analysis, then spend the back half of the program on options strategies, price action and risk management — applied on live NSE charts during market hours, not on slides.',
    level: 'Beginner to Advanced',
    duration: '4 months · 90+ hours',
    mode: 'Classroom + Live Online + Recorded',
    language: 'English & Hindi',
    price: 24999,
    mrp: 34999,
    featured: true,
    accent: 'mint',
    icon: 'candles',
    highlights: [
      'Live market sessions during NSE hours',
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
    slug: 'nism-certification',
    title: 'NISM Certification Program — Series V-A, V-B, VIII & XV',
    shortTitle: 'NISM Certification',
    tagline: 'Structured syllabus, mock tests, analytics',
    summary:
      'Prepare for NISM Series V-A, V-B, VIII & XV with a structured syllabus, mock tests, performance analytics and expert mentorship.',
    description:
      'A focused, exam-oriented track for the NISM certifications that the industry actually asks for. Each series is taught chapter by chapter against the official NISM workbook, reinforced with a chapter-wise question bank, and finished with full-length mock tests that replicate the real exam interface and timer. Per-topic analytics show you exactly which chapters to revise before you book your slot.',
    level: 'Beginner to Intermediate',
    duration: '6-10 weeks per series',
    mode: 'Classroom + Live Online + Recorded',
    language: 'English & Hindi',
    price: 11999,
    mrp: 15999,
    accent: 'cyan',
    icon: 'certificate',
    highlights: [
      'Covers Series V-A, V-B, VIII and XV',
      'Full-length mocks in a replica exam interface',
      'Chapter-wise question bank with explanations',
      'Per-topic analytics before you book the exam',
    ],
    modules: [
      {
        title: 'Series V-A — Mutual Fund Distributors',
        lessons: [
          'Concept and role of mutual funds in India',
          'Fund structure, SEBI regulations and offer documents',
          'NAV, loads, taxation and investor services',
          'Scheme selection and suitability for investors',
        ],
      },
      {
        title: 'Series V-B — Mutual Fund Foundation',
        lessons: [
          'Foundation-level fund concepts and terminology',
          'Legal structure and the role of each constituent',
          'Returns, risk measures and benchmarking',
          'Full-length mock papers with review',
        ],
      },
      {
        title: 'Series VIII — Equity Derivatives',
        lessons: [
          'Forwards, futures, options and their payoffs',
          'Trading, clearing, settlement and risk management',
          'Margining: SPAN, exposure and mark-to-market',
          'Regulatory framework and the code of conduct',
        ],
      },
      {
        title: 'Series XV — Research Analyst',
        lessons: [
          'Terminology, ecosystem and the role of a research analyst',
          'Economy, industry and company analysis',
          'Valuation principles and report writing',
          'Regulations, disclosures and ethical standards',
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
      'Walk into the NISM exam having already sat it a dozen times',
      'Know the syllabus chapter by chapter, not by guesswork',
      'Qualify for roles that list NISM certification as mandatory',
      'Understand the regulation behind the practice, not just the answers',
    ],
    audience: [
      'Mutual fund distributors and IFAs who need V-A',
      'Aspiring research analysts targeting Series XV',
      'Broking and AMC employees with a compliance deadline',
      'Finance students adding a recognised credential',
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
    duration: '8 weeks · 40+ hours',
    mode: 'Live Online + Recorded',
    language: 'English & Hindi',
    price: 14999,
    mrp: 19999,
    accent: 'violet',
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
      'Customised learning path, live trade reviews, behavioural coaching and faster skill development.',
    description:
      'Private mentorship built entirely around where you are now. We audit your current trades and journal, find the two or three habits actually costing you money, and rebuild your process around them. Sessions are scheduled to suit you, and between sessions you get direct access for trade reviews.',
    level: 'All levels',
    duration: '3 months · 12 private sessions',
    mode: 'One-on-one, online or in person',
    language: 'English & Hindi',
    price: 49999,
    mrp: 64999,
    accent: 'amber',
    icon: 'mentor',
    highlights: [
      'Fully customised curriculum after a skills audit',
      'Live trade and journal reviews every week',
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
        title: 'Live Trade Review',
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
