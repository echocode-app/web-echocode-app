/* eslint-disable @next/next/no-img-element */
'use client';

import { ReactNode } from 'react';

import { useFirstVisitLoader } from './useFirstVisitLoader';

type SplashLoaderProps = {
  children: ReactNode;
};

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const splashLogoSrc = `${basePath}/UI/print_transparent.svg`;

const SplashLoader = ({ children }: SplashLoaderProps) => {
  const { isContentVisible, isOverlayVisible, shouldAnimateLogo } = useFirstVisitLoader();

  return (
    <>
      <div
        aria-hidden="true"
        role="presentation"
        className={['splash-loader', isOverlayVisible ? 'is-visible' : ''].filter(Boolean).join(' ')}
      >
        <img
          src={splashLogoSrc}
          alt="Echocode"
          className={['splash-logo', shouldAnimateLogo ? 'is-animating' : ''].filter(Boolean).join(' ')}
        />
      </div>

      <div className={['splash-loader-content', isContentVisible ? 'is-visible' : 'is-hidden'].join(' ')}>
        {children}
      </div>
    </>
  );
};

export default SplashLoader;
