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
import { withBasePath } from '@/shared/url/withBasePath';

export const metadata: Metadata = {
  metadataBase: new URL('https://echocode.app/'),

  title: 'Echocode.app',

  description:
    'Echocode is a software development company specializing in iOS, Android, Flutter, Web and iGaming solutions. We provide design, QA and product management services.',

  keywords: [
    'mobile app development',
    'iOS development',
    'Android development',
    'Flutter development',
    'web development',
    'game development',
    'iGaming development',
    'QA automation',
    'product engineering team',
    'software development company',
  ],

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

  icons: {
    icon: [
      { url: withBasePath('/favicon/favicon-96x96.png'), sizes: '96x96', type: 'image/png' },
      { url: withBasePath('/favicon/favicon.svg'), type: 'image/svg+xml' },
    ],
    shortcut: withBasePath('/favicon/favicon.ico'),
    apple: [{ url: withBasePath('/favicon/apple-touch-icon.png'), sizes: '180x180' }],
  },

  manifest: withBasePath('/favicon/site.webmanifest'),

  appleWebApp: {
    title: 'Echocode.app',
  },

  openGraph: {
    title: 'Echocode.app',
    description:
      'Custom mobile, web, game and iGaming development: iOS, Android, Flutter, QA and product delivery teams.',
    url: 'https://echocode.app/',
    siteName: 'Echocode.app',
    locale: 'en_US',
    images: [
      {
        url: withBasePath('/images/fulllogo.png'),
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
    description:
      'Mobile, web, game and iGaming development company. iOS, Android, Flutter, QA and product teams.',
    images: [withBasePath('/images/fulllogo.png')],
  },

  alternates: {
    canonical: 'https://echocode.app/',
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Echocode.app',
  url: 'https://echocode.app/',
  logo: 'https://echocode.app/UI/logo.png',
  description:
    'Software development company focused on mobile, web, game and iGaming products with design, QA and product management.',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      contactType: 'sales',
      email: 'hello@echocode.com',
    },
  ],
  makesOffer: [
    { '@type': 'Offer', name: 'Mobile Development (iOS, Android, Flutter)' },
    { '@type': 'Offer', name: 'Web Development (PWA and custom platforms)' },
    { '@type': 'Offer', name: 'Game Development' },
    { '@type': 'Offer', name: 'iGaming Engineering' },
    { '@type': 'Offer', name: 'QA and Test Automation' },
  ],
};

export default function Home() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
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
