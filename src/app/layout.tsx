import type { Metadata, Viewport } from 'next';
import { Inter, Sora } from 'next/font/google';
import './globals.css';

import { site } from '@/lib/site';
import { organizationLd, websiteLd, localBusinessLd } from '@/lib/seo';
import MotionProvider from '@/components/MotionProvider';
import { themeScript } from '@/components/theme';
import Preloader from '@/components/Preloader';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { ScrollProgress, WhatsAppFab } from '@/components/FloatingUI';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
  adjustFontFallback: true,
});

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  weight: ['600', '700', '800'],
  variable: '--font-sora',
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Stock Market, NISM, Forex & Crypto Training in Lucknow`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: site.url }],
  creator: site.name,
  publisher: site.legalName,
  keywords: [
    'stock market course',
    'stock course',
    'stock learning',
    'trading course',
    'share market course',
    'stock market course in Lucknow',
    'share market classes Lucknow',
    'stock market institute Lucknow',
    'NISM certification training',
    'NISM Series V-A V-B VIII XV',
    'technical analysis course',
    'options trading course India',
    'intraday trading course',
    'forex trading course',
    'crypto trading course',
    'trading mentorship India',
    'Stock Fintech',
  ],
  alternates: { canonical: site.url },
  category: 'education',
  formatDetection: { telephone: true, address: true, email: true },
  robots: {
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
    url: site.url,
    title: `${site.name} — Learn. Grow. Shine.`,
    description: site.description,
    images: [{ url: '/og.svg', width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Learn. Grow. Shine.`,
    description: site.shortDescription,
    images: ['/og.svg'],
  },
  icons: {
    // favicon.ico first: Chrome requests /favicon.ico regardless of what the
    // page declares, and caches the result per-domain for a long time. Without
    // one, whatever the domain served before stays in the tab.
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32 48x48' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    // iOS ignores SVG here and needs a PNG, or the home-screen icon is blank.
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }],
  },
  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFCFF' },
    { media: '(prefers-color-scheme: dark)', color: '#060410' },
  ],
  colorScheme: 'light dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" className={`${inter.variable} ${sora.variable}`} suppressHydrationWarning>
      <head>
        {/* Sets data-theme before first paint so the palette never flashes. */}
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        {/* Warm up the font origin before the CSS that needs it is parsed. */}
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          // Structured data is static and authored here, not user input.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([organizationLd, websiteLd, localBusinessLd]),
          }}
        />
        {/*
          Scroll-reveal elements are server-rendered at opacity:0 and the
          preloader covers the viewport until JS dismisses it. Without
          JavaScript both would leave a blank page, so reset them here.
        */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<style>
              [data-preloader]{display:none!important}
              body *{opacity:1!important}
              body *:not(.animate-ticker):not(.animate-marquee){transform:none!important}
              body{overflow:auto!important}
            </style>`,
          }}
        />
      </head>
      <body>
        <MotionProvider>
          <Preloader />
          <ScrollProgress />

          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-bull focus:px-5 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-ink"
          >
            Skip to content
          </a>

          <Header />
          <main id="main" className="pt-[72px]">
            {children}
          </main>
          <Footer />
          <WhatsAppFab />
        </MotionProvider>
      </body>
    </html>
  );
}
