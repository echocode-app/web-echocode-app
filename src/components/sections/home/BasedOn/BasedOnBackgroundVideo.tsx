'use client';

import { useEffect, useRef, useState } from 'react';
import { withBasePath } from '@/shared/url/withBasePath';

const BasedOnBackgroundVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!window.matchMedia('(min-width: 768px)').matches) return;
    if (!containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setShouldLoadVideo(true);
        observer.disconnect();
      },
      {
        root: null,
        rootMargin: '350px 0px',
        threshold: 0,
      },
    );

    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-360 h-full pointer-events-none"
      aria-hidden="true"
    >
      {shouldLoadVideo ? (
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="none"
          disablePictureInPicture
          controlsList="nodownload noplaybackrate noremoteplayback"
          tabIndex={-1}
        >
          <source src={withBasePath('/videos/video-ios-bg.mp4')} type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
};

export default BasedOnBackgroundVideo;
