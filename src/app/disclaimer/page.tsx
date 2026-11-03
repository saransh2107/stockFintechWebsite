import type { Metadata } from 'next';
import Link from 'next/link';
import { site, contact } from '@/lib/site';
import { pageMeta, breadcrumbLd } from '@/lib/seo';
import { PageHero } from '@/components/ui';
import { Reveal } from '@/components/motion';
import { Icon } from '@/components/Icons';

export const metadata: Metadata = pageMeta({
  title: 'Legal Disclaimer, Privacy Policy & Terms of Use',
  description:
    'The full legal disclaimer, privacy policy and terms of use governing the Stock Fintech platform. Stock Fintech provides educational content only and is not a SEBI-registered investment adviser or research analyst.',
  path: '/disclaimer/',
  keywords: ['Stock Fintech disclaimer', 'terms of use', 'SEBI disclaimer', 'educational purposes only'],
});

const EFFECTIVE = '1st January 2024';

/** Highlighted statutory notice, matching the printed legal document. */
function Notice({ children }: { children: React.ReactNode }) {
  return (
    <div className="my-7 flex gap-4 rounded-2xl border border-amber/25 bg-amber/[0.05] p-6 not-prose">
      <Icon.shield className="mt-0.5 h-5 w-5 shrink-0 text-amber" />
      <p className="text-sm leading-relaxed text-fg/90">
        <strong className="font-semibold">IMPORTANT NOTICE:</strong> {children}
      </p>
    </div>
  );
}

