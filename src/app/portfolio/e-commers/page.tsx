import type { Metadata } from 'next';

import { AboutSectionECommerse } from '@/components/sections/portfolio/project/AboutSection';
import { ImplementationSection } from '@/components/sections/portfolio/project/ImplementationSection';
import ChallengesSection from '@/components/sections/portfolio/project/ChallengesSection';
import PlanningSection from '@/components/sections/portfolio/project/PlanningSection';
import FeaturesSection from '@/components/sections/portfolio/project/FeaturesSection/FeaturesSection';
import ScreensSection from '@/components/sections/portfolio/project/ScreensSection';
import ProptotypeSection from '@/components/sections/portfolio/project/PrototypeSection';
import TechnologySection from '@/components/sections/portfolio/project/TechnologySection';

import implementations from '@/data/projects/implementations/e-commerce.json';
import challenges from '@/data/projects/challenges/e-commerce.json';
import planning from '@/data/projects/planning/e-commerce.json';
import features from '@/data/projects/features/e-commerce.json';
import technologies from '@/data/projects/technologies/e-commerce.json';
import AmbientHeroBackground from '@/components/UI/hero-background/AmbientHeroBackground';
import SectionFirstReveal from '@/components/UI/section/SectionFirstReveal';
import TypedHeroHeading from '@/components/UI/TypedHeroHeading';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'E-commerce Project by Echocode',
  description:
    'An e-commerce project by Echocode focused on product research, UX, implementation planning, feature design and mobile commerce delivery.',
  path: '/portfolio/e-commers/',
  image: '/images/projects/e-commers/screens.png',
  keywords: ['e-commerce project', 'mobile commerce app', 'product development project'],
});

const ECommers = () => {
  return (
    <>
      <SectionFirstReveal>
        <section className="relative overflow-hidden pt-42 pb-37.5">
          <AmbientHeroBackground />
          <TypedHeroHeading
            text="E-commerce"
            className="text-title-3xl md:text-title-5xl lg:text-title-6xl font-title text-center uppercase"
          />
        </section>
      </SectionFirstReveal>
      <SectionFirstReveal>
        <AboutSectionECommerse />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <ImplementationSection
          list={implementations}
          subtitle={
            'We began with in-depth market research and UI analysis of top-tier fashion apps.'
          }
        />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <ChallengesSection
          list={challenges}
          image="/images/projects/e-commers/challenges.jpg"
          position="0% 50%"
        />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <PlanningSection
          list={planning}
          image={'/images/projects/e-commers/planning.png'}
          imageStyle="relative w-full max-w-157.5 aspect-157/139"
        />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <FeaturesSection list={features} />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <ScreensSection imagePath="/images/projects/e-commers/screens.png" />
      </SectionFirstReveal>
      <SectionFirstReveal>
        <ProptotypeSection
          leftBgImage={'/images/projects/e-commers/left-bg.png'}
          rightBgImage={'/images/projects/e-commers/right-bg.png'}
        >
          <iframe
            src="https://embed.figma.com/proto/8M2Etv0l9Hgs656uoInQmT/e-commerce?scaling=scale-down&content-scaling=fixed&page-id=0%3A1&node-id=0-8167&starting-point-node-id=0%3A8167&embed-host=share&hide-ui=1"
            allowFullScreen
            title="Interactive prototype of the E-commerce App"
            width="354px"
            height="797px"
            className="scale-70 xl:scale-100"
          />
        </ProptotypeSection>
      </SectionFirstReveal>
      <SectionFirstReveal>
        <TechnologySection list={technologies} />
      </SectionFirstReveal>
    </>
  );
};

export default ECommers;
