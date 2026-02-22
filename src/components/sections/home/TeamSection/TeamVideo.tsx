'use client';

import { useEffect, useRef, useState } from 'react';

import VideoLoader from '@/components/UI/loaders/VideoLoader';
import { withBasePath } from '@/shared/url/withBasePath';

const TeamVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const node = containerRef.current;

    if (!node || typeof window === 'undefined') {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const timeoutId = globalThis.setTimeout(() => {
        setShouldLoad(true);
      }, 0);

      return () => {
        globalThis.clearTimeout(timeoutId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setShouldLoad(true);
        observer.disconnect();
      },
      {
        threshold: 0.01,
        rootMargin: '700px 0px',
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-40.5 sm:min-h-50.5 md:min-h-85
       md:w-173 md:h-90 md:px-11 md:pb-5
     overflow-hidden bg-black rounded-secondary"
    >
      {shouldLoad && !loaded && <VideoLoader />}

      {shouldLoad && (
        <video
          loop
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          preload="auto"
          onLoadedData={() => setLoaded(true)}
          className={`w-full h-full object-cover transition-opacity duration-main 
           ${loaded ? 'opacity-100' : 'opacity-0'}`}
        >
          <source src={withBasePath('/videos/video-team.mp4')} type="video/mp4" />
        </video>
      )}
    </div>
  );
};

export default TeamVideo;
