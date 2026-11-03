import type { Metadata } from 'next';
import { landingBySlug } from '@/lib/landings';
import { pageMeta, breadcrumbLd, localBusinessLd } from '@/lib/seo';
import { site } from '@/lib/site';
import LandingPage from '@/components/LandingPage';

const data = landingBySlug('stock-market-course')!;

export const metadata: Metadata = pageMeta({
  title: data.metaTitle,
  description: data.metaDescription,
  path: '/stock-market-course/',
  keywords: [...data.keywords],
});

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Stock Market Course', path: '/stock-market-course/' },
            ]),
            {
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: data.faqs.map((f) => ({
                '@type': 'Question',
                name: f.q,
                acceptedAnswer: { '@type': 'Answer', text: f.a },
              })),
            },
            {
              '@context': 'https://schema.org',
              '@type': 'EducationalOccupationalProgram',
              name: data.h1,
              description: data.metaDescription,
              url: `${site.url}/stock-market-course/`,
              provider: { '@id': `${site.url}/#organization` },
              educationalProgramMode: ['onsite', 'online'],
              inLanguage: ['en-IN', 'hi-IN'],
              occupationalCategory: 'Financial Markets',
            },
          ]),
        }}
      />
      <LandingPage data={data} />
    </>
  );
}
