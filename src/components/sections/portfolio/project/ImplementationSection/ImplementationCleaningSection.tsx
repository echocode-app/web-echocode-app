import Image from 'next/image';

import SectionProjectContainer from '@/components/UI/section/SectionProjectContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import ImplementationCleaningList from './ImplementationCleaningList';
import { withBasePath } from '@/shared/url/withBasePath';

const ImplementationCleaningSection = () => {
  return (
    <section className="pb-10 md:pb-31">
      <SectionGradientLine height="1" container="project" />
      <SectionProjectContainer>
        <SectionTitle marginBottom="40px">Implementation</SectionTitle>
        <div className="flex gap-10 lg:gap-0 flex-col lg:flex-row items-center lg:justify-between">
          <div className="relative aspect-426/324 w-full min-[458px]:w-106.5 min-[458px]:h-81">
            <Image
              src={withBasePath('/images/projects/cleaning/implementation-cleaning.jpg')}
              alt="Implementation"
              fill
              sizes="426px"
              className="object-cover rounded-secondary"
            />
          </div>
          <div>
            <h3 className="font-title text-[#E3E4E6] mb-6">The development phase involved:</h3>
            <ImplementationCleaningList />
          </div>
        </div>
      </SectionProjectContainer>
    </section>
  );
};

export default ImplementationCleaningSection;
