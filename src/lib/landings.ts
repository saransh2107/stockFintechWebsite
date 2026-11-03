/**
 * SEO landing pages.
 *
 * Three pages, three different jobs:
 *
 *  1. /stock-market-course-in-lucknow/  — the local money page. Lowest
 *     competition, highest conversion, realistically rankable.
 *  2. /stock-market-course/             — national head term. Long game.
 *  3. /trading-course/                  — national head term. Long game.
 *
 * Each has genuinely distinct content. They are NOT templated variations of
 * each other — Google treats near-duplicate location/keyword pages as doorway
 * pages and will suppress them.
 */

export type Section =
  | { type: 'prose'; h2: string; paras: string[] }
  | { type: 'cards'; h2: string; intro?: string; items: { title: string; body: string }[] }
  | { type: 'checks'; h2: string; intro?: string; items: string[] }
  | { type: 'steps'; h2: string; intro?: string; items: { title: string; body: string }[] }
  | { type: 'table'; h2: string; intro?: string; head: string[]; rows: string[][] }
  | { type: 'callout'; tone: 'amber' | 'brand'; title: string; body: string };

export type Landing = {
  slug: string;
  eyebrow: string;
  metaTitle: string;
  metaDescription: string;
  keywords: string[];
  h1: string;
  intro: string;
  local?: boolean;
  sections: Section[];
  faqs: { q: string; a: string }[];
  related: { label: string; href: string }[];
};

/* ========================================================================= */
/*  1. LOCAL — stock market course in Lucknow                                */
/* ========================================================================= */

