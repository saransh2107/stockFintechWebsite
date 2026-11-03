'use client';

import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  m,
  useMotionValue,
  useTransform,
  animate,
  useReducedMotion,
} from 'framer-motion';

/**
 * Market-open preloader — a green uptrend printing itself.
 *
 * Eighteen bullish candles print left to right in a rising staircase, each one
 * stepping above the last, while a gradient trendline draws through the closes
 * and the price readout rallies alongside them. Runs for 3.5s.
 *
 * It dismisses on `window.load` but never shows for less than MIN_MS (so the
 * uptrend has time to finish) and never longer than MAX_MS (so a slow
 * third-party asset can never hold the page hostage).
 *
 * After the first view it is skipped for the rest of the session.
 */

const MIN_MS = 3500;
const MAX_MS = 6000;
const SESSION_KEY = 'sf:seen-intro';

/** Candle stagger — 18 candles * 0.155s lands the last one at ~3.3s. */
const LEAD = 0.15;
const STEP = 0.155;

/**
 * All-green staircase uptrend. Deterministic — never random, or the server and
 * client markup disagree. `top` is the body's upper edge and `h` its height, so
 * a smaller `top` sits higher on screen.
 */
const CANDLES = [
  { top: 142, h: 10 },
  { top: 134, h: 12 },
  { top: 130, h: 8 },
  { top: 120, h: 14 },
  { top: 114, h: 9 },
  { top: 112, h: 7 }, // consolidation
  { top: 102, h: 13 },
  { top: 94, h: 11 },
  { top: 90, h: 8 },
  { top: 78, h: 15 },
  { top: 72, h: 9 },
  { top: 70, h: 7 }, // consolidation
  { top: 58, h: 14 },
  { top: 50, h: 11 },
  { top: 46, h: 8 },
  { top: 34, h: 15 },
  { top: 26, h: 11 },
  { top: 18, h: 12 },
];

const W = 11; // candle body width
const X = (i: number) => 8 + i * 19.5;
const CX = (i: number) => X(i) + W / 2;
const MID = (c: (typeof CANDLES)[number]) => c.top + c.h / 2;

const LAST = CANDLES.length - 1;
const TREND = CANDLES.map((c, i) => `${CX(i)},${MID(c)}`).join(' L');
const AREA = `M${TREND} L${CX(LAST)},168 L${CX(0)},168 Z`;

/** The readout rallies in step with the candles. */
const PRICE_FROM = 24102.4;
const PRICE_TO = 24836.3;

const TAPE = [
  { sym: 'NIFTY 50', px: '24,836.30', chg: '+3.05%', up: true },
  { sym: 'SENSEX', px: '81,224.75', chg: '+2.71%', up: true },
  { sym: 'BANKNIFTY', px: '54,109.15', chg: '+1.84%', up: true },
  { sym: 'USD/INR', px: '83.42', chg: '-0.09%', up: false },
  { sym: 'BTC/USDT', px: '67,412.00', chg: '+2.14%', up: true },
  { sym: 'GOLD', px: '73,890', chg: '+0.65%', up: true },
];

const WORD = 'STOCK FINTECH'.split('');

