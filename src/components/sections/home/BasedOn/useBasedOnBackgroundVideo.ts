'use client';

import type { RefObject } from 'react';

import { useBufferedVideoReveal } from '@/hooks/useBufferedVideoReveal';

export function useBasedOnBackgroundVideo(
  containerRef: RefObject<HTMLDivElement | null>,
  videoRef: RefObject<HTMLVideoElement | null>,
) {
  return useBufferedVideoReveal(videoRef, {
    containerRef,
    minWidthPx: 768,
    intersectionRootMargin: '350px 0px',
    intersectionThreshold: 0,
    requiredBufferedSeconds: 3,
    fallbackMs: 2500,
    playAttemptDelayMs: 250,
  });
}
