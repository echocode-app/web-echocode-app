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
  title: 'Echocode.app',

  description:
    'Echocode is a software development company specializing in iOS, Android, Flutter, Web and iGaming solutions. We provide design, QA and product management services.',

  robots: {
    index: true,
    follow: true,
  },

  appleWebApp: {
    title: 'Echocode.app',
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
