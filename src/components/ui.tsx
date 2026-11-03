'use client';

import { useState, type ReactNode } from 'react';
import Link from 'next/link';
import { AnimatePresence, m } from 'framer-motion';
import { Icon } from './Icons';
import { Reveal, fadeUp, hoverLift } from './motion';
import type { Course } from '@/lib/courses';

/* ----------------------------- Section heading ---------------------------- */

export function SectionHeading({
  eyebrow,
  title,
  body,
  align = 'left',
  className = '',
}: {
  eyebrow?: string;
  title: ReactNode;
  body?: ReactNode;
  align?: 'left' | 'center';
  className?: string;
}) {
  const centered = align === 'center';
  return (
    <Reveal
      className={`${centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'} ${className}`}
    >
      {eyebrow && (
        <span className={`eyebrow ${centered ? 'justify-center' : ''}`}>
          <span className="h-px w-6 bg-bull/60" />
          {eyebrow}
        </span>
      )}
      <h2 className="mt-3 text-3xl font-bold leading-[1.15] sm:text-4xl lg:text-[2.75rem]">
        {title}
      </h2>
      {body && <p className="mt-4 text-base leading-relaxed text-muted">{body}</p>}
    </Reveal>
  );
}

/* --------------------------------- Pills --------------------------------- */