export default function DisclaimerPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbLd([
              { name: 'Home', path: '/' },
              { name: 'Legal Disclaimer', path: '/disclaimer/' },
            ])
          ),
        }}
      />

      <PageHero
        eyebrow="Legal"
        title="Legal Disclaimer, Privacy Policy &amp; Terms of Use"
        body={`Effective ${EFFECTIVE}. Jurisdiction: Lucknow, Uttar Pradesh, India. Please read this Agreement in full before using the platform.`}
      />

      <section className="container-x mt-14 pb-10">
        <Reveal className="mx-auto max-w-3xl">
          <div className="rounded-[2rem] border border-line bg-card/40 p-8 sm:p-10">
            <div className="prose-sf">
              <p>
                Please read this Legal Disclaimer, Privacy Policy, and Terms of Use (collectively,
                the &ldquo;Agreement&rdquo;) carefully and in its entirety before accessing,
                downloading, or using the {site.name} mobile application, web portal, or any
                associated digital services (collectively, the &ldquo;Platform&rdquo;). By
                accessing or using the Platform in any capacity, you unconditionally agree to be
                bound by the terms set forth herein. If you do not agree with any provision of
                this Agreement, you are advised to immediately discontinue use of the Platform.
              </p>

              <h2>1. About Stock Fintech</h2>
              <p>
                {site.name} is a brand, a company duly incorporated under the laws of India and
                managed under the parent organization Kosovo India INC. The Platform is designed
                exclusively as a digital educational ecosystem focused on financial literacy,
                stock market awareness, and investment concepts for the general public.
              </p>
              <p>
                {site.name} is neither a stockbroker nor a registered investment adviser or
                analyst under the Securities and Exchange Board of India (SEBI) Act, 1992, or any
                rules or regulations framed thereunder. The Platform does not hold, nor does it
                represent to hold, any regulatory license that authorizes it to provide financial
                advice, portfolio management services, or investment recommendations of any kind.
              </p>

              <h2>2. Nature of Services &mdash; Strictly Educational</h2>
              <p>
                All content, materials, videos, commentary, analysis, strategies, data, charts,
                and communication disseminated through the Platform &mdash; including but not
                limited to live sessions, recorded lectures, articles, forum discussions, and
                notifications &mdash; are produced and shared exclusively for educational and
                informational purposes. Nothing contained within the Platform constitutes, or
                should be construed as, any of the following:
              </p>
              <ul>
                <li>
                  A recommendation, solicitation, or inducement to buy, sell, or hold any
                  financial instrument, security, commodity, currency, or derivative product.
                </li>
                <li>
                  Personalized investment advice tailored to the financial situation, risk
                  appetite, or investment objectives of any individual user.
                </li>
                <li>
                  A research report or investment analysis as defined under SEBI (Research
                  Analysts) Regulations, 2014.
                </li>
                <li>
                  A guarantee, assurance, or projection of profitability, returns, or financial
                  performance of any nature.
                </li>
                <li>Professional legal, tax, accounting, or financial planning advice.</li>
              </ul>
              <p>
                Any strategies, market views, or methodologies shared by {site.name}&rsquo;s team
                members, educators, or contributors represent general conceptual discussions only
                and are not to be interpreted as actionable trading signals or investment
                directives. Past performance of any concept, strategy, or example discussed on
                the Platform is not indicative of future results.
              </p>

              <h2>3. No Advisory or Fiduciary Relationship</h2>
              <p>
                Your use of the Platform does not create, and shall not be construed to create,
                any advisory, fiduciary, agency, partnership, or employment relationship between
                you and {site.name}, Kosovo India INC, or any of their respective directors,
                officers, employees, educators, or affiliates. {site.name} expressly disclaims any
                duty of care, obligation of loyalty, or fiduciary responsibility toward any user
                of the Platform.
              </p>

              <Notice>
                Users who wish to make actual financial investments or engage in real-money
                trading in any asset class &mdash; including equity, derivatives, commodities,
                currencies, or digital assets &mdash; are STRICTLY ADVISED to seek guidance from a
                SEBI-registered investment adviser, a licensed financial planner, or another
                qualified financial professional prior to taking any such action. {site.name} and
                its parent entities shall bear no liability whatsoever for any investment
                decisions made in reliance on content accessed through the Platform.
              </Notice>

              <h2>4. Subscriptions, EMT/SF Coins &amp; Platform Services</h2>
              <p>
                The Platform may offer subscription plans and a virtual in-app currency system
                referred to as EMT/SF Coins (collectively, &ldquo;Platform Credits&rdquo;). The
                following terms govern all such commercial arrangements:
              </p>
              <ul>
                <li>
                  All subscription fees collected by {site.name} are consideration for access to
                  educational content, learning tools, and associated digital services on the
                  Platform. Under no circumstances shall subscription payments be construed as
                  deposits, investments, trading capital, or contributions toward any financial
                  product or scheme.
                </li>
                <li>
                  EMT/SF Coins are virtual tokens with no monetary face value or guaranteed
                  exchange rate. Their utility is strictly limited to accessing eligible features
                  and services within the Platform ecosystem, as determined at the sole discretion
                  of {site.name}. Coins carry no intrinsic value, are non-transferable outside the
                  Platform, and do not constitute legal tender, securities, or financial
                  instruments.
                </li>
                <li>
                  All payment gateways integrated within the Platform &mdash; whether in-app or on
                  the web portal &mdash; are activated solely for the collection of fees
                  pertaining to educational services. They are not connected to any trading or
                  brokerage function.
                </li>
                <li>
                  The availability, features, and redemption terms of Platform Credits may be
                  modified, suspended, or discontinued by {site.name} at any time without prior
                  notice, subject to applicable law.
                </li>
              </ul>

              <h2>5. Payment &amp; Refund Policy &mdash; Non-Refundable Services</h2>
              <p>
                In consideration of the digital and immediately accessible nature of the
                educational services and content provided through the Platform, all payments made
                to {site.name} &mdash; including but not limited to subscription fees, plan
                upgrades, content access charges, and coin purchases &mdash; are final,
                irrevocable, and strictly non-refundable, subject to the following:
              </p>
              <ul>
                <li>
                  Once access to educational content, a subscription tier, or a digital service
                  has been granted or activated, the transaction is deemed consummated. No refund,
                  credit note, partial reimbursement, or chargeback shall be entertained under any
                  circumstances, including but not limited to change of mind, non-utilization of
                  subscribed services, dissatisfaction with content, technical issues attributable
                  to the user&rsquo;s device or internet connection, or any event of force majeure.
                </li>
                <li>
                  EMT/SF Coins and Platform Credits, once purchased or credited, hold no cash-out
                  value and are non-redeemable for money or monetary equivalents. Any unutilized
                  credits at the time of account closure or termination shall lapse without
                  compensation.
                </li>
                <li>
                  Disputed transactions or unauthorized charge claims must be raised with{' '}
                  {site.name}&rsquo;s compliance team in writing within seven (7) calendar days of
                  the transaction date. Claims submitted after this window shall not be considered.
                </li>
              </ul>

              <h3>Core Non-Refund Clause</h3>
              <p>
                All payments made toward subscription plans or educational content on the{' '}
                {site.name} Platform are strictly non-refundable. In the event that a user is
                dissatisfied with the delivery, pace, or approach of a particular batch or class
                session, {site.name}, at its sole discretion and as a goodwill gesture, may offer
                the user an opportunity to attend an equivalent upcoming batch covering the same
                subject matter, subject to availability. This courtesy reassignment does not
                constitute a contractual obligation and shall not be construed as a refund,
                credit, or acknowledgement of any deficiency in services rendered. No monetary
                consideration shall be returned under any circumstances.
              </p>

              <h3>Satisfaction Assurance Clause</h3>
              <p>
                As a mark of our commitment to the learning experience of our users, {site.name}{' '}
                may, at its discretion, offer a complimentary access extension or a session repeat
                option to users who raise a genuine concern regarding content comprehension within
                seven (7) calendar days of the relevant class session. Such an offer, if extended,
                is entirely at the discretion of {site.name}&rsquo;s academic team and shall not be
                interpreted as an admission of liability, a waiver of the no-refund policy, or an
                entitlement exercisable by the user as a matter of right. The decision of{' '}
                {site.name}&rsquo;s management in all such matters shall be final and binding.
              </p>
              <p>
                By proceeding with any payment on the Platform, users expressly acknowledge and
                accept that they are purchasing access to purely educational services, that the
                no-refund policy has been clearly communicated, and that no misrepresentation has
                been made regarding the nature or commercial terms of the services offered.
              </p>

              <Notice>
                {site.name} strongly recommends that users evaluate the suitability of the
                Platform&rsquo;s content for their learning needs before making any payment.
                Descriptive information about subscription plans, preview content, and a fair
                overview of services are made available prior to purchase to facilitate informed
                decision-making.
              </Notice>

              <h2>6. Limitation of Liability &amp; Indemnification</h2>
              <p>
                To the maximum extent permitted by applicable Indian law, {site.name}, Kosovo
                India INC, and their respective directors, shareholders, officers, employees,
                educators, agents, and assigns (collectively, &ldquo;Protected Parties&rdquo;)
                shall not be liable &mdash; whether in contract, tort, negligence, strict
                liability, or any other cause of action &mdash; for any of the following:
              </p>
              <ul>
                <li>
                  Direct, indirect, incidental, consequential, special, exemplary, or punitive
                  damages arising from the use of, or inability to use, the Platform.
                </li>
                <li>
                  Financial loss, trading loss, opportunity cost, or capital erosion sustained by
                  any user who acts upon educational content accessed through the Platform as
                  though it were professional financial advice.
                </li>
                <li>
                  Loss of data, breach of privacy, or system downtime attributable to third-party
                  service providers, infrastructure failures, cyberattacks, or other events beyond
                  the reasonable control of {site.name}.
                </li>
                <li>
                  Any representation, warranty, or claim made by third parties, including but not
                  limited to content contributors, guest educators, or external links accessed
                  through the Platform.
                </li>
              </ul>
              <p>
                Users agree to indemnify, defend, and hold harmless the Protected Parties from and
                against any and all claims, damages, losses, liabilities, costs, and expenses
                (including reasonable legal fees) arising out of or in connection with their use
                of the Platform, violation of this Agreement, or infringement of any third-party
                rights.
              </p>

              <h2>7. Privacy Policy &amp; Data Handling</h2>
              <p>
                {site.name} is committed to handling your personal information with transparency,
                integrity, and in compliance with the Information Technology Act, 2000, and the
                Information Technology (Reasonable Security Practices and Procedures and Sensitive
                Personal Data or Information) Rules, 2011. The following categories of data may be
                collected during your use of the Platform:
              </p>
              <ul>
                <li>
                  <strong>Personal Identifiers:</strong> Name, email address, registered mobile
                  number, and other voluntarily submitted profile information.
                </li>
                <li>
                  <strong>Derivative Usage Data:</strong> Server log records reflecting user
                  interaction patterns, engagement with content, and in-app activity metrics
                  &mdash; collected automatically to improve Platform functionality and user
                  experience.
                </li>
                <li>
                  <strong>Device Permissions:</strong> Certain features of the Platform may request
                  access to device storage or other device capabilities. Permissions may be managed
                  and revoked at any time through your device settings. Denial of permissions may
                  limit access to specific Platform features.
                </li>
                <li>
                  <strong>Community Contributions:</strong> Any content you voluntarily share in
                  public areas of the Platform &mdash; including chat rooms, forums, or comment
                  sections &mdash; may be visible to other users and the general public.{' '}
                  {site.name} advises discretion when sharing personal information in such spaces.
                </li>
              </ul>
              <p>
                {site.name} does not sell, rent, or trade your personal data to third parties for
                commercial purposes. Data collected is used solely for the operation, improvement,
                and security of the Platform. For any privacy-related concerns, you may write to us
                at <a href={`mailto:${contact.email}`}>{contact.email}</a>.
              </p>

              <h2>8. Intellectual Property Rights</h2>
              <p>
                All content on the Platform &mdash; including text, graphics, video, audio, course
                material, branding, logos, software, and proprietary methodologies &mdash; is the
                exclusive intellectual property of {site.name} or its duly licensed content
                partners. Unauthorized reproduction, distribution, public display, adaptation, or
                commercial exploitation of any Platform content is strictly prohibited and may
                constitute an actionable infringement under applicable Indian copyright, trademark,
                and intellectual property laws.
              </p>
              <p>
                Users are granted a limited, non-exclusive, non-transferable, revocable license to
                access Platform content solely for personal, non-commercial educational use. This
                license does not confer any ownership rights and terminates automatically upon
                cessation of your subscription or breach of this Agreement.
              </p>

              <h2>9. Governing Law &amp; Dispute Resolution</h2>
              <p>
                This Agreement and all matters arising out of or in connection with the use of the
                Platform shall be exclusively governed by and construed in accordance with the laws
                of the Republic of India, without reference to its conflict of law principles.
              </p>
              <p>
                Any dispute, claim, or controversy &mdash; whether in contract, tort, or otherwise
                &mdash; arising between a user and {site.name} or any of the Protected Parties
                shall be subject to the exclusive jurisdiction of the competent courts situated in
                Lucknow, Uttar Pradesh, India. By using the Platform, you irrevocably submit to and
                accept this exclusive jurisdiction for the resolution of any and all such disputes.
              </p>

              <h2>10. Amendments to this Agreement</h2>
              <p>
                {site.name} reserves the unilateral right to amend, update, or replace this
                Agreement at any time, with or without prior notice, in accordance with applicable
                law. The revised Agreement shall become effective upon publication on the Platform.
                Continued use of the Platform following the posting of any amendment shall
                constitute your acceptance of the revised terms. It is your responsibility to
                review this Agreement periodically to remain informed of any changes.
              </p>

              <h2>11. Grievances &amp; Contact Information</h2>
              <p>
                Any queries, feedback, grievances, or compliance concerns related to this Agreement
                or the Platform&rsquo;s operations may be addressed to the Compliance &amp; Legal
                Officer of {site.name} through the following channels:
              </p>
              <ul>
                <li>
                  <strong>Email:</strong>{' '}
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </li>
                <li>
                  <strong>Registered Address:</strong> K-4, Sector-K, Aashiyana, Lucknow, Uttar
                  Pradesh &mdash; 226012, India
                </li>
                <li>
                  <strong>Response Window:</strong> Grievances will be acknowledged within 5
                  business days of receipt.
                </li>
              </ul>

              <h2>Acknowledgement of Terms</h2>
              <p>
                By accessing or using the {site.name} Platform in any capacity &mdash; whether as a
                visitor, registered user, or subscriber &mdash; you confirm that you have read,
                understood, and unconditionally agree to be legally bound by this Agreement in its
                entirety. You further acknowledge that the Platform provides purely educational
                services, that no financial advice has been or will be rendered, and that all
                subscription payments and Platform Credit purchases are final and non-refundable as
                explicitly stated herein.
              </p>

              <h2>Related</h2>
              <p>
                See also our <Link href="/privacy/">Privacy Policy</Link>,{' '}
                <Link href="/terms/">Terms &amp; Conditions</Link> and{' '}
                <Link href="/refund-policy/">Refund Policy</Link>.
              </p>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