const lucknow: Landing = {
  slug: 'stock-market-course-in-lucknow',
  eyebrow: 'Lucknow',
  metaTitle: 'Stock Market Course in Lucknow — Share Market Classes & Training',
  metaDescription:
    'Join a stock market course in Lucknow at Stock Fintech, Ashiyana. Classroom and live online share market classes, NISM certification coaching, live market sessions and one-on-one mentorship in English & Hindi. Book a free demo class.',
  keywords: [
    'stock market course in Lucknow',
    'share market classes Lucknow',
    'stock market institute Lucknow',
    'trading institute Lucknow',
    'NISM coaching Lucknow',
    'share market training Lucknow',
    'stock market classes near me',
    'technical analysis course Lucknow',
  ],
  h1: 'Stock market course in Lucknow',
  intro:
    'Stock Fintech runs classroom and live online share market training from our centre at Power House Chauraha, Ashiyana. Every batch is taught bilingually in English and Hindi by NSE and NISM certified mentors who trade their own capital — and every concept is applied on live NSE charts during market hours, not just explained on slides.',
  local: true,
  sections: [
    {
      type: 'prose',
      h2: 'Why learn the stock market in a classroom',
      paras: [
        'You can watch a thousand hours of free videos and still freeze the first time real money is on the screen. What a classroom gives you that a playlist cannot is correction — a mentor watching you mark up a chart, catching the mistake in your logic before it becomes a habit, and answering the question you did not know how to ask.',
        'It also gives you a cohort. Most people who quit trading quit alone, after a drawdown they had no one to talk through. Our Lucknow batches run 12 to 20 students, and the alumni group stays active long after the course ends.',
        'If you cannot reach Ashiyana on a given day, the same session streams live and is recorded. Your enrolment covers the classroom seat, the live stream and lifetime access to the recordings — you are not choosing between formats.',
      ],
    },
    {
      type: 'cards',
      h2: 'Courses available at our Lucknow centre',
      intro:
        'Four tracks, taught from the same teaching philosophy: understand the mechanism, apply it on a live chart, measure the result, then manage the risk before you scale.',
      items: [
        {
          title: 'Ultimate Traders Program (UTP)',
          body: 'Our flagship 4-month track. Market structure and order types, technical and fundamental analysis, options strategies, price action, risk management and trading psychology. Beginners start here.',
        },
        {
          title: 'NISM certification coaching',
          body: 'Exam-focused preparation for NISM Series V-A, V-B, VIII and XV, taught chapter by chapter against the official workbook with full-length mocks in a replica exam interface.',
        },
        {
          title: 'Forex & Crypto trading',
          body: 'Session behaviour, liquidity and smart-money concepts for 24-hour markets, with heavy emphasis on leverage risk. Runs live online in the evening for working professionals.',
        },
        {
          title: 'One-on-one mentorship',
          body: 'Private sessions built around an audit of your own trades and journal. Available in person at the Lucknow centre or online, scheduled around you.',
        },
      ],
    },
    {
      type: 'table',
      h2: 'Batch timings at the Ashiyana centre',
      intro:
        'Weekday and weekend batches run in parallel so students and working professionals can both attend. Exact start dates vary — call us for the next intake.',
      head: ['Batch', 'Days', 'Timing', 'Suits'],
      rows: [
        ['Morning', 'Mon – Fri', '10:00 AM – 12:00 PM', 'Students, full-time traders'],
        ['Live market', 'Mon – Fri', '12:30 PM – 2:30 PM', 'Trading during NSE hours'],
        ['Evening', 'Mon – Fri', '6:00 PM – 8:00 PM', 'Working professionals'],
        ['Weekend', 'Sat – Sun', '11:00 AM – 2:00 PM', 'Those who cannot attend weekdays'],
      ],
    },
    {
      type: 'checks',
      h2: 'What your fee covers',
      intro: 'One fee, no locked modules and no separate charge for the recordings.',
      items: [
        'Classroom seat at the Ashiyana centre plus the live online stream',
        'Lifetime access to every recorded session, including future updates',
        'Printed and digital study material with chapter-wise question banks',
        'Full-length NISM mock tests in a replica exam interface',
        'Weekly market outlook from our in-house research desk',
        'Personal portfolio review with a mentor',
        'Alumni community and doubt-resolution support after the course ends',
      ],
    },
    {
      type: 'prose',
      h2: 'Getting to the centre',
      paras: [
        'We are at K-4, Power House Chauraha, Ashiyana, Lucknow — a short auto ride from Alambagh and well connected to Kanpur Road and Arjunganj. Parking is available on site.',
        'Students travel to us from across the city: Ashiyana, Alambagh, Rajajipuram, Telibagh, Vrindavan Yojna, Sushant Golf City, Gomti Nagar, Indira Nagar, Hazratganj, Aliganj, Jankipuram, Mahanagar, Chinhat and Charbagh. We also take weekend students from Kanpur, Barabanki, Unnao, Sitapur and Rae Bareli.',
        'Walk in during market hours and sit at the back of a live session before you decide anything. No appointment needed, though a call ahead means we can tell you which batch is running.',
      ],
    },
    {
      type: 'steps',
      h2: 'How to enrol',
      items: [
        {
          title: 'Book a free demo',
          body: 'Call +91 895 395 2666 or send the enquiry form. Tell us your experience level and when you can attend.',
        },
        {
          title: 'Sit in on a live class',
          body: 'Attend a real session — not a sales presentation — and meet the mentor who would teach your batch.',
        },
        {
          title: 'Pick your track and batch',
          body: 'We will recommend the track that fits where you actually are, even if it is the cheaper one.',
        },
        {
          title: 'Start, with a safety net',
          body: 'If after the first two sessions it is not for you, tell us within 7 days of the batch start and we refund the fee.',
        },
      ],
    },
    {
      type: 'callout',
      tone: 'amber',
      title: 'We teach, we do not tip',
      body: 'Stock Fintech is an educational institute. We are not a SEBI-registered Investment Adviser or Research Analyst. We do not sell buy/sell calls, tips or assured-return schemes, and we will never promise you a profit figure. Anyone in Lucknow promising guaranteed returns from a trading course is selling you something else.',
    },
  ],
  faqs: [
    {
      q: 'Which is the best stock market institute in Lucknow?',
      a: 'Judge it by what you can verify rather than by advertising. Ask whether mentors are NISM certified and actively trading, whether you can sit in on a live class before paying, whether sessions run during market hours on real charts, and whether there is a written refund policy. We invite prospective students to do exactly that at our Ashiyana centre — attend a free demo and decide after.',
    },
    {
      q: 'What is the fee for a stock market course in Lucknow?',
      a: 'Our programs run from ₹11,999 for the NISM certification track to ₹24,999 for the 4-month Ultimate Traders Program, with one-on-one mentorship at ₹49,999. Instalments over three months are available interest-free. Full pricing is on our pricing page, and there are no hidden charges beyond the official NISM exam fee you pay NISM directly.',
    },
    {
      q: 'How long does the course take?',
      a: 'The Ultimate Traders Program runs four months at roughly 90 hours of instruction. NISM certification tracks take six to ten weeks per series. Forex and Crypto runs eight weeks. Mentorship is twelve private sessions across three months.',
    },
    {
      q: 'Do you teach in Hindi?',
      a: 'Yes. Every session is delivered bilingually — terminology stays in English so it matches what you will see on a terminal and in the NISM exam, while the explanation is given in Hindi wherever that makes it clearer. Study material is in English.',
    },
    {
      q: 'Can I attend if I live outside Lucknow?',
      a: 'Yes. Every classroom session streams live and is recorded, and your enrolment covers all three formats. Students from Kanpur, Barabanki, Unnao and further afield typically attend online during the week and come to the centre for weekend workshops.',
    },
    {
      q: 'Do I need a demat account before joining?',
      a: 'No. We cover how to choose a broker, open an account and configure your terminal in the first module. If you already have one, bring it — we will set up your charting workspace in class.',
    },
    {
      q: 'Is there a weekend batch for working professionals?',
      a: 'Yes, Saturday and Sunday 11:00 AM to 2:00 PM, plus a weekday evening batch from 6:00 PM. Both cover the identical syllabus to the morning batch.',
    },
  ],
  related: [
    { label: 'Ultimate Traders Program', href: '/courses/ultimate-traders-program/' },
    { label: 'NISM certification coaching', href: '/courses/nism-certification/' },
    { label: 'Fees and plans', href: '/pricing/' },
    { label: 'Visit the centre', href: '/contact/' },
  ],
};

