/**
 * 301 map from the old WordPress URLs to the rebuilt ones.
 *
 * These exist so the rebuild does not throw away the search rankings and
 * backlinks the old site has already earned. Keep them forever — a 301 costs
 * nothing and a dropped one costs traffic.
 *
 * Consumed by scripts/gen-redirects.mjs, which writes the host-specific
 * config files (_redirects, vercel.json, .htaccess).
 */

export const redirects: { from: string; to: string }[] = [
  { from: '/about-us/', to: '/about/' },
  { from: '/instructors/', to: '/mentors/' },
  { from: '/instructors-2/', to: '/mentors/' },
  { from: '/instructor/govindam-sir/', to: '/mentors/' },
  { from: '/pricing-plan/', to: '/pricing/' },
  { from: '/term_conditions/', to: '/terms/' },
  { from: '/privacy-policy/', to: '/privacy/' },
  {
    from: '/courses/ultimate-traders-program-utp-combo-complete-stock-market-certification-course/',
    to: '/courses/ultimate-traders-program/',
  },
  { from: '/account/', to: '/contact/' },
  { from: '/cart/', to: '/courses/' },
  { from: '/checkout/', to: '/contact/' },
  { from: '/contact-us/', to: '/contact/' },
  { from: '/faq/', to: '/about/#faq' },
  { from: '/career/', to: '/careers/' },
];