export function Pill({ children, tone = 'bull' }: { children: ReactNode; tone?: string }) {
  const tones: Record<string, string> = {
    bull: 'border-bull/25 bg-bull/10 text-bull',
    cyan: 'border-cyan/25 bg-cyan/10 text-cyan',
    violet: 'border-violet/25 bg-violet/10 text-violet',
    amber: 'border-amber/25 bg-amber/10 text-amber',
    muted: 'border-line bg-white/[0.04] text-muted',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-2xs font-semibold uppercase tracking-[0.1em] ${
        tones[tone] ?? tones.bull
      }`}
    >
      {children}
    </span>
  );
}

/* ------------------------------- Course card ------------------------------ */

const accentRing: Record<string, string> = {
  mint: 'from-bull/25 to-transparent',
  cyan: 'from-cyan/25 to-transparent',
  violet: 'from-violet/25 to-transparent',
  amber: 'from-amber/25 to-transparent',
};

const accentText: Record<string, string> = {
  mint: 'text-bull',
  cyan: 'text-cyan',
  violet: 'text-violet',
  amber: 'text-amber',
};

export function CourseCard({ course, index = 0 }: { course: Course; index?: number }) {
  const Glyph = Icon[course.icon];
  return (
    <m.article
      variants={fadeUp}
      {...hoverLift}
      className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-card/60 p-6 backdrop-blur-sm transition-colors duration-300 hover:border-white/15"
    >
      {/* Accent wash that brightens on hover */}
      <div
        aria-hidden
        className={`pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br blur-2xl transition-opacity duration-500 ${accentRing[course.accent]} opacity-50 group-hover:opacity-100`}
      />

      <div className="relative flex items-start justify-between gap-4">
        <span
          className={`grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white/[0.04] ${accentText[course.accent]}`}
        >
          <Glyph className="h-6 w-6" />
        </span>
        {course.featured && <Pill tone="bull">Most popular</Pill>}
      </div>

      <p className="relative mt-5 text-2xs font-semibold uppercase tracking-[0.14em] text-muted">
        {course.tagline}
      </p>
      <h3 className="relative mt-2 text-xl font-bold leading-snug">{course.shortTitle}</h3>
      <p className="relative mt-3 flex-1 text-sm leading-relaxed text-muted">{course.summary}</p>

      <div className="relative mt-5 flex flex-wrap gap-x-4 gap-y-2 text-2xs text-muted">
        <span className="inline-flex items-center gap-1.5">
          <Icon.clock className="h-3.5 w-3.5" /> {course.duration}
        </span>
        <span className="inline-flex items-center gap-1.5">
          <Icon.users className="h-3.5 w-3.5" /> {course.level}
        </span>
      </div>

      <div className="relative mt-6 flex items-center justify-between border-t border-line pt-5">
        <span className="text-sm">
          <span className="tnum font-bold text-fg">
            ₹{course.price.toLocaleString('en-IN')}
          </span>
          {course.mrp && course.mrp > course.price && (
            <span className="tnum ml-2 text-xs text-muted line-through">
              ₹{course.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </span>
        <Link
          href={`/courses/${course.slug}/`}
          className={`inline-flex items-center gap-1.5 text-sm font-semibold ${accentText[course.accent]}`}
        >
          Details
          <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </div>

      <Link href={`/courses/${course.slug}/`} className="absolute inset-0" aria-label={course.title}>
        <span className="sr-only">{course.title}</span>
      </Link>
    </m.article>
  );
}

/* -------------------------------- Accordion ------------------------------- */

export function Accordion({ items }: { items: { q: string; a: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div className="divide-y divide-line overflow-hidden rounded-3xl border border-line bg-card/40">
      {items.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                aria-expanded={isOpen}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.02]"
              >
                <span
                  className={`text-base font-semibold transition-colors ${isOpen ? 'text-bull' : 'text-fg'}`}
                >
                  {item.q}
                </span>
                <m.span
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-line text-muted"
                >
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden>
                    <path
                      d="M12 5v14M5 12h14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </m.span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {isOpen && (
                <m.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <p className="px-6 pb-5 pr-14 text-sm leading-relaxed text-muted">{item.a}</p>
                </m.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

/* ------------------------------ Checklist row ----------------------------- */

export function CheckItem({ children }: { children: ReactNode }) {
  return (
    <m.li variants={fadeUp} className="flex items-start gap-3">
      <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bull/15 text-bull">
        <Icon.check className="h-3 w-3" />
      </span>
      <span className="text-sm leading-relaxed text-muted">{children}</span>
    </m.li>
  );
}

/* --------------------------------- CTA band -------------------------------- */

export function CTABand({
  title = 'Ready to trade with a system instead of a hunch?',
  body = 'Sit in on a free demo class, meet the mentors and see a live market analysis class before you decide anything.',
  primary = { label: 'Book a free demo', href: '/contact/' },
  secondary = { label: 'Browse courses', href: '/courses/' },
}: {
  title?: string;
  body?: string;
  primary?: { label: string; href: string };
  secondary?: { label: string; href: string };
}) {
  return (
    <section className="container-x mt-24">
      <Reveal className="relative overflow-hidden rounded-[2rem] border border-line bg-gradient-to-br from-card to-surface px-6 py-14 text-center sm:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.25]"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 h-72 w-[36rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[80px]"
          style={{
            background:
              'radial-gradient(circle, rgba(0,227,154,0.22), rgba(56,214,255,0.08) 50%, transparent 72%)',
          }}
        />
        <div className="relative">
          <h2 className="mx-auto max-w-2xl text-3xl font-bold leading-tight sm:text-4xl">
            {title}
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-muted">{body}</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link href={primary.href} className="btn-primary">
              {primary.label}
              <Icon.arrowRight className="h-4 w-4" />
            </Link>
            <Link href={secondary.href} className="btn-ghost">
              {secondary.label}
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Page hero band ----------------------------- */

export function PageHero({
  eyebrow,
  title,
  body,
  children,
}: {
  eyebrow: string;
  title: string;
  body: string;
  children?: ReactNode;
}) {
  return (
    <section className="glow relative overflow-hidden border-b border-line pb-16 pt-16 sm:pt-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.22]"
      />
      <div className="container-x relative">
        <Reveal>
          <span className="eyebrow">
            <span className="h-px w-6 bg-bull/60" />
            {eyebrow}
          </span>
          <h1 className="mt-4 max-w-3xl text-4xl font-extrabold leading-[1.1] sm:text-5xl lg:text-[3.25rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{body}</p>
        </Reveal>
        {children}
      </div>
    </section>
  );
}
