import SectionContainer from '@/components/UI/section/SectionContainer';
import ProjectList from './ProjectList';

import projects from './static-project-list.json';

const PortfolioSection = () => {
  return (
    <section className="pb-10 md:pb-25">
      <SectionContainer>
        <ProjectList list={projects} />
      </SectionContainer>
    </section>
  );
};

export default PortfolioSection;
