import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { courses, courseBySlug } from '@/lib/courses';
import { contact } from '@/lib/site';
import { pageMeta, courseLd, breadcrumbLd } from '@/lib/seo';
import { Icon } from '@/components/Icons';
import { Reveal, StaggerGroup, StaggerItem, slideRight } from '@/components/motion';
import { CTABand, CheckItem, Pill, SectionHeading } from '@/components/ui';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) return pageMeta({ title: 'Course not found', description: '', noIndex: true });

  return pageMeta({
    title: course.title,
    description: `${course.summary} ${course.duration}, ${course.mode}, taught in ${course.language} at Stock Fintech Lucknow.`,
    path: `/courses/${course.slug}/`,
    keywords: [course.shortTitle, ...course.outcomes.slice(0, 3)],
  });
}

const accentText: Record<string, string> = {
  mint: 'text-bull',
  cyan: 'text-cyan',
  violet: 'text-violet',
  amber: 'text-amber',
};

export default async function CoursePage({ params }: Props) {
  const { slug } = await params;
  const course = courseBySlug(slug);
  if (!course) notFound();

  const Glyph = Icon[course.icon];
  const others = courses.filter((c) => c.slug !== course.slug);
  const save = course.mrp ? course.mrp - course.price : 0;
  const savePct = course.mrp ? Math.round((save / course.mrp) * 100) : 0;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            courseLd(course),
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Courses', path: '/courses/' },
              { name: course.shortTitle, path: `/courses/${course.slug}/` },
            ]),
          ]),
        }}
      />

      {/* Hero */}
      <section className="glow relative overflow-hidden border-b border-line pb-16 pt-14 sm:pt-18">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-grid-fade bg-grid opacity-[0.22]"
        />
        <div className="container-x relative grid gap-12 lg:grid-cols-[1.25fr_0.75fr]">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-2 text-xs text-muted">
              <Link href="/" className="hover:text-bull">
                Home
              </Link>
              <span>/</span>
              <Link href="/courses/" className="hover:text-bull">
                Courses
              </Link>
              <span>/</span>
              <span className="text-fg">{course.shortTitle}</span>
            </nav>

            <div className="flex items-center gap-3">
              <span
                className={`grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white/[0.04] ${accentText[course.accent]}`}
              >
                <Glyph className="h-6 w-6" />
              </span>
              {course.featured && <Pill tone="bull">Most popular</Pill>}
              <Pill tone="muted">{course.level}</Pill>
            </div>

            <h1 className="mt-5 max-w-3xl text-3xl font-extrabold leading-[1.12] sm:text-4xl lg:text-[2.9rem]">
              {course.title}
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
              {course.description}
            </p>

            <dl className="mt-8 grid max-w-xl grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
              {[
                { k: 'Duration', v: course.duration, i: 'clock' as const },
                { k: 'Mode', v: course.mode, i: 'layers' as const },
                { k: 'Language', v: course.language, i: 'users' as const },
                { k: 'Level', v: course.level, i: 'target' as const },
              ].map((m) => {
                const MGlyph = Icon[m.i];
                return (
                  <div key={m.k}>
                    <dt className="flex items-center gap-1.5 text-2xs uppercase tracking-[0.12em] text-muted">
                      <MGlyph className="h-3.5 w-3.5" />
                      {m.k}
                    </dt>
                    <dd className="mt-1.5 text-sm font-semibold leading-snug text-fg">{m.v}</dd>
                  </div>
                );
              })}
            </dl>
          </Reveal>

          {/* Enrolment card */}
          <Reveal variants={slideRight} className="lg:pt-12">
            <div className="sticky top-24 rounded-3xl border border-line bg-card/70 p-6 backdrop-blur-xl">
              <div className="flex items-end gap-3">
                <span className="tnum font-display text-3xl font-extrabold text-fg">
                  ₹{course.price.toLocaleString('en-IN')}
                </span>
                {save > 0 && (
                  <span className="tnum pb-1 text-sm text-muted line-through">
                    ₹{course.mrp!.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-bull/10 px-2.5 py-1 text-2xs font-bold text-bull">
                {save > 0
                  ? `Save ₹${save.toLocaleString('en-IN')} (${savePct}% off)`
                  : `Or 3 instalments of ₹${Math.ceil(course.price / 3).toLocaleString('en-IN')}`}
              </p>

              <ul className="mt-6 space-y-3">
                {course.highlights.map((h) => (
                  <li key={h} className="flex items-start gap-2.5 text-sm text-muted">
                    <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                    {h}
                  </li>
                ))}
              </ul>

              <Link href="/contact/" className="btn-primary mt-7 w-full">
                Book a free demo
              </Link>
              <a
                href={contact.whatsapp.href}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost mt-2.5 w-full"
              >
                <Icon.whatsapp className="h-4 w-4 text-[#25D366]" />
                Ask on WhatsApp
              </a>

              <p className="mt-5 flex items-center justify-center gap-1.5 border-t border-line pt-5 text-2xs text-muted">
                <Icon.phone className="h-3.5 w-3.5" />
                Or call{' '}
                <a href={contact.phones[0].href} className="tnum font-semibold text-fg">
                  {contact.phones[0].label}
                </a>
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Curriculum */}
      <section className="container-x mt-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionHeading
              eyebrow="Curriculum"
              title={
                <>
                  What you will <span className="text-gradient">cover</span>
                </>
              }
              body={`${course.modules.length} modules, each taught then applied. Nothing moves forward until the previous idea works on a chart.`}
            />
          </div>

          <StaggerGroup className="space-y-4" gap={0.07}>
            {course.modules.map((m, i) => (
              <StaggerItem
                key={m.title}
                className="rounded-2xl border border-line bg-card/40 p-6"
              >
                <div className="flex items-baseline gap-3">
                  <span className="tnum font-display text-sm font-bold text-bull/60">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold leading-snug">{m.title}</h3>
                </div>
                <ul className="mt-4 grid gap-2.5 sm:grid-cols-2">
                  {m.lessons.map((l) => (
                    <li key={l} className="flex items-start gap-2.5 text-sm text-muted">
                      <span className="mt-[0.45rem] h-1 w-1 shrink-0 rounded-full bg-bull/60" />
                      {l}
                    </li>
                  ))}
                </ul>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* Outcomes + audience */}
      <section className="container-x mt-24 grid gap-6 lg:grid-cols-2">
        <Reveal className="rounded-[2rem] border border-line bg-card/50 p-8 sm:p-10">
          <span className="eyebrow">
            <span className="h-px w-6 bg-bull/60" />
            Outcomes
          </span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">By the end, you can</h2>
          <StaggerGroup className="mt-7 space-y-3.5" gap={0.06}>
            {course.outcomes.map((o) => (
              <CheckItem key={o}>{o}</CheckItem>
            ))}
          </StaggerGroup>
        </Reveal>

        <Reveal className="rounded-[2rem] border border-line bg-card/50 p-8 sm:p-10">
          <span className="eyebrow text-cyan">
            <span className="h-px w-6 bg-cyan/60" />
            Who it is for
          </span>
          <h2 className="mt-3 text-2xl font-bold sm:text-3xl">This track suits</h2>
          <StaggerGroup className="mt-7 space-y-3.5" gap={0.06}>
            {course.audience.map((a) => (
              <CheckItem key={a}>{a}</CheckItem>
            ))}
          </StaggerGroup>
        </Reveal>
      </section>

      {/* Other courses */}
      <section className="container-x mt-24">
        <SectionHeading eyebrow="Keep exploring" title="Other programs" />
        <StaggerGroup className="mt-10 grid gap-4 sm:grid-cols-3" gap={0.08}>
          {others.map((o) => (
            <StaggerItem key={o.slug}>
              <Link
                href={`/courses/${o.slug}/`}
                className="group flex h-full flex-col rounded-2xl border border-line bg-card/40 p-6 transition-colors hover:border-white/15"
              >
                <h3 className="text-base font-bold">{o.shortTitle}</h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{o.tagline}</p>
                <span
                  className={`mt-5 inline-flex items-center gap-1.5 text-sm font-semibold ${accentText[o.accent]}`}
                >
                  View course
                  <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <CTABand
        title={`Sit in on a ${course.shortTitle} session before you pay`}
        body="Free demo class, no obligation. Watch how a live market analysis class actually runs, meet the mentor and decide after."
      />
    </>
  );
}
