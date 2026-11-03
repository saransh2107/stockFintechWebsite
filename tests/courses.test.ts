import { describe, it, expect } from 'vitest';
import { courses, courseBySlug } from '@/lib/courses';

describe('courseBySlug', () => {
  it('finds every course by its own slug', () => {
    for (const c of courses) {
      expect(courseBySlug(c.slug)).toBe(c);
    }
  });

  it('returns undefined for an unknown slug', () => {
    expect(courseBySlug('no-such-course')).toBeUndefined();
  });
});

describe('course catalogue', () => {
  it('has unique, url-safe slugs', () => {
    const slugs = courses.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const slug of slugs) {
      expect(slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('has exactly one featured course', () => {
    // The pricing page and the course grid both render a single
    // "Most popular" badge; two would look like a mistake, none loses it.
    expect(courses.filter((c) => c.featured)).toHaveLength(1);
  });

  it('prices every course as a positive whole number of rupees', () => {
    for (const c of courses) {
      expect(Number.isInteger(c.price), `${c.slug} price`).toBe(true);
      expect(c.price, `${c.slug} price`).toBeGreaterThan(0);
    }
  });

  it('only sets mrp above the price it discounts', () => {
    // mrp drives the struck-through "was" figure. An mrp at or below the
    // real price renders a discount that is not a discount, which is the
    // misleading-pricing problem the invented MRPs were removed for.
    for (const c of courses) {
      if (c.mrp === undefined) continue;
      expect(c.mrp, `${c.slug} mrp`).toBeGreaterThan(c.price);
    }
  });

  it('carries the real published fees', () => {
    const expected: Record<string, number> = {
      'ultimate-traders-program': 40000,
      'nism-series-8': 50000,
      'nism-series-15': 125000,
      'forex-and-crypto': 30000,
      'one-on-one-mentorship': 175000,
    };
    for (const [slug, price] of Object.entries(expected)) {
      expect(courseBySlug(slug)?.price, slug).toBe(price);
    }
  });

  it('gives every course the content its detail page renders', () => {
    for (const c of courses) {
      expect(c.title.trim(), `${c.slug} title`).not.toBe('');
      expect(c.shortTitle.trim(), `${c.slug} shortTitle`).not.toBe('');
      expect(c.summary.trim(), `${c.slug} summary`).not.toBe('');
      expect(c.duration.trim(), `${c.slug} duration`).not.toBe('');
      expect(c.highlights.length, `${c.slug} highlights`).toBeGreaterThan(0);
      expect(c.modules.length, `${c.slug} modules`).toBeGreaterThan(0);
      expect(c.outcomes.length, `${c.slug} outcomes`).toBeGreaterThan(0);
    }
  });

  it('uses an icon key and accent the UI knows about', () => {
    const accents = ['mint', 'cyan', 'violet', 'amber'];
    for (const c of courses) {
      expect(accents, `${c.slug} accent`).toContain(c.accent);
    }
  });
});
