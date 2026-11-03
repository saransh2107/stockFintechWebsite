import { describe, it, expect } from 'vitest';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { site, contact, mentors, nav, faqs } from '@/lib/site';

describe('contact details', () => {
  it('every phone href matches the digits in its label', () => {
    for (const phone of contact.phones) {
      const digits = phone.label.replace(/\D/g, '');
      expect(phone.href, `${phone.label} href`).toBe(`tel:+${digits}`);
    }
  });

  it('the WhatsApp link points at the WhatsApp number', () => {
    expect(contact.whatsapp.href).toBe(`https://wa.me/${contact.whatsapp.number}`);
  });

  it('does not carry the retired phone number', () => {
    // The old number ended 2666 and was replaced site-wide. If it comes
    // back, enquiries go to a line nobody answers.
    const blob = JSON.stringify(contact);
    expect(blob).not.toMatch(/666/);
  });

  it('the full address agrees with its parts', () => {
    const { street, locality, region, postalCode, full } = contact.address;
    for (const part of [street, locality, region, postalCode]) {
      expect(full, `address.full should contain "${part}"`).toContain(part);
    }
  });

  it('uses a real email address', () => {
    expect(contact.email).toMatch(/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i);
  });
});

describe('site config', () => {
  it('has an absolute url with no trailing slash', () => {
    expect(site.url).toMatch(/^https:\/\//);
    expect(site.url.endsWith('/')).toBe(false);
  });
});

describe('mentors', () => {
  it('have unique slugs', () => {
    const slugs = mentors.map((m) => m.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('use url-safe slugs', () => {
    for (const m of mentors) {
      expect(m.slug, m.name).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('have the copy every profile page renders', () => {
    for (const m of mentors) {
      expect(m.name.trim(), 'name').not.toBe('');
      expect(m.role.trim(), `${m.name} role`).not.toBe('');
      expect(m.bio.trim(), `${m.name} bio`).not.toBe('');
      expect(m.profile.length, `${m.name} profile paragraphs`).toBeGreaterThan(0);
      for (const para of m.profile) {
        expect(para.trim(), `${m.name} paragraph`).not.toBe('');
      }
    }
  });

  it('have initials that match the name', () => {
    for (const m of mentors) {
      expect(m.initials, m.name).toMatch(/^[A-Z]{1,2}$/);
      expect(m.name.startsWith(m.initials[0]), `${m.name} vs ${m.initials}`).toBe(true);
    }
  });

  it('only link to real LinkedIn profiles', () => {
    for (const m of mentors) {
      if (!m.linkedin) continue;
      expect(m.linkedin, m.name).toMatch(/^https:\/\/(www\.)?linkedin\.com\/in\/[\w-]+\/?$/);
    }
  });

  it('point photo paths at files that exist', () => {
    // A photo field naming a missing file ships a broken image, and the
    // fallback initials tile never renders because photo is truthy.
    for (const m of mentors) {
      if (!m.photo) continue;
      expect(m.photo, m.name).toMatch(/^\/mentors\/.+\.(jpg|jpeg|png|webp)$/);
      const onDisk = join(process.cwd(), 'public', m.photo);
      expect(existsSync(onDisk), `${m.name}: ${m.photo} is missing from public/`).toBe(true);
    }
  });
});

describe('navigation', () => {
  const hrefs = nav.flatMap((item) => [item.href, ...(item.children?.map((c) => c.href) ?? [])]);

  it('uses trailing-slash paths, since next.config sets trailingSlash', () => {
    for (const href of hrefs) {
      if (href.includes('#')) continue;
      expect(href, href).toMatch(/\/$/);
    }
  });

  it('links only to internal paths', () => {
    for (const href of hrefs) {
      expect(href, href).toMatch(/^\//);
    }
  });
});

describe('content rules', () => {
  const corpus = JSON.stringify({ site, mentors, nav, faqs }).toLowerCase();

  it('never says "live trading sessions"', () => {
    // Removed deliberately: the institute does not run live trading, and
    // implying it invites a SEBI-adjacent complaint.
    for (const phrase of ['live trading session', 'live market session', 'live trading']) {
      expect(corpus, `banned phrase: ${phrase}`).not.toContain(phrase);
    }
  });

  it('promises no guaranteed returns or placement', () => {
    for (const phrase of ['guaranteed return', 'assured return', 'guaranteed job', 'guaranteed placement']) {
      expect(corpus, `risky claim: ${phrase}`).not.toContain(phrase);
    }
  });
});
