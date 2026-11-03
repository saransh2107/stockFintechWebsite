import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mentors } from '@/lib/site';
import { pageMeta, breadcrumbLd, personLd } from '@/lib/seo';
import { CTABand } from '@/components/ui';
import { Reveal, StaggerGroup, StaggerItem } from '@/components/motion';
import { Icon } from '@/components/Icons';

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return mentors.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const mentor = mentors.find((m) => m.slug === slug);
  if (!mentor) return pageMeta({ title: 'Mentor not found', description: '', noIndex: true });

  return pageMeta({
    title: `${mentor.name} — ${mentor.role}`,
    description: mentor.bio,
    path: `/mentors/${mentor.slug}/`,
    keywords: [mentor.name, 'stock market mentor Lucknow', ...mentor.specialities.slice(0, 3)],
  });
}

export default async function MentorPage({ params }: Props) {
  const { slug } = await params;
  const mentor = mentors.find((m) => m.slug === slug);
  if (!mentor) notFound();

  const others = mentors.filter((m) => m.slug !== mentor.slug);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            personLd(mentor),
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Mentors', path: '/mentors/' },
              { name: mentor.name, path: `/mentors/${mentor.slug}/` },
            ]),
          ]),
        }}
      />

      {/* Profile header */}
      <section className="container-x pt-14 sm:pt-20">
        <Reveal>
          <Link
            href="/mentors/"
            className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-bull"
          >
            <Icon.arrowRight className="h-4 w-4 rotate-180" />
            All mentors
          </Link>
        </Reveal>

        <Reveal
          delay={0.06}
          className="relative mt-7 overflow-hidden rounded-[2rem] border border-line bg-card/50 p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-bull/10 blur-3xl"
          />
          <div className="relative flex flex-wrap items-center gap-6">
            <span className="grid h-24 w-24 shrink-0 place-items-center rounded-[1.75rem] bg-gradient-to-br from-bull to-cyan font-display text-3xl font-extrabold text-ink">
              {mentor.initials}
            </span>
            <div className="min-w-0">
              <h1 className="text-3xl font-extrabold leading-tight sm:text-4xl">{mentor.name}</h1>
              <p className="mt-1.5 text-sm font-semibold text-bull">{mentor.role}</p>
              <p className="mt-1.5 text-2xs uppercase tracking-[0.12em] text-muted">
                {mentor.credentials}
              </p>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Biography */}
      <section className="container-x mt-12">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_0.6fr]">
          <Reveal>
            <div className="prose-sf">
              <h2>About {mentor.name.split(' ')[0]}</h2>
              {mentor.profile.map((para) => (
                <p key={para.slice(0, 40)}>{para}</p>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.08} className="space-y-6">
            {mentor.specialities.length > 0 && (
              <div className="rounded-3xl border border-line bg-card/40 p-7">
                <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Specialises in
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {mentor.specialities.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-line bg-white/[0.03] px-3 py-1.5 text-xs text-fg/80"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {mentor.teaches.length > 0 && (
              <div className="rounded-3xl border border-line bg-card/40 p-7">
                <p className="text-2xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Teaches on
                </p>
                <ul className="mt-4 space-y-3">
                  {mentor.teaches.map((t) => (
                    <li key={t} className="flex items-start gap-2.5 text-sm text-muted">
                      <Icon.check className="mt-0.5 h-4 w-4 shrink-0 text-bull" />
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="rounded-3xl border border-cyan/20 bg-cyan/[0.04] p-7">
              <Icon.users className="h-6 w-6 text-cyan" />
              <h2 className="mt-4 text-lg font-bold leading-snug">
                Meet {mentor.name.split(' ')[0]} before you enrol
              </h2>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">
                Book a free demo class and sit in on a live session.
              </p>
              <Link href="/contact/" className="btn-ghost mt-5">
                Book a free demo
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Other mentors */}
      {others.length > 0 && (
        <section className="container-x mt-24">
          <h2 className="text-2xl font-bold sm:text-3xl">Other mentors</h2>
          <StaggerGroup className="mt-8 grid gap-5 sm:grid-cols-2" gap={0.08}>
            {others.map((o) => (
              <StaggerItem key={o.slug}>
                <Link
                  href={`/mentors/${o.slug}/`}
                  className="group flex h-full items-center gap-5 rounded-3xl border border-line bg-card/40 p-6 transition-colors hover:border-bull/30"
                >
                  <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-bull to-cyan font-display text-lg font-extrabold text-ink">
                    {o.initials}
                  </span>
                  <div className="min-w-0">
                    <h3 className="font-bold leading-snug transition-colors group-hover:text-bull">
                      {o.name}
                    </h3>
                    <p className="mt-0.5 text-sm text-muted">{o.role}</p>
                  </div>
                  <Icon.arrowRight className="ml-auto h-4 w-4 shrink-0 text-muted transition-colors group-hover:text-bull" />
                </Link>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </section>
      )}

      <CTABand
        title="Learn directly from the desk"
        body="Book a free demo class and meet the mentor who would be teaching your batch before you commit to anything."
      />
    </>
  );
}
