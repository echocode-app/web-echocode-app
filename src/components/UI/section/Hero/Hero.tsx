import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      <HeroBackground />

      <div className="relative z-10 min-h-[60vh] xl:min-h-155 flex">
        <div className="w-full max-w-300 mx-auto px-6 md:px-10">
          <HeroContent />
        </div>
      </div>
    </section>
  );
};

export default Hero;
