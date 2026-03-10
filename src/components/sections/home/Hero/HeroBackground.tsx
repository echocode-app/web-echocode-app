'use client';

import { useRef } from 'react';

import { withBasePath } from '@/shared/url/withBasePath';

import { useHeroBackgroundVideo } from './useHeroBackgroundVideo';

const HeroBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { shouldLoadVideo, isVideoVisible } = useHeroBackgroundVideo(videoRef);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          controls={false}
          preload="auto"
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isVideoVisible ? 'opacity-80' : 'opacity-0'
          }`}
        >
          <source src={withBasePath('/videos/hero-bg.mp4')} type="video/mp4" />
        </video>
      ) : null}

      <div className="absolute inset-0 bg-hero-overlay pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
