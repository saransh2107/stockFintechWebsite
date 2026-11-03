'use client';

import { useEffect, useState } from 'react';
import { m } from 'framer-motion';

/**
 * Indicative market strip.
 *
 * These are illustrative figures, not a live feed — they drift slightly after
 * mount so the strip feels alive without pulling in a market-data vendor.
 * Swap `SEED` for a real API response if you ever wire one up.
 */

const SEED = [
  { sym: 'NIFTY 50', px: 24836.3, chg: 0.84 },
  { sym: 'SENSEX', px: 81224.75, chg: 0.71 },
  { sym: 'BANK NIFTY', px: 54109.15, chg: -0.22 },
  { sym: 'FIN NIFTY', px: 25640.4, chg: 0.33 },
  { sym: 'USD/INR', px: 83.42, chg: 0.09 },
  { sym: 'GOLD MCX', px: 73890, chg: -0.35 },
  { sym: 'BTC/USDT', px: 67412, chg: 2.14 },
  { sym: 'ETH/USDT', px: 3284.6, chg: 1.47 },
];

const fmt = (n: number) =>
  n.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

export default function TickerTape() {
  const [rows, setRows] = useState(SEED);

  useEffect(() => {
    const id = window.setInterval(() => {
      setRows((prev) =>
        prev.map((r) => {
          const drift = (Math.random() - 0.5) * (r.px * 0.0006);
          return { ...r, px: r.px + drift, chg: r.chg + (Math.random() - 0.5) * 0.04 };
        })
      );
    }, 3200);
    return () => window.clearInterval(id);
  }, []);

  const doubled = [...rows, ...rows];

  return (
    <m.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-y border-line bg-surface/60"
    >
      <div className="container-x flex items-center gap-4 py-2.5">
        <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-bull/25 bg-bull/10 px-2.5 py-1 text-2xs font-semibold uppercase tracking-[0.15em] text-bull">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-bull" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bull" />
          </span>
          Live
        </span>

        <div className="mask-edges min-w-0 flex-1 overflow-hidden">
          <div className="flex w-max animate-ticker gap-7 whitespace-nowrap will-change-transform">
            {doubled.map((r, i) => (
              <span key={i} className="flex items-center gap-2 text-xs">
                <span className="font-semibold text-fg/90">{r.sym}</span>
                <span className="tnum text-muted">{fmt(r.px)}</span>
                <span
                  className={`tnum font-semibold ${r.chg >= 0 ? 'text-bull' : 'text-bear'}`}
                >
                  {r.chg >= 0 ? '▲' : '▼'} {Math.abs(r.chg).toFixed(2)}%
                </span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </m.div>
  );
}
