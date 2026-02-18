import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionTitle from '@/components/UI/section/SectionTitle';
import { basedOnData } from '@/data/based-on.data';
import BasedOnBackgroundVideo from './BasedOnBackgroundVideo';
import BasedOnCard from './BasedOnCard';

const BasedOnSection = () => {
  return (
    <section className="relative w-full py-10 pt-14 lg:pb-30 lg:pt-15 overflow-hidden bg-black">
      <BasedOnBackgroundVideo />

      <div className="absolute inset-0 bg-video-gradient" />

      <SectionContainer>
        <div className="relative z-10">
          <div className="mb-7 md:mb-10 text-center">
            <SectionTitle>BASED ON</SectionTitle>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5">
            {basedOnData.map((item) => (
              <BasedOnCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default BasedOnSection;
