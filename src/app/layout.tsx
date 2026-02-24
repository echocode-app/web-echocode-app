import type { Metadata } from 'next';

import { poppins, wadik, inter, workSans } from '@/styles/fonts/fonts';

import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Echocode',
  description: 'Echocode',
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: ReactNode;
  modal: ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${inter.variable} ${wadik.variable} ${workSans.variable} antialiased relative`}
      >
        <Header />
        <main>{children}</main>
        {modal}
        <Footer />
      </body>
    </html>
  );
}
