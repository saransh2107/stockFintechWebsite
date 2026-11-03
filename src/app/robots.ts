import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // Old WordPress paths that should not be crawled after the rebuild.
        disallow: ['/account/', '/cart/', '/checkout/', '/wp-admin/', '/*?c_search='],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
