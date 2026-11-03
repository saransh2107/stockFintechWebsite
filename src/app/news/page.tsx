import type { Metadata } from 'next';
import { news, newsFetchedAt, formatFetchedAt } from '@/lib/news';
import { pageMeta, breadcrumbLd } from '@/lib/seo';
import { site } from '@/lib/site';
import { PageHero, CTABand } from '@/components/ui';
import { Reveal } from '@/components/motion';
import NewsFeed from '@/components/NewsFeed';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = pageMeta({
  title: 'Market News',
  description:
    'Daily Indian stock market headlines curated by Stock Fintech — Sensex and Nifty moves, results, IPOs, mutual funds and personal finance, gathered from Economic Times, LiveMint and Hindu BusinessLine.',
  path: '/news/',
  keywords: [
    'Indian stock market news',
    'Sensex Nifty news today',
    'share market news India',
    'market headlines',
  ],
});

export default function NewsPage() {
  const updated = formatFetchedAt(newsFetchedAt);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Market News', path: '/news/' },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: 'Market News',
              url: `${site.url}/news/`,
              description:
                'Daily Indian stock market headlines curated by Stock Fintech.',
              dateModified: newsFetchedAt,
              isPartOf: { '@id': `${site.url}/#website` },
            },
          ]),
        }}
      />

      <PageHero
        eyebrow="Market news"
        title="Today's market, in one place"
        body="Headlines from across the Indian market — index moves, results, IPOs, mutual funds and personal finance. We link straight to the publisher; nothing here is a recommendation."
      >
        {updated && (
          <Reveal delay={0.1} className="mt-6">
            <span className="inline-flex items-center gap-2 rounded-full border border-line bg-card/50 px-3.5 py-1.5 text-2xs text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-pulse-ring rounded-full bg-bull" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-bull" />
              </span>
              Last updated {updated} IST
            </span>
          </Reveal>
        )}
      </PageHero>

      <section className="container-x mt-14">
        <NewsFeed items={news} />
      </section>

      <section className="container-x mt-14">
        <Reveal className="rounded-2xl border border-amber/20 bg-amber/[0.04] p-5">
          <div className="flex gap-3">
            <Icon.shield className="mt-0.5 h-4 w-4 shrink-0 text-amber" />
            <p className="text-xs leading-relaxed text-muted">
              <span className="font-semibold text-fg">Note:</span> headlines are aggregated
              from third-party publishers and link back to them. Stock Fintech does not write,
              endorse or verify this coverage, and none of it is investment advice or a
              recommendation to buy or sell any security.
            </p>
          </div>
        </Reveal>
      </section>

      <CTABand
        title="Understand the news, don't just read it"
        body="Our weekly market outlook breaks down what actually moved and why — and the courses teach you to do that analysis yourself."
        primary={{ label: 'Book a free demo', href: '/contact/' }}
        secondary={{ label: 'Browse courses', href: '/courses/' }}
      />
    </>
  );
}
