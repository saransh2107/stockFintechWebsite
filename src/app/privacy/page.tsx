import type { Metadata } from 'next';
import Link from 'next/link';
import { site, contact } from '@/lib/site';
import { pageMeta } from '@/lib/seo';
import { PageHero } from '@/components/ui';
import { Reveal } from '@/components/motion';

export const metadata: Metadata = pageMeta({
  title: 'Privacy Policy',
  description:
    'How Stock Fintech collects, uses, stores and protects your personal data, what we never do with it, and how to exercise your rights over it.',
  path: '/privacy/',
});

const UPDATED = '17 October 2026';

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        body={`What we collect, why we collect it, and what we will never do with it. Last updated ${UPDATED}.`}
      />

      <section className="container-x mt-14 pb-10">
        <Reveal className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-line bg-card/40 p-8 sm:p-10">
            <div className="prose-sf">
              <h2>1. The short version</h2>
              <p>
                We collect the minimum we need to answer your enquiry and run your course. We do
                not sell your data, we do not pass your number to tip providers or brokers, and
                we do not send you trading calls.
              </p>

              <h2>2. Who is responsible for your data</h2>
              <p>
                {site.name}, managed by M/s KOSOVO INDIA INC., {contact.address.full}, is the
                data controller. Contact us about anything in this policy at{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </p>

              <h2>3. What we collect</h2>
              <ul>
                <li>
                  <strong>Enquiry details</strong> — name, phone number, email address, the
                  course you are interested in and anything you type into the message field.
                </li>
                <li>
                  <strong>Enrolment details</strong> — billing name, address, payment reference
                  and the batch you join. Card and UPI details are handled by the payment
                  gateway; we never see or store them.
                </li>
                <li>
                  <strong>Learning records</strong> — attendance, mock-test scores and the
                  progress analytics shown in your dashboard.
                </li>
                <li>
                  <strong>Technical data</strong> — anonymous analytics such as pages viewed and
                  approximate region, collected to understand what is useful on the site.
                </li>
              </ul>

              <h2>4. Why we use it</h2>
              <ul>
                <li>To respond to your enquiry and arrange a demo class.</li>
                <li>To deliver the course you paid for and issue your certificate.</li>
                <li>To send batch logistics, schedule changes and study material.</li>
                <li>To send the weekly market outlook, if you opted in.</li>
                <li>To meet accounting, tax and other legal obligations.</li>
              </ul>

              <h2>5. What we never do</h2>
              <ul>
                <li>We never sell, rent or trade your personal data.</li>
                <li>
                  We never share your contact details with brokers, tip services or other
                  institutes.
                </li>
                <li>We never send investment advice or buy/sell recommendations.</li>
              </ul>

              <h2>6. Who we share it with</h2>
              <p>
                Only service providers who help us operate, each bound to use the data solely for
                that purpose: our payment gateway, email delivery provider, analytics provider
                and hosting provider. We also disclose data where the law requires it.
              </p>

              <h2>7. Cookies and analytics</h2>
              <p>
                This site uses only what is necessary to work, plus privacy-respecting analytics
                to count page views. We do not run advertising or cross-site tracking cookies.
                Your browser settings can block cookies entirely; the site will still function.
              </p>

              <h2>8. How long we keep it</h2>
              <ul>
                <li>Enquiries that do not become enrolments: 12 months.</li>
                <li>
                  Student records and invoices: 8 years, as required for tax and accounting.
                </li>
                <li>Newsletter subscriptions: until you unsubscribe.</li>
              </ul>

              <h2>9. Security</h2>
              <p>
                Data is transmitted over HTTPS and access to student records is restricted to
                staff who need it. No system is perfectly secure, but we take reasonable
                technical and organisational measures appropriate to the sensitivity of what we
                hold.
              </p>

              <h2>10. Your rights</h2>
              <p>
                You can ask us to show you the data we hold about you, correct it, delete it, or
                stop using it for marketing. Email{' '}
                <a href={`mailto:${contact.email}`}>{contact.email}</a> and we will respond
                within 30 days. Every marketing email also carries a one-click unsubscribe link.
              </p>

              <h2>11. Children</h2>
              <p>
                Our programs are intended for people aged 18 and over. We do not knowingly
                collect data from children. If you believe a minor has given us data, contact us
                and we will delete it.
              </p>

              <h2>12. Changes to this policy</h2>
              <p>
                If we change how we handle your data we will update this page and the date
                above. Material changes affecting existing students will also be emailed.
              </p>

              <h2>13. Related</h2>
              <p>
                See also our <Link href="/terms/">Terms &amp; Conditions</Link> and{' '}
                <Link href="/refund-policy/">Refund Policy</Link>.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
