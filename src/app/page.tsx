import type { Metadata } from 'next';
import { faqs } from '@/lib/site';
import { faqLd, courseListLd, pageMeta } from '@/lib/seo';
import TickerTape from '@/components/TickerTape';
import Hero from '@/components/home/Hero';
import {
  Partners,
  Programs,
  WhyUs,
  LearningSplit,
  StatsBand,
  CareerOutcomes,
} from '@/components/home/Sections';
import { Mentors, Testimonials } from '@/components/home/Social';
import NewsFeed from '@/components/NewsFeed';
import { news, newsFetchedAt, formatFetchedAt } from '@/lib/news';
import { SectionHeading, Accordion, CTABand } from '@/components/ui';
import Link from 'next/link';
import { Icon } from '@/components/Icons';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = pageMeta({
  title: 'Stock Fintech — Stock Market, NISM, Forex & Crypto Training in Lucknow',
  description:
    'Learn stock market trading, NISM certification (Series V-A, V-B, VIII, XV), Forex and Crypto at Stock Fintech Lucknow. Live market sessions, NSE & NISM certified mentors, classroom and online batches in English & Hindi.',
  path: '/',
});

export default function HomePage() {
  const updated = formatFetchedAt(newsFetchedAt);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqLd, courseListLd]) }}
      />

      <Hero />
      <TickerTape />
      <Partners />
      <Programs />
      <WhyUs />
      <LearningSplit />
      <StatsBand />
      <CareerOutcomes />
      <Mentors />
      <Testimonials />

      <section className="container-x mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHeading
            eyebrow="Market news"
            title={
              <>
                Today&rsquo;s market, <span className="text-gradient">decoded daily</span>
              </>
            }
            body="Headlines from across the Indian market, refreshed every day. We link straight to the publisher — nothing here is a recommendation."
          />
          <Reveal delay={0.15} className="flex flex-col items-start gap-3">
            {updated && (
              <span className="inline-flex items-center gap-2 text-2xs text-muted">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-bull" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bull" />
                </span>
                Updated {updated} IST
              </span>
            )}
            <Link href="/news/" className="btn-ghost group">
              All headlines
              <Icon.arrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          </Reveal>
        </div>

        <div className="mt-12">
          <NewsFeed items={news.slice(0, 6)} />
        </div>
      </section>

      <section id="faq" className="container-x mt-28 scroll-mt-28">
        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">
          <SectionHeading
            eyebrow="FAQ"
            title={
              <>
                Questions, <span className="text-gradient">answered</span>
              </>
            }
            body="Still unsure about something? Call us on +91 895 395 2666 or book a free demo class and ask in person."
          />
          <Accordion items={[...faqs]} />
        </div>
      </section>

      <CTABand />
    </>
  );
}
