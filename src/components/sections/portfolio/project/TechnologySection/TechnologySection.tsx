import SectionProjectContainer from '@/components/UI/section/SectionProjectContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import TechnologyList from './TechnologyList';

interface TechnologySectionProps {
  list: { title: string; desc: string }[];
}

const TechnologySection = ({ list }: TechnologySectionProps) => {
  return (
    <section className="pb-10 md:pb-15">
      <SectionGradientLine height="1" container="project" />
      <SectionProjectContainer>
        <SectionTitle marginBottom="40px">Technology Stack</SectionTitle>
        <TechnologyList list={list} />
      </SectionProjectContainer>
    </section>
  );
};

export default TechnologySection;
