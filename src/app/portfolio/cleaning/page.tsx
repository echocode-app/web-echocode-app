import type { Metadata } from 'next';

import AboutSectionCleaning from '@/components/sections/portfolio/project/AboutSection/AboutSectionCleaning';
import ChallengesSection from '@/components/sections/portfolio/project/ChallengesSection';
import FeaturesCleanning from '@/components/sections/portfolio/project/FeaturesSection/FeaturesCleanning';
import { ImplementationCleaningSection } from '@/components/sections/portfolio/project/ImplementationSection';
import PlanningSection from '@/components/sections/portfolio/project/PlanningSection/PlanningSection';
import ProptotypeSection from '@/components/sections/portfolio/project/PrototypeSection';
import ScreensSection from '@/components/sections/portfolio/project/ScreensSection';
import TechnologySection from '@/components/sections/portfolio/project/TechnologySection';
import HeroBackground from '@/components/UI/HeroBackground';
import { buildPageMetadata } from '@/lib/seo/metadata';

import challenges from '@/data/projects/challenges/cleaning.json';
import planning from '@/data/projects/planning/cleaning.json';
import technologies from '@/data/projects/technologies/cleaning.json';

export const metadata: Metadata = buildPageMetadata({
  title: 'Cleaning App Project by Echocode',
  description:
    'A cleaning app project by Echocode covering product UX, mobile design, implementation stages, prototype validation and delivery.',
  path: '/portfolio/cleaning/',
  image: '/images/projects/cleaning/screens.png',
  keywords: ['cleaning app project', 'mobile app development project', 'ux ui project'],
});

const Cleaning = () => {
  return (
    <>
      <HeroBackground />
      <section className="pt-42 pb-37.5">
        <h1 className="text-title-3xl md:text-title-5xl lg:text-title-6xl font-title text-center">
          CLEANING-APP
        </h1>
      </section>
      <AboutSectionCleaning />
      <ImplementationCleaningSection />
      <ChallengesSection
        list={challenges}
        image="/images/projects/cleaning/challenges.png"
        position="50% 50%"
      />
      <PlanningSection
        list={planning}
        image={'/images/projects/cleaning/planning.png'}
        imageStyle="relative w-full max-w-[570px] aspect-570/600"
      />
      <FeaturesCleanning />
      <ScreensSection imagePath="/images/projects/cleaning/screens.png" />
      <ProptotypeSection
        leftBgImage={'/images/projects/cleaning/left-bg.png'}
        rightBgImage={'/images/projects/cleaning/right-bg.png'}
      >
        <iframe
          src="https://embed.figma.com/proto/DSZc6u4EWXyp9DqX1F5qQr/Prototype-Cleaning?scaling=none&content-scaling=fixed&page-id=0%3A1&node-id=1-4827&starting-point-node-id=1%3A4827&embed-host=share&hide-ui=1"
          allowFullScreen
          title="Interactive prototype of the Cleaning App"
          width="354px"
          height="797px"
          className="scale-70 xl:scale-100"
        />
      </ProptotypeSection>
      <TechnologySection list={technologies} />
    </>
  );
};

export default Cleaning;