export default function Preloader() {
  const [open, setOpen] = useState(true);
  const reduce = useReducedMotion();

  const pct = useMotionValue(0);
  const pctText = useTransform(pct, (v) => String(Math.round(v)).padStart(2, '0'));
  const barScale = useTransform(pct, (v) => v / 100);

  const price = useMotionValue(PRICE_FROM);
  const priceText = useTransform(price, (v) =>
    v.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  );
  const gainText = useTransform(
    price,
    (v) => `+${(((v - PRICE_FROM) / PRICE_FROM) * 100).toFixed(2)}%`
  );

  const startedAt = useRef(0);

  useEffect(() => {
    startedAt.current = performance.now();

    // Returning visitor in this session: skip straight to the page.
    let skip = false;
    try {
      skip = sessionStorage.getItem(SESSION_KEY) === '1';
    } catch {
      /* private mode / blocked storage — just show the intro */
    }
    if (skip || reduce) {
      setOpen(false);
      return;
    }

    document.body.dataset.loading = 'true';

    // Creep to 90% across the minimum run, then snap to 100 once ready.
    const creep = animate(pct, 90, { duration: MIN_MS / 1000, ease: [0.33, 0.1, 0.25, 1] });
    const rally = animate(price, PRICE_TO, {
      duration: (MIN_MS / 1000) * 0.88,
      delay: 0.3,
      ease: [0.4, 0.05, 0.3, 1],
    });

    let done = false;
    const finish = () => {
      if (done) return;
      done = true;
      const elapsed = performance.now() - startedAt.current;
      const wait = Math.max(0, MIN_MS - elapsed);
      window.setTimeout(() => {
        creep.stop();
        animate(pct, 100, { duration: 0.28, ease: 'easeOut' });
        window.setTimeout(() => setOpen(false), 260);
      }, wait);
    };

    if (document.readyState === 'complete') finish();
    else window.addEventListener('load', finish, { once: true });

    const bail = window.setTimeout(finish, MAX_MS);

    return () => {
      window.removeEventListener('load', finish);
      window.clearTimeout(bail);
      creep.stop();
      rally.stop();
    };
  }, [pct, price, reduce]);

  useEffect(() => {
    if (open) return;
    delete document.body.dataset.loading;
    try {
      sessionStorage.setItem(SESSION_KEY, '1');
    } catch {
      /* ignore */
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <m.div
          key="preloader"
          data-preloader=""
          role="status"
          aria-live="polite"
          aria-label="Loading Stock Fintech"
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center overflow-hidden bg-ink"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'inset(0% 0% 100% 0%)',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Backdrop: grid + a glow that swells as the trend runs */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.3]"
          />
          <m.div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[90px]"
            style={{
              background:
                'radial-gradient(circle, rgba(0,227,154,0.2), rgba(56,214,255,0.07) 45%, transparent 70%)',
            }}
            initial={{ opacity: 0.35, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1.08 }}
            transition={{ duration: MIN_MS / 1000, ease: 'easeOut' }}
          />

          <div className="relative flex w-full max-w-lg flex-col items-center px-6">
            {/* Price readout, rallying */}
            <m.div
              className="mb-4 flex items-end gap-3"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25, duration: 0.4 }}
            >
              <span className="tnum font-display text-3xl font-extrabold tracking-tight text-fg sm:text-4xl">
                <m.span>{priceText}</m.span>
              </span>
              <span className="tnum flex items-center gap-1 pb-1.5 text-sm font-bold text-bull">
                <svg viewBox="0 0 12 12" className="h-3 w-3" aria-hidden>
                  <path d="M6 1.5L10.5 9H1.5z" fill="currentColor" />
                </svg>
                <m.span>{gainText}</m.span>
              </span>
            </m.div>

            {/* Chart */}
            <m.svg
              viewBox="0 0 360 176"
              className="h-auto w-full max-w-[360px]"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              aria-hidden
            >
              <defs>
                <linearGradient id="pl-trend" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38D6FF" />
                  <stop offset="55%" stopColor="#00E39A" />
                  <stop offset="100%" stopColor="#8CFFD2" />
                </linearGradient>
                <linearGradient id="pl-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E39A" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#00E39A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="pl-candle" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4DFFBE" />
                  <stop offset="100%" stopColor="#00C47F" />
                </linearGradient>
                <filter id="pl-glow" x="-60%" y="-60%" width="220%" height="220%">
                  <feGaussianBlur stdDeviation="3.4" result="b" />
                  <feMerge>
                    <feMergeNode in="b" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Baseline grid */}
              {[38, 76, 114, 152].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="360"
                  y2={y}
                  stroke="rgba(255,255,255,0.055)"
                  strokeWidth="1"
                />
              ))}

              {/* Area under the trend, filling in behind the candles */}
              <m.path
                d={AREA}
                fill="url(#pl-area)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.3, duration: 1.4 }}
              />

              {/* Green candles, stepping up one by one */}
              {CANDLES.map((c, i) => (
                <g
                  key={i}
                  className="preloader-candle"
                  style={{
                    animationDelay: `${LEAD + i * STEP}s`,
                    transformOrigin: `${CX(i)}px ${c.top + c.h}px`,
                  }}
                >
                  <line
                    x1={CX(i)}
                    y1={c.top - 7}
                    x2={CX(i)}
                    y2={c.top + c.h + 6}
                    stroke="#00E39A"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    opacity="0.8"
                  />
                  <rect
                    x={X(i)}
                    y={c.top}
                    width={W}
                    height={c.h}
                    rx="2"
                    fill="url(#pl-candle)"
                  />
                </g>
              ))}

              {/* Trendline drawing through the closes */}
              <path
                className="preloader-path"
                d={`M${TREND}`}
                fill="none"
                stroke="url(#pl-trend)"
                strokeWidth="2.6"
                strokeLinecap="round"
                strokeLinejoin="round"
                filter="url(#pl-glow)"
              />

              {/* Breakout marker on the final close */}
              <m.g
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.26, type: 'spring', stiffness: 420, damping: 16 }}
                style={{ transformOrigin: `${CX(LAST)}px ${MID(CANDLES[LAST])}px` }}
              >
                <circle
                  cx={CX(LAST)}
                  cy={MID(CANDLES[LAST])}
                  r="10"
                  fill="#00E39A"
                  opacity="0.16"
                />
                <circle
                  cx={CX(LAST)}
                  cy={MID(CANDLES[LAST])}
                  r="4.6"
                  fill="#8CFFD2"
                  filter="url(#pl-glow)"
                />
              </m.g>
            </m.svg>

            {/* Wordmark */}
            <div className="mt-7 flex overflow-hidden" aria-hidden>
              {WORD.map((ch, i) => (
                <m.span
                  key={i}
                  className="font-display text-[1.35rem] font-extrabold tracking-[0.3em] text-fg sm:text-2xl"
                  initial={{ y: '110%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{
                    delay: 0.6 + i * 0.045,
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  {ch === ' ' ? ' ' : ch}
                </m.span>
              ))}
            </div>

            <m.p
              className="mt-2 text-2xs font-medium uppercase tracking-[0.35em] text-muted"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.7, duration: 0.5 }}
            >
              Learn · Grow · Shine
            </m.p>

            {/* Progress */}
            <m.div
              className="mt-8 w-full max-w-[290px]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
            >
              <div className="mb-2 flex items-baseline justify-between text-2xs font-medium uppercase tracking-[0.2em] text-muted">
                <span className="flex items-center gap-1.5">
                  <span className="blink inline-block h-1.5 w-1.5 rounded-full bg-bull" />
                  Market opening
                </span>
                <span className="tnum text-fg">
                  <m.span>{pctText}</m.span>%
                </span>
              </div>
              <div className="relative h-[3px] overflow-hidden rounded-full bg-white/10">
                <m.div
                  className="h-full origin-left rounded-full bg-gradient-to-r from-cyan to-bull"
                  style={{ scaleX: barScale }}
                />
                <div className="preloader-sweep absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-transparent via-white/25 to-transparent" />
              </div>
            </m.div>
          </div>

          {/* Ticker tape */}
          <m.div
            className="mask-edges absolute bottom-0 left-0 w-full border-t border-line bg-surface/80 py-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            aria-hidden
          >
            <div className="flex w-max animate-ticker gap-8 whitespace-nowrap">
              {[...TAPE, ...TAPE, ...TAPE, ...TAPE].map((t, i) => (
                <span key={i} className="flex items-center gap-2 text-xs">
                  <span className="font-semibold text-fg">{t.sym}</span>
                  <span className="tnum text-muted">{t.px}</span>
                  <span className={`tnum font-medium ${t.up ? 'text-bull' : 'text-bear'}`}>
                    {t.chg}
                  </span>
                </span>
              ))}
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
