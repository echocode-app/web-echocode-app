import type { Metadata } from 'next';
import ContactsSection from '@/components/sections/home/ContactsSection';
import CareerSection from '@/components/sections/home/CareerSection';
import { Hero } from '@/components/sections/home/Hero';
import TeamSection from '@/components/sections/home/TeamSection';
import ComingSoon from '@/components/sections/Coming-soon';
import { BasedOnSection } from '@/components/sections/home/BasedOn';
import ExploreSection from '@/components/sections/home/ExploreSection';
import ProductsSection from '@/components/sections/home/ProductsSection';
import SectionFirstReveal from '@/components/UI/section/SectionFirstReveal';

export const metadata: Metadata = {
  metadataBase: new URL('https://echocode.app/'),

  title: 'Echocode.app',

  description:
    'Echocode is a software development company specializing in iOS, Android, Flutter, Web and iGaming solutions. We provide design, QA and product management services.',

  robots: {
    index: false,
    follow: false,
  },

  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon/favicon.ico',
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
  },

  manifest: '/favicon/site.webmanifest',

  appleWebApp: {
    title: 'Echocode.app',
  },

  openGraph: {
    title: 'Echocode.app',
    description:
      'Custom mobile and web development solutions: iOS, Android, Flutter and iGaming. Design, QA and product management services.',
    url: 'https://echocode.app/',
    siteName: 'Echocode.app',
    images: [
      {
        url: '/UI/logo.png',
        width: 1200,
        height: 630,
        alt: 'Echocode — Software Development Company',
      },
    ],
    type: 'website',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Echocode.app',
    description: 'Mobile & web development company. iOS, Android, Flutter and iGaming solutions.',
    images: ['/images/rabbits/hero/design.png'],
  },

  alternates: {
    canonical: 'https://echocode.app/',
  },
};

export default function Home() {
  return (
    <>
      <ComingSoon />
      <Hero />
      <SectionFirstReveal>
        <BasedOnSection />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <ProductsSection />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <ExploreSection />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <TeamSection />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <CareerSection />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <ContactsSection />
      </SectionFirstReveal>
    </>
  );
}
