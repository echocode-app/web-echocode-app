import SectionProjectContainer from '@/components/UI/section/SectionProjectContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import ImplementationList from './ImplementationList';

interface ImplementationSectionProps {
  subtitle: string;
  list: {
    title: string;
    subTitle: string;
    desc: string;
  }[];
}

const ImplementationSection = ({ subtitle, list }: ImplementationSectionProps) => {
  return (
    <section className="pb-10 md:pb-31">
      <SectionGradientLine height="1" />
      <SectionProjectContainer>
        <SectionTitle marginBottom="10px">Implementation</SectionTitle>
        <p className="text-main-sm mb-10">{subtitle}</p>
        <ImplementationList list={list} />
      </SectionProjectContainer>
    </section>
  );
};

export default ImplementationSection;
