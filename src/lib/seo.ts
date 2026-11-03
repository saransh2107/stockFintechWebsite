import type { Metadata } from 'next';
import { site, contact, socials, faqs, type Mentor } from './site';
import { courses, type Course } from './courses';

const abs = (path = '/') => new URL(path, site.url).toString();

/** Build consistent page metadata with canonical + OG + Twitter in one call. */
export function pageMeta({
  title,
  description,
  path = '/',
  keywords,
  noIndex,
}: {
  title: string;
  description: string;
  path?: string;
  keywords?: string[];
  noIndex?: boolean;
}): Metadata {
  const url = abs(path);
  const fullTitle = path === '/' ? title : `${title} | ${site.name}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
            'max-video-preview': -1,
          },
        },
    openGraph: {
      type: 'website',
      siteName: site.name,
      locale: site.locale,
      url,
      title: fullTitle,
      description,
      images: [{ url: abs('/og.svg'), width: 1200, height: 630, alt: fullTitle }],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [abs('/og.svg')],
    },
  };
}

/* ----------------------------- JSON-LD ----------------------------- */

export const organizationLd = {
  '@context': 'https://schema.org',
  '@type': 'EducationalOrganization',
  '@id': `${site.url}/#organization`,
  name: site.name,
  legalName: site.legalName,
  alternateName: 'Stock Fintech Lucknow',
  url: site.url,
  logo: { '@type': 'ImageObject', url: abs('/logo.svg'), width: 512, height: 512 },
  image: abs('/og.svg'),
  description: site.description,
  slogan: site.tagline,
  foundingDate: site.founded,
  email: contact.email,
  telephone: contact.phones[0].label,
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.street,
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  },
  sameAs: socials.filter((s) => s.href !== '#').map((s) => s.href),
  areaServed: { '@type': 'Country', name: 'India' },
  knowsLanguage: ['en-IN', 'hi-IN'],
};

export const localBusinessLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': `${site.url}/#localbusiness`,
  name: site.name,
  image: abs('/og.svg'),
  url: site.url,
  telephone: contact.phones[0].label,
  email: contact.email,
  priceRange: '₹₹',
  address: {
    '@type': 'PostalAddress',
    streetAddress: contact.address.street,
    addressLocality: contact.address.locality,
    addressRegion: contact.address.region,
    postalCode: contact.address.postalCode,
    addressCountry: contact.address.country,
  },
  geo: { '@type': 'GeoCoordinates', latitude: 26.7847, longitude: 80.9462 },
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      opens: '10:00',
      closes: '19:00',
    },
  ],
  /*
   * NO aggregateRating here on purpose.
   *
   * Google requires aggregate ratings to come from genuine reviews that are
   * visible on the page. A made-up reviewCount is one of the fastest routes
   * to a structured-data manual action, which would undo everything else on
   * this page. Add it back only with real numbers from a real review source
   * (Google Business Profile), and surface those reviews on the site.
   */
};

export const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${site.url}/#website`,
  url: site.url,
  name: site.name,
  description: site.shortDescription,
  publisher: { '@id': `${site.url}/#organization` },
  inLanguage: 'en-IN',
};

export const faqLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export function courseLd(course: Course) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Course',
    name: course.title,
    description: course.summary,
    url: abs(`/courses/${course.slug}/`),
    provider: { '@type': 'EducationalOrganization', name: site.name, sameAs: site.url },
    inLanguage: ['en-IN', 'hi-IN'],
    educationalLevel: course.level,
    teaches: course.outcomes,
    offers: {
      '@type': 'Offer',
      category: 'Paid',
      price: course.price,
      priceCurrency: 'INR',
      availability: 'https://schema.org/InStock',
      url: abs(`/courses/${course.slug}/`),
    },
    hasCourseInstance: {
      '@type': 'CourseInstance',
      courseMode: ['Onsite', 'Online'],
      courseWorkload: course.duration,
      location: {
        '@type': 'Place',
        name: `${site.name}, Lucknow`,
        address: contact.address.full,
      },
    },
  };
}

export const courseListLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: 'Stock Fintech Courses',
  itemListElement: courses.map((c, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: c.title,
    url: abs(`/courses/${c.slug}/`),
  })),
};

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((t, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: t.name,
      item: abs(t.path),
    })),
  };
}

/**
 * Person schema for an individual mentor profile.
 *
 * `knowsAbout` is only emitted when the mentor actually has specialities
 * recorded — an empty array in the markup is worse than no property at all.
 */
export function personLd(mentor: Mentor) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${site.url}/mentors/${mentor.slug}/#person`,
    name: mentor.name,
    jobTitle: mentor.role,
    description: mentor.bio,
    url: abs(`/mentors/${mentor.slug}/`),
    worksFor: { '@id': `${site.url}/#organization` },
    ...(mentor.specialities.length > 0 && { knowsAbout: mentor.specialities }),
    ...(mentor.linkedin && { sameAs: [mentor.linkedin] }),
    ...(mentor.photo && { image: abs(mentor.photo) }),
  };
}
