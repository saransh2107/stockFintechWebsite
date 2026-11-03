import { describe, it, expect } from 'vitest';
import {
  pageMeta,
  breadcrumbLd,
  personLd,
  courseLd,
  localBusinessLd,
  organizationLd,
  websiteLd,
} from '@/lib/seo';
import { site, mentors } from '@/lib/site';
import { courses, courseBySlug } from '@/lib/courses';
import { allRoutes } from './routes';

describe('pageMeta', () => {
  it('builds an absolute canonical from the path', () => {
    const meta = pageMeta({ title: 'Test', description: 'A test page.', path: '/about/' });
    expect(meta.alternates?.canonical).toBe(`${site.url}/about/`);
  });

  it('carries the description into OpenGraph', () => {
    const description = 'A specific description for this page.';
    const meta = pageMeta({ title: 'Test', description, path: '/about/' });
    expect(meta.description).toBe(description);
    expect(meta.openGraph?.description).toBe(description);
  });

  it('marks a page noindex when asked', () => {
    const meta = pageMeta({ title: 'Hidden', description: '', path: '/x/', noIndex: true });
    expect(meta.robots).toMatchObject({ index: false });
  });
});

describe('breadcrumbLd', () => {
  const ld = breadcrumbLd([
    { name: 'Home', path: '/' },
    { name: 'Mentors', path: '/mentors/' },
    { name: 'Govindam Pal', path: '/mentors/govindam-pal/' },
  ]);

  it('numbers positions from 1, in order', () => {
    expect(ld.itemListElement.map((i) => i.position)).toEqual([1, 2, 3]);
  });

  it('uses absolute urls', () => {
    for (const item of ld.itemListElement) {
      expect(item.item).toMatch(/^https:\/\//);
    }
  });
});

describe('personLd', () => {
  const withBoth = mentors.find((m) => m.linkedin)!;
  const withNeither = { ...withBoth, linkedin: undefined, photo: undefined, specialities: [] };

  it('describes the mentor', () => {
    const ld = personLd(withBoth);
    expect(ld['@type']).toBe('Person');
    expect(ld.name).toBe(withBoth.name);
    expect(ld.jobTitle).toBe(withBoth.role);
    expect(ld.url).toBe(`${site.url}/mentors/${withBoth.slug}/`);
  });

  it('emits sameAs only when a LinkedIn profile is set', () => {
    expect(personLd(withBoth)).toHaveProperty('sameAs', [withBoth.linkedin]);
    expect(personLd(withNeither)).not.toHaveProperty('sameAs');
  });

  it('omits empty optional properties rather than emitting blanks', () => {
    // An empty knowsAbout array or an image pointing nowhere is worse
    // than the property being absent — Google reads both literally.
    const ld = personLd(withNeither);
    expect(ld).not.toHaveProperty('knowsAbout');
    expect(ld).not.toHaveProperty('image');
  });
});

describe('courseLd', () => {
  it('states the same price as the course data', () => {
    for (const c of courses) {
      const ld = courseLd(c) as Record<string, any>;
      const offer = ld.offers;
      const price = Array.isArray(offer) ? offer[0].price : offer?.price;
      expect(Number(price), `${c.slug} schema price`).toBe(c.price);
    }
  });

  it('prices in rupees', () => {
    const ld = courseLd(courseBySlug('ultimate-traders-program')!) as Record<string, any>;
    const offer = Array.isArray(ld.offers) ? ld.offers[0] : ld.offers;
    expect(offer.priceCurrency).toBe('INR');
  });
});

describe('organisation schema', () => {
  it('claims no aggregate rating', () => {
    // A reviewCount here was invented during the rebuild and removed.
    // Fabricated review counts are a documented cause of Google manual
    // actions, so this guards against it being reintroduced.
    expect(localBusinessLd).not.toHaveProperty('aggregateRating');
    expect(organizationLd).not.toHaveProperty('aggregateRating');
  });

  it('uses stable @id references the other blocks can point at', () => {
    expect(organizationLd['@id']).toBe(`${site.url}/#organization`);
    expect(websiteLd.publisher).toEqual({ '@id': `${site.url}/#organization` });
  });
});

describe('route coverage', () => {
  it('builds the pages the navigation and sitemap assume exist', () => {
    const routes = allRoutes();
    for (const expected of [
      '/',
      '/courses/',
      '/mentors/',
      '/pricing/',
      '/disclaimer/',
      '/privacy/',
      '/terms/',
      '/refund-policy/',
      '/mentors/govindam-pal/',
      '/mentors/anwar/',
    ]) {
      expect(routes, `missing route ${expected}`).toContain(expected);
    }
  });
});
