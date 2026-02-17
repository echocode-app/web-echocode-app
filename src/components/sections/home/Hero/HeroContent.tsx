import HeroBadge from './HeroBadge';
import HeroCTASection from './HeroCTASection';
import HeroHeading from './HeroHeading';

const HeroContent = () => {
  return (
    <div
      className="
        pt-10 md:pt-14
        flex flex-col items-center text-center
      "
    >
      <div>
        <HeroBadge />
      </div>
      <div className="mt-6">
        <HeroHeading />
      </div>
      <div>
        <p
          className="
          font-main
          text-[clamp(12px,5vw,var(--text-main-base))]
          leading-(--text-main-base--line-height)
          text-gray-90
          max-w-150
          mt-5
        "
        >
          We handle projects of any complexity, from idea validation to full-scale production and
          post-launch support.
        </p>
      </div>
      <HeroCTASection />
    </div>
  );
};

export default HeroContent;
