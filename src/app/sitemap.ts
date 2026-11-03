import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';
import { courses } from '@/lib/courses';
import { landings } from '@/lib/landings';

export const dynamic = 'force-static';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (p: string) => `${site.url}${p}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/'), changeFrequency: 'weekly', priority: 1 },
    { url: url('/courses/'), changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/pricing/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/about/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/mentors/'), changeFrequency: 'monthly', priority: 0.7 },
    { url: url('/careers/'), changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/contact/'), changeFrequency: 'monthly', priority: 0.8 },
    { url: url('/news/'), changeFrequency: 'daily', priority: 0.7 },
    { url: url('/terms/'), changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/privacy/'), changeFrequency: 'yearly', priority: 0.2 },
    { url: url('/refund-policy/'), changeFrequency: 'yearly', priority: 0.2 },
  ];

  // High-intent SEO landing pages — priority just under the homepage.
  const landingPages: MetadataRoute.Sitemap = landings.map((l) => ({
    url: url(`/${l.slug}/`),
    changeFrequency: 'weekly',
    priority: 0.95,
  }));

  const coursePages: MetadataRoute.Sitemap = courses.map((c) => ({
    url: url(`/courses/${c.slug}/`),
    changeFrequency: 'monthly',
    priority: c.featured ? 0.9 : 0.8,
  }));

  return [...staticPages, ...landingPages, ...coursePages].map((p) => ({ ...p, lastModified: now }));
}
