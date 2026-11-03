import type { Metadata } from 'next';
import { careerRoles } from '@/lib/site';
import { pageMeta, breadcrumbLd } from '@/lib/seo';
import { PageHero, CTABand, SectionHeading } from '@/components/ui';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = pageMeta({
  title: 'Career Outcomes',
  description:
    'Roles Stock Fintech learners go on to explore — equity research analyst, investment research associate, valuation analyst, portfolio analyst, financial data analyst and independent trader.',
  path: '/careers/',
  keywords: [
    'career in stock market',
    'equity research analyst career',
    'finance career after NISM',
    'research analyst jobs India',
  ],
});

const path = [
  {
    step: 'Build the base',
    body: 'Market structure, technical and fundamental analysis. You learn to read a chart and a balance sheet with equal confidence.',
    icon: 'book' as const,
  },
  {
    step: 'Get certified',
    body: 'Clear the NISM series your target role asks for — Series XV for research, Series VIII for derivatives desks, V-A for distribution.',
    icon: 'certificate' as const,
  },
  {
    step: 'Prove it with work',
    body: 'Publish your own research notes, maintain a tracked model portfolio and keep a trade journal an employer can actually read.',
    icon: 'clipboard' as const,
  },
  {
    step: 'Apply with evidence',
    body: 'Walk into interviews with a certification, a portfolio of written analysis and a documented process — not just a course certificate.',
    icon: 'target' as const,
  },
];

export default function CareersPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Career Outcomes', path: '/careers/' },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="Career outcomes"
        title="Learn skills that open career opportunities"
        body="Market knowledge is a hireable skill, not just a personal one. After completing programs at Stock Fintech, learners explore roles across research, asset management, broking and independent trading."
      />

      {/* Roles */}
      <section className="container-x mt-16">
        <StaggerGroup className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3" gap={0.07}>
          {careerRoles.map((r, i) => (
            <StaggerItem key={r.title}>
              <div className="group flex h-full gap-4 rounded-2xl border border-line bg-card/40 p-6 transition-colors hover:border-bull/25">
                <span className="tnum mt-0.5 font-display text-sm font-bold text-bull/60 transition-colors group-hover:text-bull">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h2 className="text-base font-semibold leading-snug">{r.title}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{r.body}</p>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </section>

      {/* Path */}
      <section className="container-x mt-24">
        <SectionHeading
          eyebrow="The route"
          title={
            <>
              How learners actually <span className="text-gradient">get there</span>
            </>
          }
          body="There is no shortcut into a research seat, but the sequence is well worn and it is the same one we build our tracks around."
          align="center"
        />

        <StaggerGroup className="mt-14 grid gap-5 lg:grid-cols-4" gap={0.09}>
          {path.map((p, i) => {
            const Glyph = Icon[p.icon];
            return (
              <StaggerItem key={p.step} className="relative">
                <div className="h-full rounded-3xl border border-line bg-card/50 p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white/[0.04] text-bull">
                      <Glyph className="h-5 w-5" />
                    </span>
                    <span className="tnum font-display text-3xl font-extrabold text-white/[0.07]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <h3 className="mt-5 text-lg font-bold leading-snug">{p.step}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted">{p.body}</p>
                </div>
                {i < path.length - 1 && (
                  <Icon.arrowRight
                    className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-line lg:block"
                  />
                )}
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {/* Honest note */}
      <section className="container-x mt-24">
        <Reveal className="rounded-[2rem] border border-amber/20 bg-amber/[0.04] p-8 sm:p-10">
          <div className="flex gap-4">
            <Icon.shield className="mt-1 h-6 w-6 shrink-0 text-amber" />
            <div>
              <h2 className="text-xl font-bold">A straight answer on placements</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Stock Fintech does not guarantee a job, and we will not pretend otherwise. We are
                an education provider — we teach the analysis, prepare you for the certification
                and help you build a portfolio of work that stands up in an interview. The roles
                listed above are ones our learners have gone on to explore; they are outcomes
                that depend on your own effort, your existing qualifications and the market at
                the time you apply.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      <CTABand
        title="Start with the certification employers ask for"
        body="Series XV is the SEBI requirement for research analysts. Our track covers the full syllabus plus modelling, valuation and report writing."
        primary={{ label: 'View NISM Series XV', href: '/courses/nism-series-15/' }}
        secondary={{ label: 'Talk to a mentor', href: '/contact/' }}
      />
    </>
  );
}
