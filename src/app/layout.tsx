import type { Metadata } from 'next';

import { poppins, wadik, inter, workSans } from '@/styles/fonts/fonts';
import '@/styles/splash-loader.css';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import SplashLoader from '@/components/UI/loaders/SplashLoader';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Echocode',
  description: 'Echocode',
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
