import ExploreList from './ExploreList';
import CarouselList from './CarouselList';
import ExploreLink from './ExploreLink';

import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';

const ExploreSection = () => {
  return (
    <section id="partnership" className="pb-10 md:pb-30 scroll-mt-33">
      <SectionGradientLine height="2" />
      <SectionContainer>
        <div className="flex gap-6 justify-between flex-col lg:flex-row mb-10">
          <div className="max-w-130 md:max-w-155">
            <h2 className="block  mb-3 text-title-2xl md:text-title-4xl font-title text-white">
              <span className="text-accent"> Fast</span> and{' '}
              <span className="text-accent">easy</span> growth for your team
            </h2>
            <p className="text-main-sm md:text-main-base">
              {
                "ECHOCODE.APP's door is always open to working together with you! Our company has a wide profile of solutions for your marketing needs."
              }
            </p>
          </div>
          <ExploreLink />
        </div>
        <ExploreList />
        <CarouselList />
      </SectionContainer>
    </section>
  );
};

export default ExploreSection;
