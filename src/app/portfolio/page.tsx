import type { Metadata } from 'next';

import ComingSoon from '@/components/sections/Coming-soon';
import HeroSection from '@/components/sections/portfolio/HeroSection';
import PortfolioSection from '@/components/sections/portfolio/PortfolioSection';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Portfolio',
  description:
    'Selected Echocode case studies across mobile apps, e-commerce and food-tech products with design, development and delivery details.',
  path: '/portfolio/',
  image: '/images/portfolio/cleaning.jpg',
  keywords: [
    'software development portfolio',
    'mobile app case studies',
    'e-commerce case study',
    'food app case study',
  ],
});

const Portfolio = () => {
  return (
    <>
      <ComingSoon />
      <HeroSection />
      <PortfolioSection />
    </>
  );
};

export default Portfolio;
