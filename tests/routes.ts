import { readdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { courses } from '@/lib/courses';
import { landings } from '@/lib/landings';
import { mentors } from '@/lib/site';

const APP_DIR = join(process.cwd(), 'src', 'app');

/**
 * Walks src/app and returns every route the site actually builds, with the
 * dynamic segments expanded from the data that feeds generateStaticParams.
 *
 * Route groups and private folders are skipped, and so is the catch-all
 * not-found, which is not a navigable URL.
 */
export function buildRoutes(): string[] {
  const out: string[] = [];

  const walk = (dir: string, segments: string[]) => {
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
      if (!entry.isDirectory()) continue;
      if (entry.name.startsWith('_') || entry.name.startsWith('(')) continue;

      const next = join(dir, entry.name);
      const nextSegments = [...segments, entry.name];

      if (existsSync(join(next, 'page.tsx'))) {
        out.push(`/${nextSegments.join('/')}/`);
      }
      walk(next, nextSegments);
    }
  };

  if (existsSync(join(APP_DIR, 'page.tsx'))) out.push('/');
  walk(APP_DIR, []);

  return out.flatMap((route) => {
    if (route.includes('[slug]')) {
      const data = route.startsWith('/courses/')
        ? courses.map((c) => c.slug)
        : route.startsWith('/mentors/')
          ? mentors.map((m) => m.slug)
          : [];
      return data.map((slug) => route.replace('[slug]', slug));
    }
    return [route];
  });
}

/** Routes plus the landing pages, which live at the site root. */
export function allRoutes(): string[] {
  const fromDisk = buildRoutes();
  const landingRoutes = landings.map((l) => `/${l.slug}/`);
  return Array.from(new Set([...fromDisk, ...landingRoutes]));
}
