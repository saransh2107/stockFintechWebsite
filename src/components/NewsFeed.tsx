'use client';

import { m } from 'framer-motion';
import { type NewsItem, formatNewsDate } from '@/lib/news';
import { Icon } from './Icons';
import { StaggerGroup, StaggerItem, hoverLift } from './motion';

/**
 * Aggregated market headlines.
 *
 * Headline, short snippet and an outbound link only — we never republish
 * article bodies. Links carry `nofollow` because these are aggregated third
 * party URLs, not editorial endorsements, and `noopener` for the usual
 * `window.opener` reason.
 */

const sourceTone: Record<string, string> = {
  'Economic Times': 'text-cyan',
  'ET Wealth': 'text-violet',
  'ET Mutual Funds': 'text-magenta',
  LiveMint: 'text-amber',
  'Hindu BusinessLine': 'text-bull',
};

export function NewsCard({ item }: { item: NewsItem }) {
  const when = formatNewsDate(item.publishedAt);
  return (
    <m.a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer nofollow"
      {...hoverLift}
      className="group flex h-full flex-col rounded-2xl border border-line bg-card/50 p-5 transition-colors hover:border-brand/30"
    >
      <div className="flex items-center justify-between gap-3">
        <span
          className={`text-2xs font-semibold uppercase tracking-[0.12em] ${
            sourceTone[item.source] ?? 'text-brand'
          }`}
        >
          {item.source}
        </span>
        {when && <time className="tnum text-2xs text-muted">{when}</time>}
      </div>

      <h3 className="mt-3 text-[0.95rem] font-semibold leading-snug text-fg">{item.title}</h3>

      {item.snippet && (
        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-muted">
          {item.snippet}
        </p>
      )}

      <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-brand">
        Read at source
        <Icon.arrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
      </span>
    </m.a>
  );
}

export default function NewsFeed({
  items,
  columns = 3,
}: {
  items: NewsItem[];
  columns?: 2 | 3;
}) {
  if (!items.length) {
    return (
      <p className="rounded-2xl border border-line bg-card/40 p-6 text-sm text-muted">
        Headlines could not be loaded for this build. They refresh on the next daily rebuild.
      </p>
    );
  }

  return (
    <StaggerGroup
      className={`grid gap-4 sm:grid-cols-2 ${columns === 3 ? 'lg:grid-cols-3' : ''}`}
      gap={0.06}
    >
      {items.map((item) => (
        <StaggerItem key={item.link}>
          <NewsCard item={item} />
        </StaggerItem>
      ))}
    </StaggerGroup>
  );
}
