'use client';

import HeroOrbSvg from '@/components/UI/hero-background/HeroOrbSvg';

const AmbientHeroBackground = () => {
  return (
    <div
      aria-hidden="true"
      className="
        hero-background-orb
        absolute inset-x-0 top-31
        h-[48vh] w-full max-h-173.5
        md:top-20 md:h-[76vh]
        xl:top-18 xl:h-120
        -z-10
      "
    >
      <div className="hero-background-orb__inner">
        <div className="hero-background-glow hero-background-glow--primary" />
        <HeroOrbSvg className="hero-background-svg hero-background-svg--base" />
      </div>
    </div>
  );
};

export default AmbientHeroBackground;
