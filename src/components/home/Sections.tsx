'use client';

import Link from 'next/link';
import { m } from 'framer-motion';
import { partners, whyUs, learningModel, studentExperience, stats, careerRoles } from '@/lib/site';
import { courses } from '@/lib/courses';
import { Icon } from '@/components/Icons';
import Counter from '@/components/Counter';
import {
  Reveal,
  StaggerGroup,
  StaggerItem,
  fadeUp,
  slideLeft,
  slideRight,
  hoverLift,
} from '@/components/motion';
import { SectionHeading, CourseCard, CheckItem } from '@/components/ui';

/* -------------------------------- Partners -------------------------------- */

export function Partners() {
  const doubled = [...partners, ...partners];
  return (
    <section className="border-b border-line py-10">
      <div className="container-x">
        <Reveal className="text-center">
          <p className="text-2xs font-semibold uppercase tracking-[0.2em] text-muted">
            Platforms &amp; bodies our curriculum is built around
          </p>
        </Reveal>
        <div className="mask-edges mt-7 overflow-hidden">
          <div className="flex w-max animate-marquee items-center gap-14 will-change-transform">
            {doubled.map((p, i) => (
              <span
                key={i}
                className="whitespace-nowrap font-display text-lg font-bold tracking-tight text-muted/50 transition-colors hover:text-fg"
              >
                {p}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* -------------------------------- Programs -------------------------------- */

export function Programs() {
  return (
    <section id="programs" className="container-x mt-24 scroll-mt-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Our core programs"
          title={
            <>
              What you can <span className="text-gradient">learn with us</span>
            </>
          }
          body="Four tracks, one teaching philosophy: understand the mechanism, apply it on a live chart, then manage the risk before you scale."
        />
        <Reveal delay={0.15}>
          <Link href="/courses/" className="btn-ghost group">
            Explore all courses
            <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </Reveal>
      </div>

      <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.09}>
        {courses.map((c, i) => (
          <CourseCard key={c.slug} course={c} index={i} />
        ))}
      </StaggerGroup>
    </section>
  );
}

/* --------------------------------- Why us --------------------------------- */

export function WhyUs() {
  return (
    <section className="container-x mt-28">
      <SectionHeading
        eyebrow="Why Stock Fintech"
        title={
          <>
            Why thousands choose <span className="text-gradient">Stock Fintech</span>
          </>
        }
        body="Most courses hand you indicators and wish you luck. We build the process around them — practice, measurement and risk control."
        align="center"
      />

      <StaggerGroup className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
        {whyUs.map((f) => {
          const Glyph = Icon[f.icon as keyof typeof Icon];
          return (
            <StaggerItem key={f.title}>
              <m.div
                {...hoverLift}
                className="group relative h-full overflow-hidden rounded-3xl border border-line bg-card/50 p-7 transition-colors duration-300 hover:border-bull/25"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute inset-x-0 -top-24 h-40 bg-gradient-to-b from-bull/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                />
                <span className="relative grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white/[0.04] text-bull">
                  <Glyph className="h-5 w-5" />
                </span>
                <h3 className="relative mt-5 text-lg font-bold leading-snug">{f.title}</h3>
                <p className="relative mt-2.5 text-sm leading-relaxed text-muted">{f.body}</p>
              </m.div>
            </StaggerItem>
          );
        })}
      </StaggerGroup>
    </section>
  );
}

/* ---------------------------- Learning + student --------------------------- */

export function LearningSplit() {
  return (
    <section id="learning-model" className="container-x mt-28 scroll-mt-28">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Learning experience */}
        <Reveal
          variants={slideRight}
          className="relative overflow-hidden rounded-[2rem] border border-line bg-card/50 p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-bull/10 blur-3xl"
          />
          <span className="eyebrow">
            <span className="h-px w-6 bg-bull/60" />
            Learning experience
          </span>
          <h2 className="relative mt-3 text-2xl font-bold leading-snug sm:text-3xl">
            A smarter way to learn the markets
          </h2>
          <p className="relative mt-3 text-sm leading-relaxed text-muted">
            Every batch runs on the same stack of tools, labs and support — whether you sit in
            the Lucknow classroom or join live online.
          </p>
          <StaggerGroup className="relative mt-7 space-y-3.5" gap={0.06}>
            {learningModel.map((l) => (
              <CheckItem key={l}>{l}</CheckItem>
            ))}
          </StaggerGroup>
        </Reveal>

        {/* Student experience */}
        <Reveal
          variants={slideLeft}
          id="student-experience"
          className="relative scroll-mt-28 overflow-hidden rounded-[2rem] border border-line bg-card/50 p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -left-20 -top-20 h-56 w-56 rounded-full bg-cyan/10 blur-3xl"
          />
          <span className="eyebrow text-cyan">
            <span className="h-px w-6 bg-cyan/60" />
            Student experience
          </span>
          <h2 className="relative mt-3 text-2xl font-bold leading-snug sm:text-3xl">
            Beyond classroom learning
          </h2>
          <p className="relative mt-3 text-sm leading-relaxed text-muted">
            The part most institutes skip: psychology, back-testing and an actual community to
            pressure-test your ideas against.
          </p>
          <StaggerGroup className="relative mt-7 space-y-3.5" gap={0.06}>
            {studentExperience.map((l) => (
              <CheckItem key={l}>{l}</CheckItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------- Stats band -------------------------------- */

export function StatsBand() {
  return (
    <section className="relative mt-28 overflow-hidden border-y border-line bg-surface/50 py-16">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.2]"
      />
      <div className="container-x relative">
        <StaggerGroup className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-4" gap={0.1}>
          {stats.map((s) => (
            <StaggerItem key={s.label} className="text-center">
              <p className="font-display text-4xl font-extrabold tracking-tight sm:text-5xl">
                <span className="text-gradient">
                  <Counter value={s.value} decimals={s.decimals} suffix={s.suffix} />
                </span>
              </p>
              <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-muted">
                {s.label}
              </p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

/* ----------------------------- Career outcomes ----------------------------- */

export function CareerOutcomes() {
  return (
    <section className="container-x mt-28">
      <SectionHeading
        eyebrow="Career outcomes"
        title={
          <>
            Learn skills that open <span className="text-gradient">career opportunities</span>
          </>
        }
        body="After completing a program at Stock Fintech, learners go on to explore roles across research, asset management and independent trading."
      />

      <StaggerGroup className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.06}>
        {careerRoles.map((r, i) => (
          <StaggerItem key={r.title}>
            <m.div
              {...hoverLift}
              className="group flex h-full gap-4 rounded-2xl border border-line bg-card/40 p-5 transition-colors hover:border-white/15"
            >
              <span className="tnum mt-0.5 font-display text-sm font-bold text-bull/60 transition-colors group-hover:text-bull">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <h3 className="text-base font-semibold leading-snug">{r.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.body}</p>
              </div>
            </m.div>
          </StaggerItem>
        ))}

        <StaggerItem>
          <Link
            href="/careers/"
            className="group flex h-full flex-col justify-between rounded-2xl border border-bull/25 bg-bull/[0.06] p-5 transition-colors hover:bg-bull/10"
          >
            <Icon.sparkle className="h-6 w-6 text-bull" />
            <div className="mt-6">
              <h3 className="text-base font-semibold">See the full career path</h3>
              <p className="mt-1.5 inline-flex items-center gap-1.5 text-sm font-semibold text-bull">
                Explore careers
                <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </p>
            </div>
          </Link>
        </StaggerItem>
      </StaggerGroup>
    </section>
  );
}
