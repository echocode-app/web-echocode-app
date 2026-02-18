import HeroBackground from './HeroBackground';
import HeroContent from './HeroContent';
import { preload } from 'react-dom';

const Hero = () => {
  preload('/videos/hero-bg.mp4', { as: 'video', type: 'video/mp4' });

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
