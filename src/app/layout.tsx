import type { Metadata } from 'next';

import { poppins, wadik, inter, workSans } from '@/styles/fonts/fonts';
import '@/styles/splash-loader.css';

import './globals.css';
import Header from '@/components/layout/Header';
import PageTransition from '@/components/layout/PageTransition';
import Footer from '@/components/layout/Footer';
import ContactUsModal from '@/components/modals/ContactUsModal';
import SplashLoader from '@/components/UI/loaders/SplashLoader';
import PageViewTracker from '@/components/analytics/PageViewTracker';
import { withBasePath } from '@/shared/url/withBasePath';
import { ReactNode } from 'react';
import { SEO_BASE_URL } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  metadataBase: new URL(SEO_BASE_URL),
  title: 'Echocode.app',
  description: 'Echocode',
  icons: {
    icon: [
      { url: withBasePath('/favicon/favicon-96x96.png'), sizes: '96x96', type: 'image/png' },
      { url: withBasePath('/favicon/favicon.svg'), type: 'image/svg+xml' },
    ],
    shortcut: withBasePath('/favicon/favicon.ico'),
    apple: [{ url: withBasePath('/favicon/apple-touch-icon.png'), sizes: '180x180' }],
  },
  manifest: withBasePath('/favicon/site.webmanifest'),
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const splashLogoHref = `${basePath}/UI/print_transparent.svg`;

const splashInitScript = `(() => {
  try {
    const key = "echocode:splash:lastSeen";
    const ttl = 45 * 60 * 1000;
    const now = Date.now();
    const last = sessionStorage.getItem(key);

    if (!last || now - Number(last) > ttl) {
      document.documentElement.classList.add("splash");
    }
  } catch (e) {
    document.documentElement.classList.add("splash");
  }
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href={splashLogoHref} as="image" />
        <script dangerouslySetInnerHTML={{ __html: splashInitScript }} />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${wadik.variable} ${workSans.variable} antialiased relative `}
      >
        <PageViewTracker />
        <SplashLoader>
          <Header />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <ContactUsModal />
          <Footer />
        </SplashLoader>
      </body>
    </html>
  );
}
