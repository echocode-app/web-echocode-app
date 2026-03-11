import type { Metadata } from 'next';

import { poppins, wadik, inter, workSans } from '@/styles/fonts/fonts';
import '@/styles/splash-loader.css';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SplashLoader from '@/components/UI/loaders/SplashLoader';
import PageViewTracker from '@/components/analytics/PageViewTracker';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://echocode.app'),
  title: 'Echocode.app',
  description:
    'Echocode is a software development company specializing in iOS, Android, Flutter, Web and iGaming solutions.',
  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },
  manifest: '/favicon/site.webmanifest',
  openGraph: {
    title: 'Echocode.app',
    description:
      'Custom mobile and web development solutions: iOS, Android, Flutter and iGaming. Design, QA and product management services.',
    url: 'https://echocode.app/',
    siteName: 'Echocode.app',
    images: [
      {
        url: '/images/fulllogo.png',
        width: 1280,
        height: 836,
        alt: 'Echocode.app',
      },
    ],
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Echocode.app',
    description:
      'Mobile & web development company. iOS, Android, Flutter and iGaming solutions.',
    images: ['/images/fulllogo.png'],
  },
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
  modal,
}: Readonly<{
  children: ReactNode;
  modal?: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href={splashLogoHref} as="image" />
        <script dangerouslySetInnerHTML={{ __html: splashInitScript }} />
      </head>
      <body
        className={`${poppins.variable} ${inter.variable} ${wadik.variable} ${workSans.variable} antialiased relative`}
      >
        <PageViewTracker />
        <SplashLoader>
          <Header />
          <main>{children}</main>
          {modal}
          <Footer />
        </SplashLoader>
      </body>
    </html>
  );
}
