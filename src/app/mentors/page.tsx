import type { Metadata } from 'next';
import Link from 'next/link';
import { mentors } from '@/lib/site';
import { pageMeta, breadcrumbLd } from '@/lib/seo';
import { PageHero, CTABand, SectionHeading } from '@/components/ui';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = pageMeta({
  title: 'Mentors',
  description:
    'Meet the NSE & NISM certified mentors at Stock Fintech Lucknow. Practising traders who teach price action, options, risk management and NISM certification.',
  path: '/mentors/',
  keywords: ['stock market trainer Lucknow', 'NISM trainer', 'trading mentor India'],
});

const principles = [
  {
    icon: 'target' as const,
    title: 'They trade what they teach',
    body: 'Every mentor runs their own capital. A strategy that has not survived a real drawdown does not make it into the syllabus.',
  },
  {
    icon: 'clipboard' as const,
    title: 'They mark up live charts',
    body: 'Sessions during market hours are not demonstrations of yesterday. Mentors take the setup in front of them and talk through the decision in real time.',
  },
  {
    icon: 'pulse' as const,
    title: 'They review your trades',
    body: 'You submit your journal, they tell you which losses were process errors and which were simply the cost of doing business.',
  },
];

export default function MentorsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Mentors', path: '/mentors/' },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="Our mentors"
        title="Taught by people who still have money on the line"
        body="Our mentors are NSE & NISM certified professionals with years of hands-on trading and teaching experience. They focus on discipline, risk management and real-world decision-making — not shortcuts."
      />

      <section className="container-x mt-16">
        <StaggerGroup className="grid gap-6 lg:grid-cols-2" gap={0.1}>
          {mentors.map((mentor) => (
            <StaggerItem key={mentor.slug}>
              <Link
                href={`/mentors/${mentor.slug}/`}
                className="group relative flex h-full flex-col overflow-hidden rounded-[2rem] border border-line bg-card/50 p-8 transition-colors hover:border-bull/30"
              >
                <div
                  aria-hidden
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-bull/10 blur-3xl"
                />
                <div className="relative flex flex-wrap items-center gap-5">
                  <span className="grid h-20 w-20 shrink-0 place-items-center rounded-3xl bg-gradient-to-br from-bull to-cyan font-display text-2xl font-extrabold text-ink">
                    {mentor.initials}
                  </span>
                  <div className="min-w-0">
                    <h2 className="text-2xl font-bold leading-tight transition-colors group-hover:text-bull">
                      {mentor.name}
                    </h2>
                    <p className="mt-1 text-sm font-semibold text-bull">{mentor.role}</p>
                    <p className="mt-1.5 text-2xs uppercase tracking-[0.12em] text-muted">
                      {mentor.credentials}
                    </p>
                  </div>
                </div>

                <p className="relative mt-6 text-sm leading-relaxed text-muted">{mentor.bio}</p>

                {mentor.specialities.length > 0 && (
                  <div className="relative mt-6">
                    <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-muted">
                      Teaches
                    </p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {mentor.specialities.map((s) => (
                        <span
                          key={s}
                          className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-fg/80"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <span className="relative mt-auto flex items-center gap-2 pt-7 text-sm font-semibold text-bull">
                  View profile
                  <Icon.arrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      <section className="container-x mt-24">
        <SectionHeading
          eyebrow="How we teach"
          title={
            <>
              Three things every mentor <span className="text-gradient">commits to</span>
            </>
          }
          align="center"
        />
        <StaggerGroup className="mt-12 grid gap-5 lg:grid-cols-3" gap={0.08}>
          {principles.map((p) => {
            const Glyph = Icon[p.icon];
            return (
              <StaggerItem
                key={p.title}
                className="rounded-3xl border border-line bg-card/40 p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white/[0.04] text-bull">
                  <Glyph className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug">{p.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <section className="container-x mt-24">
        <Reveal className="rounded-[2rem] border border-cyan/20 bg-cyan/[0.04] p-8 text-center sm:p-12">
          <Icon.users className="mx-auto h-8 w-8 text-cyan" />
          <h2 className="mt-5 text-2xl font-bold sm:text-3xl">Want to teach with us?</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-muted">
            We are always open to NISM-certified practitioners who can teach. If you trade
            professionally and can explain why, we would like to hear from you.
          </p>
          <a href="mailto:contact@mystockfintech.com?subject=Mentor%20application" className="btn-ghost mt-7">
            <Icon.mail className="h-4 w-4" />
            Send us your profile
          </a>
        </Reveal>
      </section>

      <CTABand
        title="Learn directly from the desk"
        body="Book a free demo class and meet the mentor who would be teaching your batch before you commit to anything."
      />
    </>
  );
}
