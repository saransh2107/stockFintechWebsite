import type { Metadata } from 'next';
import { courses } from '@/lib/courses';
import { pageMeta, courseListLd, breadcrumbLd } from '@/lib/seo';
import { StaggerGroup } from '@/components/motion';
import { CourseCard, PageHero, CTABand, SectionHeading } from '@/components/ui';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = pageMeta({
  title: 'Courses — Stock Market, NISM, Forex & Crypto',
  description:
    'Browse every Stock Fintech program: the Ultimate Traders Program, NISM certification for Series V-A, V-B, VIII and XV, Forex & Crypto trading, and one-on-one mentorship. Classroom in Lucknow or live online.',
  path: '/courses/',
  keywords: [
    'stock market course',
    'NISM certification course',
    'forex trading course India',
    'crypto trading course',
    'trading mentorship',
  ],
});

/* Column order must match the `courses` array: Indian, VIII, XV, Forex, Mentorship. */
const compare = [
  { label: 'Live market analysis classes', values: [true, false, false, true, true] },
  { label: 'Recorded access for life', values: [true, true, true, true, true] },
  { label: 'Mock tests & question bank', values: [false, true, true, false, false] },
  { label: 'Options & derivatives', values: [true, true, false, false, true] },
  { label: 'Valuation & research notes', values: [false, false, true, false, false] },
  { label: 'Personal portfolio review', values: [true, false, false, false, true] },
  { label: 'One-on-one sessions', values: [false, false, false, false, true] },
];

export default function CoursesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            courseListLd,
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Courses', path: '/courses/' },
            ]),
          ]),
        }}
      />

      <PageHero
        eyebrow="Programs"
        title="Courses built for the market you actually trade"
        body="Four tracks covering Indian equities and derivatives, NISM certification, global currency and digital assets, and private mentorship. Every one of them is taught bilingually and applied on live charts."
      />

      <section className="container-x mt-16">
        <StaggerGroup className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3" gap={0.09}>
          {courses.map((c, i) => (
            <CourseCard key={c.slug} course={c} index={i} />
          ))}
        </StaggerGroup>
      </section>

      {/* Comparison */}
      <section className="container-x mt-24">
        <SectionHeading
          eyebrow="Compare"
          title={
            <>
              Which track is <span className="text-gradient">right for you?</span>
            </>
          }
          body="If you are starting from zero, the Ultimate Traders Program is the default answer. Everything else is a specialisation on top of it."
          align="center"
        />

        <div className="mt-12 overflow-x-auto rounded-3xl border border-line bg-card/40">
          <table className="w-full min-w-[820px] border-collapse text-sm">
            <caption className="sr-only">Feature comparison across Stock Fintech programs</caption>
            <thead>
              <tr className="border-b border-line">
                <th scope="col" className="p-5 text-left text-xs font-semibold uppercase tracking-[0.12em] text-muted">
                  Included
                </th>
                {courses.map((c) => (
                  <th
                    key={c.slug}
                    scope="col"
                    className="p-5 text-left text-sm font-bold text-fg"
                  >
                    {c.shortTitle}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.map((row) => (
                <tr key={row.label} className="border-b border-line last:border-0">
                  <th scope="row" className="p-5 text-left font-medium text-muted">
                    {row.label}
                  </th>
                  {row.values.map((v, i) => (
                    <td key={i} className="p-5">
                      {v ? (
                        <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-bull/15 text-bull">
                          <Icon.check className="h-3.5 w-3.5" />
                        </span>
                      ) : (
                        <span className="inline-grid h-6 w-6 place-items-center rounded-full bg-white/[0.04] text-muted/50">
                          <Icon.close className="h-3 w-3" />
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <th scope="row" className="p-5 text-left font-medium text-muted">
                  Fee
                </th>
                {courses.map((c) => (
                  <td key={c.slug} className="tnum p-5 font-bold text-fg">
                    ₹{c.price.toLocaleString('en-IN')}
                  </td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <CTABand
        title="Not sure which one to pick?"
        body="Tell us where you are now and what you want to do with the markets. We will point you at the right track — even if that means a cheaper one."
        primary={{ label: 'Talk to a mentor', href: '/contact/' }}
        secondary={{ label: 'See pricing', href: '/pricing/' }}
      />
    </>
  );
}
