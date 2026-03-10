'use client';

import type { RefObject } from 'react';

import { useBufferedVideoReveal } from '@/hooks/useBufferedVideoReveal';

import { markHeroBackgroundReady } from './heroBackground.shared';

export function useHeroBackgroundVideo(videoRef: RefObject<HTMLVideoElement | null>) {
  return useBufferedVideoReveal(videoRef, {
    requiredBufferedSeconds: 2.5,
    fallbackMs: 4500,
    playAttemptDelayMs: 250,
    playbackRate: 0.75,
    fallbackOnPlaybackWait: false,
    onSkipped: markHeroBackgroundReady,
    onReady: markHeroBackgroundReady,
  });
}
