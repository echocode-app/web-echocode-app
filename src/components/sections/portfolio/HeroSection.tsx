import Image from 'next/image';

import SectionContainer from '@/components/UI/section/SectionContainer';

import ContactButton from '@/components/UI/buttons/ContactButton';
import PortfolioHeroHeading from './PortfolioHeroHeading';

const HeroSection = () => {
  return (
    <section className="py-10 md:pt-14 md:pb-21 overflow-hidden">
      <SectionContainer>
        <PortfolioHeroHeading />
        <p className="text-center mt-5">
          Explore our portfolio to find the solution tailored to your needs
        </p>
        <div className="my-10 flex justify-center">
          <div className="relative inline-flex">
            <Image
              src="/UI/backgrounds/circles-bg.png"
              alt=""
              width={400}
              height={168}
              className="
            absolute left-1/2 -translate-x-1/2 -bottom-4 w-[170%] max-w-170
            pointer-events-none opacity-60 -z-10"
            />
            <ContactButton href="/contact">
              <div className="relative z-10 flex gap-2 md:gap-4 items-center justify-between">
                <span className="font-title font-bold uppercase tracking-[0.04em] text-white">
                  Contact us
                </span>
                <span
                  className="
          flex items-center justify-center 
          w-14 h-14 
          rounded-full bg-black
          border-2 border-accent
          transition-colors duration-500 ease-out
          md:group-hover:border-accent
          md:group-focus-visible:border-accent"
                >
                  <Image
                    src="/UI/contact.svg"
                    width={26}
                    height={22}
                    alt="Contact"
                    className="w-6.5 h-5.5"
                  />
                </span>
              </div>
            </ContactButton>
          </div>
        </div>
      </SectionContainer>
    </section>
  );
};

export default HeroSection;
