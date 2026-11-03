'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { mentors, testimonials } from '@/lib/site';
import { Icon } from '@/components/Icons';
import { Reveal, StaggerGroup, StaggerItem, hoverLift, scaleIn } from '@/components/motion';
import { SectionHeading, Pill } from '@/components/ui';

/* --------------------------------- Mentors -------------------------------- */

export function Mentors() {
  return (
    <section className="container-x mt-28">
      <SectionHeading
        eyebrow="Meet the team"
        title={
          <>
            Mentors who <span className="text-gradient">actually trade</span>
          </>
        }
        body="Our mentors are NSE & NISM certified professionals with years of hands-on trading and teaching experience. They focus on discipline, risk management and real-world decision-making — not shortcuts."
        align="center"
      />

      <StaggerGroup className="mx-auto mt-14 grid max-w-4xl gap-5 sm:grid-cols-2" gap={0.1}>
        {mentors.map((mentor) => (
          <StaggerItem key={mentor.slug}>
            <m.div
              {...hoverLift}
              className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card/50 p-7 transition-colors hover:border-bull/25"
            >
              <div
                aria-hidden
                className="pointer-events-none absolute -right-14 -top-14 h-36 w-36 rounded-full bg-bull/10 blur-2xl opacity-60 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-bull to-cyan font-display text-lg font-extrabold text-ink">
                  {mentor.initials}
                </span>
                <div>
                  <h3 className="text-lg font-bold leading-tight">{mentor.name}</h3>
                  <p className="mt-1 text-sm text-bull">{mentor.role}</p>
                </div>
              </div>

              <p className="relative mt-3 text-2xs uppercase tracking-[0.12em] text-muted">
                {mentor.credentials}
              </p>
              <p className="relative mt-4 text-sm leading-relaxed text-muted">{mentor.bio}</p>

              <div className="relative mt-5 flex flex-wrap gap-2">
                {mentor.specialities.map((s) => (
                  <span
                    key={s}
                    className="rounded-full border border-line bg-white/[0.03] px-2.5 py-1 text-2xs text-muted"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </m.div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <Reveal className="mt-10 text-center">
        <Link href="/mentors/" className="btn-ghost group">
          View all mentors
          <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </Reveal>
    </section>
  );
}

/* ------------------------------ Testimonials ------------------------------ */

function Card({ t }: { t: (typeof testimonials)[number] }) {
  return (
    <figure className="w-[330px] shrink-0 rounded-2xl border border-line bg-card/60 p-6 sm:w-[380px]">
      <div className="flex items-center justify-between">
        <div className="flex gap-0.5 text-amber">
          {Array.from({ length: 5 }).map((_, i) => (
            <Icon.star key={i} className="h-3.5 w-3.5" />
          ))}
        </div>
        <Icon.quote className="h-5 w-5 text-bull/25" />
      </div>
      <blockquote className="mt-4 text-sm leading-relaxed text-muted">“{t.quote}”</blockquote>
      <figcaption className="mt-5 flex items-center gap-3 border-t border-line pt-4">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-raised text-2xs font-bold text-bull">
          {t.name
            .split(' ')
            .map((w) => w[0])
            .join('')}
        </span>
        <span>
          <span className="block text-sm font-semibold text-fg">{t.name}</span>
          <span className="block text-2xs text-muted">{t.role}</span>
        </span>
      </figcaption>
    </figure>
  );
}

export function Testimonials() {
  const rowA = testimonials.slice(0, 5);
  const rowB = testimonials.slice(4);

  return (
    <section className="mt-28">
      <div className="container-x">
        <SectionHeading
          eyebrow="Students say"
          title={
            <>
              Satisfaction is <span className="text-gradient">always present</span>
            </>
          }
          body="Over 10,000 students have trained with us — here is what some of them took away."
          align="center"
        />
      </div>

      <Reveal variants={scaleIn} className="mask-edges mt-14 space-y-5 overflow-hidden">
        {/* Row one */}
        <div className="group flex w-max gap-5 will-change-transform">
          <div className="flex animate-marquee gap-5 group-hover:[animation-play-state:paused]">
            {[...rowA, ...rowA].map((t, i) => (
              <Card key={`a${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row two, opposite direction */}
        <div className="group flex w-max gap-5 will-change-transform">
          <div className="flex animate-marquee gap-5 [animation-direction:reverse] [animation-duration:38s] group-hover:[animation-play-state:paused]">
            {[...rowB, ...rowB].map((t, i) => (
              <Card key={`b${i}`} t={t} />
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="container-x mt-12">
        <div className="flex flex-wrap items-center justify-center gap-3 rounded-2xl border border-line bg-card/40 px-6 py-5 text-center">
          <Pill tone="bull">Trust</Pill>
          <p className="text-sm text-muted">
            More than{' '}
            <span className="tnum font-bold text-fg">10,000 students</span> trust and study at
            Stock Fintech.
          </p>
        </div>
      </Reveal>
    </section>
  );
}
