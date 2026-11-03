import { describe, it, expect } from 'vitest';
import { redirects } from '@/lib/redirects';
import { allRoutes } from './routes';

const routes = allRoutes();

describe('legacy redirects', () => {
  it('has no duplicate source paths', () => {
    const from = redirects.map((r) => r.from);
    expect(new Set(from).size, 'duplicate "from" entries').toBe(from.length);
  });

  it('uses absolute paths with a trailing slash on both sides', () => {
    for (const r of redirects) {
      expect(r.from, `from: ${r.from}`).toMatch(/^\/.*\/$/);
      // Targets may carry a #fragment, e.g. /about/#faq.
      expect(r.to, `to: ${r.to}`).toMatch(/^\/.*(\/|#[\w-]+)$/);
    }
  });

  it('sends every redirect to a page that exists', () => {
    // A redirect to a missing route turns a recoverable 404 into a
    // redirect chain that ends in one — worse for SEO than leaving it.
    for (const r of redirects) {
      const target = r.to.split('#')[0];
      expect(routes, `${r.from} -> ${r.to} : target route does not exist`).toContain(target);
    }
  });

  it('never redirects away from a page that exists', () => {
    // If a source path is also a real route, the redirect shadows a live
    // page and that page becomes unreachable.
    for (const r of redirects) {
      expect(routes, `${r.from} is a real route but is also redirected`).not.toContain(r.from);
    }
  });

  it('has no redirect that points at itself', () => {
    for (const r of redirects) {
      expect(r.to.split('#')[0], `${r.from} redirects to itself`).not.toBe(r.from);
    }
  });

  it('has no multi-hop chains', () => {
    // Cloudflare serves these as single 301s; a chain costs an extra
    // round trip and dilutes the link equity being preserved.
    const sources = new Set(redirects.map((r) => r.from));
    for (const r of redirects) {
      const target = r.to.split('#')[0];
      expect(sources, `${r.from} -> ${r.to}, which is itself redirected`).not.toContain(target);
    }
  });
});
