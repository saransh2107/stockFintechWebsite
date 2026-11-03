import type { Metadata } from 'next';
import Link from 'next/link';
import { courses } from '@/lib/courses';
import { pageMeta, breadcrumbLd } from '@/lib/seo';
import { PageHero, CTABand, SectionHeading, Accordion, Pill } from '@/components/ui';
import { StaggerGroup, StaggerItem, Reveal } from '@/components/motion';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = pageMeta({
  title: 'Pricing & Plans',
  description:
    'Transparent course fees for every Stock Fintech program — the Ultimate Traders Program, NISM certification, Forex & Crypto, and one-on-one mentorship. EMI available, no hidden charges.',
  path: '/pricing/',
  keywords: ['stock market course fees', 'NISM course price', 'trading course cost Lucknow'],
});

const included = [
  'Lifetime access to recorded sessions',
  'Printed and digital study material',
  'Chapter-wise question banks',
  'Weekly market outlook from the research desk',
  'Alumni community and discussion group',
  'Doubt-resolution support throughout',
];

const pricingFaqs = [
  {
    q: 'Is there an EMI or instalment option?',
    a: 'Yes. All programs above ₹10,000 can be split into 3 interest-free instalments paid monthly. Standard card EMI through your bank is also accepted at checkout.',
  },
  {
    q: 'Are there any hidden charges?',
    a: 'No. The fee shown covers tuition, study material, question banks, mock tests and lifetime recording access. The only cost not included is the official NISM exam fee, which you pay directly to NISM.',
  },
  {
    q: 'Do you offer student or group discounts?',
    a: 'Yes. Full-time students with a valid ID get 10% off, and groups of three or more enrolling together get 15% off. These cannot be combined with the launch code.',
  },
  {
    q: 'What is your refund policy?',
    a: 'If you attend the first two sessions of a batch and decide it is not for you, write to us within 7 days of the batch start date for a full refund minus payment-gateway charges. See the Refund Policy page for details.',
  },
  {
    q: 'Can I upgrade from one program to another?',
    a: 'Yes. If you start with a single track and later want the full Ultimate Traders Program, we adjust what you already paid against the higher fee within 6 months of your original enrolment.',
  },
];

export default function PricingPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Pricing', path: '/pricing/' },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: pricingFaqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
          ]),
        }}
      />

      <PageHero
        eyebrow="Pricing"
        title="One fee, everything included"
        body="No upsells, no locked modules and no separate charge for the recordings. Pick the track that matches where you are, and the fee below is what you pay."
      >
        <Reveal delay={0.1} className="mt-8 flex flex-wrap gap-3">
          <Pill tone="bull">20% off with code FINTECH</Pill>
          <Pill tone="cyan">3-month EMI available</Pill>
          <Pill tone="muted">7-day refund window</Pill>
        </Reveal>
      </PageHero>

      {/* Plan cards */}
      <section className="container-x mt-16">
        <StaggerGroup className="grid gap-5 lg:grid-cols-2" gap={0.09}>
          {courses.map((c) => {
            const Glyph = Icon[c.icon];
            const save = c.mrp ? c.mrp - c.price : 0;
            return (
              <StaggerItem key={c.slug}>
                <div
                  className={`relative flex h-full flex-col overflow-hidden rounded-[2rem] border p-8 ${
                    c.featured
                      ? 'border-bull/35 bg-bull/[0.05]'
                      : 'border-line bg-card/50'
                  }`}
                >
                  {c.featured && (
                    <span className="absolute right-7 top-7">
                      <Pill tone="bull">Most popular</Pill>
                    </span>
                  )}

                  <span className="grid h-12 w-12 place-items-center rounded-2xl border border-line bg-white/[0.04] text-bull">
                    <Glyph className="h-6 w-6" />
                  </span>

                  <h2 className="mt-5 text-xl font-bold leading-snug">{c.shortTitle}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{c.summary}</p>

                  <div className="mt-7 flex items-end gap-3">
                    <span className="tnum font-display text-4xl font-extrabold">
                      ₹{c.price.toLocaleString('en-IN')}
                    </span>
                    {save > 0 && (
                      <span className="tnum pb-1.5 text-sm text-muted line-through">
                        ₹{c.mrp!.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <p className="tnum mt-2 text-xs text-bull">
                    {save > 0 ? `Save ₹${save.toLocaleString('en-IN')} · ` : ''}3 × ₹
                    {Math.ceil(c.price / 3).toLocaleString('en-IN')} interest-free EMI
                  </p>

                  <ul className="mt-7 flex-1 space-y-3">
                    {c.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2.5 text-sm text-muted">
                        <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                        {h}
                      </li>
                    ))}
                    <li className="flex items-start gap-2.5 text-sm text-muted">
                      <Icon.clock className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                      {c.duration} · {c.mode}
                    </li>
                  </ul>

                  <div className="mt-8 flex gap-3">
                    <Link
                      href="/contact/"
                      className={c.featured ? 'btn-primary flex-1' : 'btn-ghost flex-1'}
                    >
                      Enrol now
                    </Link>
                    <Link href={`/courses/${c.slug}/`} className="btn-ghost">
                      Syllabus
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </section>

      {/* Included in every plan */}
      <section className="container-x mt-20">
        <Reveal className="rounded-[2rem] border border-line bg-card/40 p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <span className="eyebrow">
                <span className="h-px w-6 bg-bull/60" />
                Always included
              </span>
              <h2 className="mt-3 text-2xl font-bold sm:text-3xl">
                Every fee covers the same base
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                Whichever track you choose, these come with it at no extra cost.
              </p>
            </div>
            <ul className="grid gap-3.5 sm:grid-cols-2">
              {included.map((i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-muted">
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-bull/15 text-bull">
                    <Icon.check className="h-3 w-3" />
                  </span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </section>

      {/* Pricing FAQ */}
      <section className="container-x mt-24">
        <SectionHeading
          eyebrow="Billing FAQ"
          title={
            <>
              Fees, EMI and <span className="text-gradient">refunds</span>
            </>
          }
          align="center"
        />
        <div className="mx-auto mt-12 max-w-3xl">
          <Accordion items={pricingFaqs} />
        </div>
      </section>

      <CTABand
        title="Still weighing it up?"
        body="Attend a free demo class first. If the teaching does not convince you, you have lost nothing but an hour."
        primary={{ label: 'Book a free demo', href: '/contact/' }}
        secondary={{ label: 'Compare courses', href: '/courses/' }}
      />
    </>
  );
}
