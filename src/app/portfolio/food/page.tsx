import type { Metadata } from 'next';

import { AboutSectionFood } from '@/components/sections/portfolio/project/AboutSection';
import ChallengesSection from '@/components/sections/portfolio/project/ChallengesSection';
import { ImplementationSection } from '@/components/sections/portfolio/project/ImplementationSection';
import PlanningSection from '@/components/sections/portfolio/project/PlanningSection/PlanningSection';
import FeaturesSection from '@/components/sections/portfolio/project/FeaturesSection';
import ScreensSection from '@/components/sections/portfolio/project/ScreensSection';
import ProptotypeSection from '@/components/sections/portfolio/project/PrototypeSection';
import TechnologySection from '@/components/sections/portfolio/project/TechnologySection';

import implementations from '@/data/projects/implementations/food.json';
import challenges from '@/data/projects/challenges/food.json';
import planning from '@/data/projects/planning/food.json';
import features from '@/data/projects/features/food.json';
import technologies from '@/data/projects/technologies/food.json';
import HeroBackground from '@/components/UI/HeroBackground';
import { buildPageMetadata } from '@/lib/seo/metadata';

export const metadata: Metadata = buildPageMetadata({
  title: 'Food & Drinks App Project by Echocode',
  description:
    'A food and drinks app project by Echocode with planning, UX, implementation, feature design and prototype delivery details.',
  path: '/portfolio/food/',
  image: '/images/projects/food/screens.png',
  keywords: ['food app project', 'restaurant app development', 'mobile product project'],
});

const Food = () => {
  return (
    <>
      <HeroBackground />
      <section className="pt-42 pb-37.5">
        <h1 className="text-title-3xl md:text-title-5xl lg:text-title-6xl font-title text-center">
          FOOD ＆ DRINK
        </h1>
      </section>
      <AboutSectionFood />
      <ImplementationSection
        list={implementations}
        subtitle={
          'We moved from planning to execution through structured product development stages.'
        }
      />
      <ChallengesSection
        list={challenges}
        image="/images/projects/food/challenges.jpg"
        position="0% 50%"
      />
      <PlanningSection
        list={planning}
        image={'/images/projects/food/planning.png'}
        imageStyle="relative w-full max-w-[570px] aspect-570/600"
      />
      <FeaturesSection list={features} />
      <ScreensSection imagePath="/images/projects/food/screens.png" />
      <ProptotypeSection
        leftBgImage={'/images/projects/food/left-bg.png'}
        rightBgImage={'/images/projects/food/right-bg.png'}
      >
        <iframe
          src="https://embed.figma.com/proto/HQTlFNXLE1fFRAXwGSdvwf/Prototype-Food-Drink?page-id=0%3A1&node-id=1-2785&p=f&viewport=365%2C45%2C0.04&embed-host=share&hide-ui=1"
          allowFullScreen
          title="Interactive prototype of the Food App"
          width="354px"
          height="797px"
          className="scale-70 xl:scale-100"
        />
      </ProptotypeSection>
      <TechnologySection list={technologies} />
    </>
  );
};

export default Food;
