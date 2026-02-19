import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import TeamList from './TeamList';
import TeamVideo from './TeamVideo';
import { preload } from 'react-dom';

const TeamSection = () => {
  preload('/videos/video-team.mp4', { as: 'video', type: 'video/mp4', fetchPriority: 'low' });

  return (
    <section id="team" className="pb-10 md:pb-30 scroll-mt-33">
      <SectionGradientLine height="2" />
      <SectionContainer>
        <div className="flex flex-wrap justify-center xl:justify-between">
          <div className="mb-10 md:mb-0">
            <h2 className="font-main font-semibold uppercase">/ Our Team</h2>
            <TeamVideo />
          </div>
          <div className="w-122">
            <p className="font-title text-title-sm md:text-title-base max-w-115 mb-10">
              We thrive on innovation and problem-solving, embracing every challenge with enthusiasm
            </p>
            <TeamList />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default TeamSection;
