'use client';

import { useEffect, useRef } from 'react';

const HeroBackground = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const video = videoRef.current;

    video.playbackRate = 0.75;

    const playPromise = video.play();

    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // autoplay might be blocked
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        disablePictureInPicture
        controls={false}
        preload="auto"
        className="w-full h-full object-cover opacity-80"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-hero-overlay pointer-events-none" />
    </div>
  );
};

export default HeroBackground;