/* ========================================================================= */
/*  2. NATIONAL — stock market course                                        */
/* ========================================================================= */

const stockMarketCourse: Landing = {
  slug: 'stock-market-course',
  eyebrow: 'Stock market course',
  metaTitle: 'Stock Market Course — Learn Share Market Trading from Scratch',
  metaDescription:
    'A complete stock market course covering technical analysis, fundamental analysis, options and risk management. Live market sessions, NISM certification prep, English & Hindi. Learn what a good share market course should actually teach you.',
  keywords: [
    'stock market course',
    'stock course',
    'stock learning',
    'share market course',
    'stock market course for beginners',
    'learn stock market',
    'stock market classes online',
    'technical analysis course',
    'share market course in Hindi',
  ],
  h1: 'Stock market course: learn the share market from scratch',
  intro:
    'Most people lose money in the market not because they lack information, but because they never built a process. A stock market course is worth paying for only if it leaves you with one: a written method for finding a trade, sizing it, and knowing when you were wrong. Here is what that looks like, what a serious syllabus covers, and how to tell a real course from a tip service with a certificate.',
  sections: [
    {
      type: 'prose',
      h2: 'What a stock market course should actually teach',
      paras: [
        'A good course moves in one direction: from how the market works, to how to analyse it, to how to act on that analysis without ruining yourself when you are wrong. Skip any stage and the rest collapses. Plenty of courses teach twenty indicators and no position sizing, which is how people end up with a screen full of signals and an account that keeps shrinking.',
        'The sequence that works is mechanism first, analysis second, risk third — and then enough repetition on live charts that it becomes automatic. Theory you have never applied under time pressure is not knowledge, it is trivia.',
      ],
    },
    {
      type: 'cards',
      h2: 'The six things a complete syllabus covers',
      items: [
        {
          title: '1. Market mechanism',
          body: 'How exchanges, brokers, clearing and depositories actually work. Order types, margins, settlement cycles and the real cost of a trade once brokerage, STT and slippage are counted.',
        },
        {
          title: '2. Technical analysis',
          body: 'Candlestick anatomy, market structure, support and resistance, trend, volume and the handful of indicators worth knowing. Crucially, multi-timeframe confluence rather than indicator collecting.',
        },
        {
          title: '3. Fundamental analysis',
          body: 'Reading a balance sheet, P&L and cash flow statement. Ratio analysis, peer comparison, and valuation through P/E, EV/EBITDA and a basic DCF, so you can tell an expensive good company from a cheap bad one.',
        },
        {
          title: '4. Derivatives and options',
          body: 'Calls, puts, premium and the Greeks explained in plain language. Spreads, straddles and condors, expiry behaviour, open interest, and using options to hedge rather than to gamble.',
        },
        {
          title: '5. Risk management',
          body: 'Position sizing, the 1% rule, correlation risk, and the drawdown mathematics that explain why a 50% loss needs a 100% gain to recover. This is the module that decides whether you survive.',
        },
        {
          title: '6. Trading psychology',
          body: 'Tilt, revenge trading, FOMO and the discipline to follow a plan through a losing streak. Taught as a routine you run, not as motivational advice.',
        },
      ],
    },
    {
      type: 'checks',
      h2: 'How to judge a stock market course before you pay',
      intro:
        'Ask these before handing over a fee. A course that cannot answer them comfortably is telling you something.',
      items: [
        'Can I attend a real class — not a sales webinar — before enrolling?',
        'Are the mentors NISM certified, and do they trade their own capital?',
        'Does teaching happen on live charts during market hours, or only on recorded slides?',
        'Is risk management and position sizing taught early, or bolted on at the end?',
        'Is there a written refund policy with a defined window?',
        'Do I keep access to recordings and updated material after the course ends?',
        'Does the course avoid promising returns, tips or "guaranteed" profits?',
      ],
    },
    {
      type: 'callout',
      tone: 'amber',
      title: 'The single biggest red flag',
      body: 'Any course that advertises a return figure — "earn ₹5,000 a day", "90% accurate calls", "assured monthly income" — is not an education business. Teaching cannot guarantee an outcome in a market, and in India, selling buy/sell recommendations requires SEBI registration as a Research Analyst or Investment Adviser. If a course sells calls alongside classes, check that registration number before anything else.',
    },
    {
      type: 'table',
      h2: 'Online, classroom or self-paced?',
      intro:
        'All three work for different people. The failure mode of self-paced video is that nobody corrects your mistakes; the failure mode of classroom is that you cannot attend.',
      head: ['Format', 'Best for', 'Main weakness'],
      rows: [
        [
          'Recorded / self-paced',
          'Cheap, revisable, fits any schedule',
          'No correction, very high drop-off rate',
        ],
        [
          'Live online',
          'Real-time questions, no travel, cohort accountability',
          'Easy to attend passively with the camera off',
        ],
        [
          'Classroom',
          'Highest completion rate, direct correction, peer group',
          'Fixed location and timing',
        ],
        [
          'One-on-one mentorship',
          'Fastest improvement, built on your actual trades',
          'Most expensive per hour',
        ],
      ],
    },
    {
      type: 'prose',
      h2: 'How long it takes, honestly',
      paras: [
        'You can learn the mechanics of the market in a few weeks. You can learn to analyse a chart competently in two to three months of consistent work. Becoming consistently profitable is a different question, and anyone who puts a date on it for you is guessing.',
        'A realistic structure is four months of instruction and practice to build the method, then six to twelve months of small-size live trading with journaling and review to make it stick. Our Ultimate Traders Program covers the first part across roughly 90 hours; the mentorship track exists for the second.',
      ],
    },
    {
      type: 'prose',
      h2: 'Should you get NISM certified?',
      paras: [
        'If you want a job in the industry, yes — it is often a hard requirement. NISM Series XV (Research Analyst) is the one that matters for research roles, Series VIII (Equity Derivatives) for derivatives desks, and Series V-A (Mutual Fund Distributors) if you intend to distribute funds.',
        'If you only want to trade your own capital, certification is optional. It is still a useful forcing function: the syllabus makes you learn the regulatory framework properly, which is exactly the part self-taught traders skip.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Can a complete beginner learn the stock market?',
      a: 'Yes, and roughly half of our students join with no market background at all. What matters is starting from the mechanism — what a share is, how an exchange matches orders, what you actually pay per trade — rather than jumping straight to chart patterns. Any course that starts at indicators has skipped the foundation.',
    },
    {
      q: 'How much money do I need to start trading after a course?',
      a: 'Less than most people expect, and you should start smaller than you can afford. The purpose of your first six months of live trading is to test your process, not to earn — position sizes should be small enough that a losing streak is uncomfortable rather than damaging. Many of our students begin with ₹10,000 to ₹25,000 and scale only once their journal justifies it.',
    },
    {
      q: 'Is a stock market course worth the money?',
      a: 'It is worth it if it shortens the expensive part of the learning curve. Most self-taught traders pay their tuition to the market instead, in losses, and learn more slowly because nothing corrects them. A course is worth paying for when it gives you a written, tested process and someone experienced reviewing your actual trades. It is not worth it if it is a video library you will not finish.',
    },
    {
      q: 'Can I learn the stock market for free?',
      a: 'You can learn a great deal free — NSE and SEBI publish excellent investor education material, and Zerodha Varsity is genuinely good. What free resources do not give you is correction, structure and accountability, which is why completion rates are low. Use the free material first; pay for a course when you want someone to tell you what you are doing wrong.',
    },
    {
      q: 'What is the difference between trading and investing?',
      a: 'Investing holds for years on a view about a business and accepts large interim drawdowns. Trading holds for minutes to weeks on a view about price and uses tight invalidation. They need different skills, different risk rules and different temperaments. A complete course covers both so you can choose deliberately rather than drifting between them.',
    },
    {
      q: 'Do you offer the course in Hindi?',
      a: 'Yes. Every session is bilingual — terminology stays in English so it matches your terminal and the NISM exam, while explanations are given in Hindi wherever that helps.',
    },
  ],
  related: [
    { label: 'Ultimate Traders Program', href: '/courses/ultimate-traders-program/' },
    { label: 'Trading course', href: '/trading-course/' },
    { label: 'NISM certification', href: '/courses/nism-certification/' },
    { label: 'Course fees', href: '/pricing/' },
  ],
};

/* ========================================================================= */
/*  3. NATIONAL — trading course                                             */
/* ========================================================================= */

const tradingCourse: Landing = {
  slug: 'trading-course',
  eyebrow: 'Trading course',
  metaTitle: 'Trading Course — Intraday, Swing & Options Trading Classes',
  metaDescription:
    'A trading course built around risk, not signals. Intraday, swing, options and price action taught on live charts by NISM certified mentors, with back-testing labs and trade journal reviews. English & Hindi, online or classroom.',
  keywords: [
    'trading course',
    'trading classes',
    'intraday trading course',
    'options trading course',
    'day trading course India',
    'swing trading course',
    'price action course',
    'online trading course',
    'trading course in Hindi',
  ],
  h1: 'Trading course: build a system, not a hunch',
  intro:
    'Trading is not a knowledge problem. Almost everyone who loses money already knows what a head and shoulders looks like. What they do not have is a written set of rules, a position size that survives a losing streak, and the discipline to follow both on a bad Tuesday. A trading course is only useful if it builds those three things.',
  sections: [
    {
      type: 'prose',
      h2: 'Why most traders lose, and what a course must fix',
      paras: [
        'Study after study from regulators around the world lands in the same place: the large majority of individual intraday traders lose money over time. SEBI’s own studies of the Indian derivatives market have reported losses for roughly nine in ten individual traders. That is not an argument against learning to trade — it is an argument against learning it the way most people do.',
        'The losses rarely come from bad analysis. They come from oversized positions, no invalidation level, revenge trades after a loss, and strategies that were never tested on more than a handful of charts. A trading course that spends its time on entry signals and none on these is selling you the easy half.',
      ],
    },
    {
      type: 'cards',
      h2: 'The styles we teach, and who each suits',
      intro:
        'These are genuinely different jobs with different time demands. Picking one that does not fit your schedule is the most common reason a promising trader quits.',
      items: [
        {
          title: 'Intraday trading',
          body: 'Positions opened and closed the same session. Needs you at the screen through market hours and the fastest decision-making. Highest stress, highest transaction costs, least forgiving of a weak process.',
        },
        {
          title: 'Swing trading',
          body: 'Holding days to weeks on a technical thesis. Suits working professionals — you can plan trades in the evening and manage them with orders. Usually the best starting point.',
        },
        {
          title: 'Positional trading',
          body: 'Weeks to months, blending technical entry with a fundamental view. Fewer decisions, wider stops, more patience required.',
        },
        {
          title: 'Options trading',
          body: 'Defined-risk structures: spreads, straddles, strangles, condors. Powerful for hedging and for expressing a view on volatility rather than direction — and the fastest way to lose capital if the Greeks are a mystery to you.',
        },
      ],
    },
    {
      type: 'steps',
      h2: 'How we build a trading system with you',
      intro:
        'A system is not a secret indicator. It is a written document that answers five questions the same way every time.',
      items: [
        {
          title: 'Define the setup',
          body: 'What specific, repeatable market condition are you trading? If you cannot describe it precisely enough for someone else to spot it, it is not a setup.',
        },
        {
          title: 'Define entry and invalidation',
          body: 'Exactly where you get in, and exactly what price proves the idea wrong. The stop goes where the thesis breaks, not where your comfort ends.',
        },
        {
          title: 'Size the position',
          body: 'Risk a fixed small fraction of capital per trade — typically 1%. Position size is then arithmetic, derived from your stop distance, not a feeling.',
        },
        {
          title: 'Back-test it',
          body: 'Run the rules over multiple market regimes in our back-testing lab. A strategy that only worked in a trending year will hurt you in a range.',
        },
        {
          title: 'Journal and review',
          body: 'Log every trade with the reason for entry. In weekly review we separate process errors from bad outcomes — they need opposite responses.',
        },
      ],
    },
    {
      type: 'checks',
      h2: 'What this trading course includes',
      items: [
        'Live market sessions during NSE hours with mentors marking up real charts',
        'Strategy-building and back-testing labs over multiple market regimes',
        'Options payoff builder and Greeks taught in plain language',
        'Weekly review of your own trade journal with a mentor',
        'Trading psychology sessions on tilt, FOMO and drawdown discipline',
        'Simulated environment before you risk live capital',
        'Lifetime access to recordings, updates and the alumni community',
      ],
    },
    {
      type: 'callout',
      tone: 'amber',
      title: 'What we will not do',
      body: 'We will not give you buy/sell calls, signals or tips — that requires SEBI registration as a Research Analyst, which we do not hold and do not claim. We will not quote you an expected return, because nobody honestly can. And we will not tell you trading is passive income. It is a skill with a real failure rate, and you should decide to learn it with that in front of you.',
    },
    {
      type: 'prose',
      h2: 'Do you need a trading course to start?',
      paras: [
        'No. You can open an account tomorrow and learn by losing money, which is how a great many traders do it. The question is whether that is the cheapest way to learn, and for most people it is not — the market charges more for the lesson than a course does, and teaches it more slowly because it never explains what went wrong.',
        'The honest case for a course is compression and correction: someone who has already made the mistakes telling you which of your habits are costing you, so you stop paying for them. If you are already consistently profitable with a written system, you do not need us. If you are not, the useful question is whether your process is written down at all.',
      ],
    },
  ],
  faqs: [
    {
      q: 'Which trading course is best for beginners?',
      a: 'One that starts with market mechanics and risk before strategy, teaches on live charts rather than only recorded slides, and reviews your actual trades. For most beginners a swing-trading foundation is a better starting point than intraday, because it does not require you to be at the screen all day while you are still learning.',
    },
    {
      q: 'How long does it take to learn trading?',
      a: 'Two to four months to build a method, then six to twelve months of small-size live trading with journaling to make it consistent. Anyone offering a timeline to profitability is guessing — the instruction has a schedule, your consistency does not.',
    },
    {
      q: 'Is intraday trading profitable?',
      a: 'For a small minority, yes. SEBI studies of the Indian derivatives segment have found that the large majority of individual traders lose money, and intraday is the least forgiving style because transaction costs and decision frequency are both highest. We teach it, but we start most students on swing trading and we are direct about the base rates.',
    },
    {
      q: 'Do I need a big capital to start trading?',
      a: 'No, and starting small is the correct choice regardless of what you can afford. Your first months of live trading are a test of your process, so position sizes should be small enough that a losing streak teaches you something rather than ending your participation. Scale only when your journal shows the method works.',
    },
    {
      q: 'Can I learn trading while working a full-time job?',
      a: 'Yes. Swing and positional trading are specifically suited to it — you analyse in the evening and manage positions with resting orders. We run a weekday evening batch from 6:00 PM and a weekend batch, and every session is recorded.',
    },
    {
      q: 'Will you give me trading tips or calls after the course?',
      a: 'No. We are an education provider, not a SEBI-registered Research Analyst or Investment Adviser, and we do not sell recommendations. What you get after the course is the weekly market outlook from our research desk, the alumni community and ongoing doubt resolution — analysis you can learn from, not instructions to follow.',
    },
  ],
  related: [
    { label: 'Ultimate Traders Program', href: '/courses/ultimate-traders-program/' },
    { label: 'One-on-one mentorship', href: '/courses/one-on-one-mentorship/' },
    { label: 'Stock market course', href: '/stock-market-course/' },
    { label: 'Forex & Crypto', href: '/courses/forex-and-crypto/' },
  ],
};

export const landings: Landing[] = [lucknow, stockMarketCourse, tradingCourse];
export const landingBySlug = (slug: string) => landings.find((l) => l.slug === slug);
