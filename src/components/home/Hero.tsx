'use client';

import Link from 'next/link';
import { m, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Icon } from '@/components/Icons';
import { fadeUp, stagger } from '@/components/motion';

const EASE = [0.22, 1, 0.36, 1] as const;

/** Deterministic candles for the hero terminal card. */
const CANDLES = [
  { top: 96, h: 16, up: false },
  { top: 88, h: 12, up: true },
  { top: 92, h: 10, up: false },
  { top: 76, h: 18, up: true },
  { top: 68, h: 12, up: true },
  { top: 72, h: 10, up: false },
  { top: 56, h: 16, up: true },
  { top: 48, h: 12, up: true },
  { top: 52, h: 10, up: false },
  { top: 34, h: 20, up: true },
  { top: 26, h: 12, up: true },
  { top: 18, h: 14, up: true },
];
const CX = (i: number) => 10 + i * 24;
const AREA =
  CANDLES.map((c, i) => `${CX(i) + 6},${c.top + c.h / 2}`).join(' L') + ' L298,140 L16,140 Z';
const LINE = CANDLES.map((c, i) => `${CX(i) + 6},${c.top + c.h / 2}`).join(' L');

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const yText = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const yCard = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const fade = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={ref}
      className="glow relative overflow-hidden pb-20 pt-14 sm:pt-20 lg:pb-28 lg:pt-24"
    >
      {/* Background grid + aurora */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.28]"
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 h-[34rem] w-[34rem] rounded-full blur-[110px]"
        style={{
          background:
            'radial-gradient(circle, rgba(56,214,255,0.16), rgba(139,124,255,0.09) 45%, transparent 70%)',
        }}
        animate={{ scale: [1, 1.12, 1], opacity: [0.75, 1, 0.75] }}
        transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
      />
      <m.div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-32 h-[28rem] w-[28rem] rounded-full blur-[110px]"
        style={{
          background: 'radial-gradient(circle, rgba(0,227,154,0.14), transparent 70%)',
        }}
        animate={{ scale: [1.1, 1, 1.1] }}
        transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
      />

      <div className="container-x relative grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10">
        {/* ------------------------------ Copy ------------------------------ */}
        <m.div style={{ y: yText, opacity: fade }} variants={stagger(0.09)} initial="hidden" animate="show">
          <m.div variants={fadeUp}>
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-white/[0.04] py-1.5 pl-1.5 pr-4 text-xs text-muted">
              <span className="rounded-full bg-bull px-2.5 py-1 text-2xs font-bold uppercase tracking-wider text-ink">
                New
              </span>
              Course package released — 20% off with code{' '}
              <span className="font-semibold text-bull">FINTECH</span>
            </span>
          </m.div>

          <m.h1
            variants={fadeUp}
            className="mt-6 text-4xl font-extrabold leading-[1.08] sm:text-5xl lg:text-[3.6rem]"
          >
            Master the markets.{' '}
            <span className="text-gradient">Learn, trade &amp; invest</span> with confidence.
          </m.h1>

          <m.p
            variants={fadeUp}
            className="mt-6 max-w-xl text-lg leading-relaxed text-muted"
          >
            Stock market trading, NISM certification, Forex &amp; Crypto — taught on live charts
            by NSE &amp; NISM certified mentors, in English and Hindi. Classroom in Lucknow or
            live online.
          </m.p>

          <m.div variants={fadeUp} className="mt-8 flex flex-wrap items-center gap-3">
            <Link href="/contact/" className="btn-primary group">
              Book a free demo class
              <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link href="/courses/" className="btn-ghost group">
              <Icon.play className="h-3.5 w-3.5 text-bull" />
              Explore all courses
            </Link>
          </m.div>

          {/* Social proof row */}
          <m.div
            variants={fadeUp}
            className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5"
          >
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2.5">
                {['RV', 'PS', 'NG', 'AM'].map((n, i) => (
                  <span
                    key={n}
                    className="grid h-9 w-9 place-items-center rounded-full border-2 border-ink bg-raised text-2xs font-bold text-muted"
                    style={{ zIndex: 4 - i }}
                  >
                    {n}
                  </span>
                ))}
              </div>
              <div className="text-xs leading-tight">
                <p className="tnum font-bold text-fg">10,000+</p>
                <p className="text-muted">students trained</p>
              </div>
            </div>

            <div className="h-9 w-px bg-line" />

            <div className="text-xs leading-tight">
              <p className="flex items-center gap-1 font-bold text-fg">
                <span className="tnum">4.85</span>
                <span className="flex gap-0.5 text-amber">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Icon.star key={i} className="h-3 w-3" />
                  ))}
                </span>
              </p>
              <p className="mt-0.5 text-muted">average learner rating</p>
            </div>

            <div className="hidden h-9 w-px bg-line sm:block" />

            <div className="text-xs leading-tight">
              <p className="tnum font-bold text-fg">English &amp; हिंदी</p>
              <p className="mt-0.5 text-muted">bilingual sessions</p>
            </div>
          </m.div>
        </m.div>

        {/* --------------------------- Terminal card -------------------------- */}
        <m.div
          style={{ y: yCard }}
          initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.25 }}
          className="relative mx-auto w-full max-w-lg lg:max-w-none"
        >
          <div className="relative rounded-[1.75rem] border border-line bg-card/80 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl">
            {/* Window chrome */}
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-bear/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber/70" />
                <span className="h-2.5 w-2.5 rounded-full bg-bull/70" />
                <span className="ml-2 text-2xs font-medium uppercase tracking-[0.14em] text-muted">
                  Live session · NIFTY 50
                </span>
              </div>
              <span className="flex items-center gap-1.5 rounded-full border border-bull/25 bg-bull/10 px-2 py-0.5 text-2xs font-bold text-bull">
                <span className="blink h-1.5 w-1.5 rounded-full bg-bull" />
                LIVE
              </span>
            </div>

            {/* Price header */}
            <div className="flex items-end justify-between pt-4">
              <div>
                <p className="text-2xs uppercase tracking-[0.14em] text-muted">Last traded</p>
                <p className="tnum mt-1 text-3xl font-bold text-fg">24,836.30</p>
              </div>
              <p className="tnum flex items-center gap-1 rounded-lg bg-bull/10 px-2.5 py-1.5 text-sm font-bold text-bull">
                ▲ 207.45 (0.84%)
              </p>
            </div>

            {/* Chart */}
            <svg viewBox="0 0 310 150" className="mt-4 h-auto w-full" aria-hidden>
              <defs>
                <linearGradient id="hero-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#00E39A" stopOpacity="0.28" />
                  <stop offset="100%" stopColor="#00E39A" stopOpacity="0" />
                </linearGradient>
                <linearGradient id="hero-line" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#38D6FF" />
                  <stop offset="100%" stopColor="#00E39A" />
                </linearGradient>
              </defs>

              {[20, 56, 92, 128].map((y) => (
                <line
                  key={y}
                  x1="0"
                  y1={y}
                  x2="310"
                  y2={y}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {CANDLES.map((c, i) => {
                const color = c.up ? '#00E39A' : '#FF4D6A';
                return (
                  <m.g
                    key={i}
                    initial={{ opacity: 0, scaleY: 0 }}
                    animate={{ opacity: 1, scaleY: 1 }}
                    transition={{ delay: 0.6 + i * 0.055, duration: 0.4, ease: EASE }}
                    style={{ transformOrigin: `${CX(i) + 6}px ${c.top + c.h}px` }}
                  >
                    <line
                      x1={CX(i) + 6}
                      y1={c.top - 6}
                      x2={CX(i) + 6}
                      y2={c.top + c.h + 6}
                      stroke={color}
                      strokeWidth="1.4"
                      opacity="0.7"
                    />
                    <rect
                      x={CX(i)}
                      y={c.top}
                      width="12"
                      height={c.h}
                      rx="2"
                      fill={color}
                      opacity={c.up ? 0.9 : 0.75}
                    />
                  </m.g>
                );
              })}

              <m.path
                d={`M${AREA}`}
                fill="url(#hero-area)"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 0.8 }}
              />
              <m.path
                d={`M${LINE}`}
                fill="none"
                stroke="url(#hero-line)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 0.75, duration: 1.5, ease: EASE }}
              />
              <m.circle
                cx={CX(11) + 6}
                cy={CANDLES[11].top + CANDLES[11].h / 2}
                r="4"
                fill="#00E39A"
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.3, 1] }}
                transition={{ delay: 2.2, duration: 0.5 }}
              />
            </svg>

            {/* Mini stats */}
            <div className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-4">
              {[
                { k: 'Open', v: '24,642.10' },
                { k: 'High', v: '24,871.55' },
                { k: 'Low', v: '24,601.80' },
              ].map((s) => (
                <div key={s.k}>
                  <p className="text-2xs uppercase tracking-wider text-muted">{s.k}</p>
                  <p className="tnum mt-0.5 text-sm font-semibold text-fg">{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Floating chips */}
          <m.div
            className="absolute -left-4 top-1/3 hidden rounded-2xl border border-line bg-raised/90 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur-md sm:block"
            animate={{ y: [0, -12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <p className="text-2xs uppercase tracking-wider text-muted">NISM pass rate</p>
            <p className="tnum mt-0.5 text-xl font-bold text-bull">92%</p>
          </m.div>

          <m.div
            className="absolute -bottom-5 -right-2 hidden rounded-2xl border border-line bg-raised/90 px-4 py-3 shadow-xl shadow-black/40 backdrop-blur-md sm:block"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
          >
            <p className="flex items-center gap-1.5 text-2xs uppercase tracking-wider text-muted">
              <Icon.users className="h-3 w-3 text-cyan" /> In session now
            </p>
            <p className="tnum mt-0.5 text-xl font-bold text-fg">148</p>
          </m.div>
        </m.div>
      </div>
    </section>
  );
}
