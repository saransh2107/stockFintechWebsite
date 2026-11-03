import type { Metadata } from 'next';
import { faqs, contact } from '@/lib/site';
import { pageMeta, faqLd, breadcrumbLd } from '@/lib/seo';
import { PageHero, SectionHeading, Accordion, CTABand } from '@/components/ui';
import { LearningSplit, WhyUs, StatsBand } from '@/components/home/Sections';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = pageMeta({
  title: 'About Us',
  description:
    'Stock Fintech is a Lucknow-based market education institute teaching stock trading, NISM certification, Forex and Crypto. Meet the philosophy, the learning model and the people behind it.',
  path: '/about/',
  keywords: ['stock market institute Lucknow', 'about Stock Fintech', 'trading academy Lucknow'],
});

const timeline = [
  {
    year: '2019',
    title: 'A classroom in Ashiyana',
    body: 'Stock Fintech opens with a single batch and one belief: you cannot learn to trade from slides alone.',
  },
  {
    year: '2021',
    title: 'NISM certification track added',
    body: 'Demand from distributors and aspiring analysts leads to a dedicated exam-prep track with mock tests and question banks.',
  },
  {
    year: '2023',
    title: 'Hybrid batches go live',
    body: 'The same classroom session streams live online, so students outside Lucknow join the identical batch.',
  },
  {
    year: '2025',
    title: '10,000 students and counting',
    body: 'Forex, Crypto and private mentorship round out the curriculum, with a research desk publishing a weekly outlook.',
  },
];

const values = [
  {
    icon: 'shield' as const,
    title: 'Education, not tips',
    body: 'We never sell calls, assured returns or signals. We teach you to form your own view and size it responsibly.',
  },
  {
    icon: 'pulse' as const,
    title: 'Risk comes first',
    body: 'Position sizing and drawdown maths are taught in week one, not as an afterthought in the last module.',
  },
  {
    icon: 'users' as const,
    title: 'Taught by practitioners',
    body: 'Every mentor trades their own capital. If a concept does not survive a live market, it does not get taught.',
  },
  {
    icon: 'book' as const,
    title: 'Bilingual by design',
    body: 'Sessions run in English and Hindi so terminology stays precise while the explanation stays clear.',
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            faqLd,
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'About Us', path: '/about/' },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="About us"
        title="A market education institute that refuses to sell shortcuts"
        body="Stock Fintech started in 2019 with one classroom in Ashiyana, Lucknow. The method has not changed since: understand the mechanism, apply it on a live chart, measure the result, then manage the risk before you scale."
      />

      {/* Values */}
      <section className="container-x mt-20">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" gap={0.08}>
          {values.map((v) => {
            const Glyph = Icon[v.icon];
            return (
              <StaggerItem
                key={v.title}
                className="rounded-3xl border border-line bg-card/50 p-7"
              >
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-line bg-white/[0.04] text-bull">
                  <Glyph className="h-5 w-5" />
                </span>
                <h3 className="mt-5 text-lg font-bold leading-snug">{v.title}</h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">{v.body}</p>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      <StatsBand />

      {/* Timeline */}
      <section className="container-x mt-24">
        <SectionHeading
          eyebrow="Our story"
          title={
            <>
              From one classroom to <span className="text-gradient">10,000 students</span>
            </>
          }
          align="center"
        />

        <StaggerGroup className="relative mx-auto mt-14 max-w-3xl" gap={0.1}>
          <div
            aria-hidden
            className="absolute left-[7.5rem] top-2 hidden h-[calc(100%-1rem)] w-px bg-gradient-to-b from-bull/50 via-line to-transparent sm:block"
          />
          <div className="space-y-8">
            {timeline.map((t) => (
              <StaggerItem key={t.year} className="flex flex-col gap-3 sm:flex-row sm:gap-8">
                <div className="flex shrink-0 items-center gap-4 sm:w-28 sm:justify-end">
                  <span className="tnum font-display text-xl font-extrabold text-gradient">
                    {t.year}
                  </span>
                </div>
                <span
                  aria-hidden
                  className="relative hidden h-3 w-3 shrink-0 translate-y-2 rounded-full border-2 border-bull bg-ink sm:block"
                  style={{ marginLeft: '-1.4rem' }}
                />
                <div className="sm:pl-2">
                  <h3 className="text-lg font-bold">{t.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{t.body}</p>
                </div>
              </StaggerItem>
            ))}
          </div>
        </StaggerGroup>
      </section>

      <WhyUs />
      <LearningSplit />

      {/* Visit us */}
      <section className="container-x mt-24">
        <Reveal className="grid gap-8 rounded-[2rem] border border-line bg-card/50 p-8 sm:p-10 lg:grid-cols-2">
          <div>
            <span className="eyebrow">
              <span className="h-px w-6 bg-bull/60" />
              Visit the centre
            </span>
            <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
              Come and sit in on a live session
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              The fastest way to judge a market course is to watch one run. Walk in during market
              hours, take a seat at the back, and see whether the teaching holds up.
            </p>
            <ul className="mt-6 space-y-3.5 text-sm">
              <li className="flex gap-3">
                <Icon.pin className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                <span className="text-muted">{contact.address.full}</span>
              </li>
              <li className="flex gap-3">
                <Icon.clock className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                <span className="text-muted">{contact.hours}</span>
              </li>
              <li className="flex gap-3">
                <Icon.phone className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                <span className="flex flex-wrap gap-x-4">
                  {contact.phones.map((p) => (
                    <a key={p.href} href={p.href} className="tnum text-muted hover:text-bull">
                      {p.label}
                    </a>
                  ))}
                </span>
              </li>
            </ul>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line">
            <iframe
              title="Stock Fintech location on Google Maps"
              src="https://www.google.com/maps?q=Power%20House%20Chauraha%20Ashiyana%20Lucknow&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="h-full min-h-[280px] w-full grayscale-[0.4] contrast-[1.1]"
            />
          </div>
        </Reveal>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-x mt-24 scroll-mt-28">
        <SectionHeading
          eyebrow="FAQ"
          title={
            <>
              Questions, <span className="text-gradient">answered</span>
            </>
          }
          align="center"
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={[...faqs]} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
