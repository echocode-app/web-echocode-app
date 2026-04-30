import TypedHeroHeading from '@/components/UI/TypedHeroHeading';
import SectionContainer from '@/components/UI/section/SectionContainer';
import Image from 'next/image';

type HeroSectionProps = {
  title: string;
  imageAlt: string;
};

const titleClassName =
  'text-title-3xl md:text-title-5xl leading-[30px] md:leading-[66px] lg:text-title-6xl font-title text-center md:text-left uppercase';

const HeroSection = ({ title, imageAlt }: HeroSectionProps) => {
  return (
    <section className="pt-33 md:pt-33.5 md:pb-9.75">
      <SectionContainer>
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="max-w-170 mb-4">
            <TypedHeroHeading text={title} className={titleClassName} />
          </div>
          <div className="relative mb-4 md:mb-0 w-45 h-56.75 md:w-55.5 md:min-w-55.5 md:h-69.25">
            <Image
              src="/images/rabbits/hero/privacy.png"
              alt={imageAlt}
              fill
              priority
              className="object-cover"
            />
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default HeroSection;
