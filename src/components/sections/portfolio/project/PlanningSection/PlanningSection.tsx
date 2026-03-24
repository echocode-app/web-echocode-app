import SectionProjectContainer from '@/components/UI/section/SectionProjectContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import PlanningList from './PlanningList';
import Image from 'next/image';
import { withBasePath } from '@/shared/url/withBasePath';

interface PlanningSectionProps {
  list: { title: string; desc: string[] }[];
  image: string;
  imageStyle: string;
}

const PlanningSection = ({ list, image, imageStyle }: PlanningSectionProps) => {
  return (
    <section className="pb-10 md:pb-25">
      <SectionGradientLine height="1" container="project" />
      <SectionProjectContainer>
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-0">
          <div className={imageStyle}>
            <Image
              src={withBasePath(image)}
              alt="Planning"
              fill
              className="object-cover rounded-secondary"
            />
          </div>
          <div className="w-full max-w-140 lg:w-fit">
            <SectionTitle marginBottom="24px">Planning</SectionTitle>
            <PlanningList list={list} />
          </div>
        </div>
      </SectionProjectContainer>
    </section>
  );
};

export default PlanningSection;
