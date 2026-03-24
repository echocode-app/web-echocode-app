'use client';

import { useRef } from 'react';
import { withBasePath } from '@/shared/url/withBasePath';

import { useBasedOnBackgroundVideo } from './useBasedOnBackgroundVideo';

const BasedOnBackgroundVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const { shouldLoadVideo, isVideoVisible } = useBasedOnBackgroundVideo(containerRef, videoRef);

  return (
    <div
      ref={containerRef}
      className="hidden md:block absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-full max-w-360 h-full pointer-events-none"
      aria-hidden="true"
    >
      {shouldLoadVideo ? (
        <video
          ref={videoRef}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isVideoVisible ? 'opacity-100' : 'opacity-0'
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
