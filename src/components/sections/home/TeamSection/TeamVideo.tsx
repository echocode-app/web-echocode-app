'use client';

import { useState } from 'react';

import VideoLoader from '@/components/UI/loaders/VideoLoader';

const TeamVideo = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className="relative w-full min-h-40.5 sm:min-h-50.5 md:min-h-85
       md:w-173 md:h-90 md:px-11 md:pb-5
     overflow-hidden bg-black rounded-secondary"
    >
      {!loaded && <VideoLoader />}

      <video
        loop
        autoPlay
        muted
        playsInline
        disablePictureInPicture
        preload="auto"
        onCanPlay={() => setLoaded(true)}
        className={`w-full h-full object-cover transition-opacity duration-main 
           ${loaded ? 'opacity-100' : 'opacity-0'}`}
      >
        <source src="/videos/video-team.mp4" type="video/mp4" />
      </video>
    </div>
  );
};

export default TeamVideo;
