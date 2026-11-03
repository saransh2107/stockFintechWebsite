import raw from '@/data/news.json';

export type NewsItem = {
  title: string;
  link: string;
  source: string;
  snippet: string;
  publishedAt: string | null;
};

export type NewsData = { fetchedAt: string; items: NewsItem[] };

const data = raw as NewsData;

export const news = data.items;
export const newsFetchedAt = data.fetchedAt;

/**
 * Formatted in IST with an explicit locale and time zone so the server and
 * the browser always produce the same string — a relative "2 hours ago" would
 * differ between render and hydration.
 */
export function formatNewsDate(iso: string | null): string {
  if (!iso) return '';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(d);
}

export function formatFetchedAt(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return '';
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
    timeZone: 'Asia/Kolkata',
  }).format(d);
}
