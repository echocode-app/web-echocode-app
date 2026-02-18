import SectionContainer from '@/components/UI/section/SectionContainer';
import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionTitle from '@/components/UI/section/SectionTitle';
import CareerList from './CareerList';

const CareerSection = () => {
  return (
    <section id="career" className="pb-10 md:pb-30 scroll-mt-33">
      <SectionGradientLine height="2" />
      <SectionContainer>
        <div className="mb-3">
          <SectionTitle>Career</SectionTitle>
        </div>
        <p className="max-w-105 md:max-w-150 mb-10 font-title text-title-xs md:text-title-base text-accent">
          If you have something exciting in mind, write us an email or any other messenger
        </p>
        <CareerList />
        <p className="text-center text-main-xs md:text-main-base text-gray60 uppercase font-semibold">
          We look forward to engaging with your ideas and exploring potential opportunities. Our
          doors are always open!
        </p>
      </SectionContainer>
    </section>
  );
};

export default CareerSection;
