import type { Metadata } from 'next';

import HeroSection from '@/components/sections/privacy/HeroSection';
import LegalSection from '@/components/sections/privacy/LegalSection';
import StaticGradientLine from '@/components/UI/StaticGradientLine';
import privacyPolicyContent from '@/data/legal/privacy-policy-page.json';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: privacyPolicyContent.meta.title,
  description: privacyPolicyContent.meta.description,
  path: '/privacy-policy',
  image: '/images/rabbits/hero/privacy.png',
});

const PrivacyPolicyPage = () => {
  return (
    <>
      <HeroSection
        title={privacyPolicyContent.hero.title}
        imageAlt={privacyPolicyContent.hero.imageAlt}
      />
      <StaticGradientLine />
      <LegalSection
        intro={privacyPolicyContent.intro.summary}
        sections={privacyPolicyContent.sections}
        effectiveDate={privacyPolicyContent.effectiveDate}
      />
    </>
  );
};

export default PrivacyPolicyPage;
