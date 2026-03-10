'use client';

import { useEffect, useState, type RefObject } from 'react';

type NetworkNavigator = Navigator & {
  connection?: {
    saveData?: boolean;
  };
};

type UseBufferedVideoRevealOptions = {
  containerRef?: RefObject<HTMLElement | null>;
  minWidthPx?: number;
  intersectionRootMargin?: string;
  intersectionThreshold?: number;
  requiredBufferedSeconds?: number;
  fallbackMs?: number;
  playAttemptDelayMs?: number;
  playbackRate?: number;
  fallbackOnPlaybackWait?: boolean;
  onSkipped?: () => void;
  onReady?: () => void;
};

type UseBufferedVideoRevealResult = {
  shouldLoadVideo: boolean;
  isVideoVisible: boolean;
};

export function useBufferedVideoReveal(
  videoRef: RefObject<HTMLVideoElement | null>,
  {
    containerRef,
    minWidthPx,
    intersectionRootMargin = '350px 0px',
    intersectionThreshold = 0,
    requiredBufferedSeconds = 3,
    fallbackMs = 2500,
    playAttemptDelayMs = 250,
    playbackRate,
    fallbackOnPlaybackWait = true,
    onSkipped,
    onReady,
  }: UseBufferedVideoRevealOptions = {},
): UseBufferedVideoRevealResult {
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [isVideoVisible, setIsVideoVisible] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const connection = (navigator as NetworkNavigator).connection;
    const meetsWidth =
      minWidthPx == null || window.matchMedia(`(min-width: ${minWidthPx}px)`).matches;

    if (!meetsWidth || reducedMotion || connection?.saveData) {
      onSkipped?.();
      return;
    }

    if (!containerRef) {
      const frameId = globalThis.requestAnimationFrame(() => {
        setShouldLoadVideo(true);
      });

      return () => {
        globalThis.cancelAnimationFrame(frameId);
      };
    }

    const node = containerRef.current;
    if (!node) {
      return;
    }

    if (!('IntersectionObserver' in window)) {
      const frameId = globalThis.requestAnimationFrame(() => {
        setShouldLoadVideo(true);
      });

      return () => {
        globalThis.cancelAnimationFrame(frameId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        globalThis.requestAnimationFrame(() => {
          setShouldLoadVideo(true);
        });

        observer.disconnect();
      },
      {
        root: null,
        rootMargin: intersectionRootMargin,
        threshold: intersectionThreshold,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [containerRef, intersectionRootMargin, intersectionThreshold, minWidthPx, onSkipped]);

  useEffect(() => {
    const video = videoRef.current;

    if (!shouldLoadVideo || !video) {
      return;
    }

    let isCancelled = false;
    let hasResolved = false;
    let fallbackTimer = 0;
    let playAttemptTimer = 0;

    const getBufferedAheadSeconds = () => {
      if (!Number.isFinite(video.currentTime) || video.buffered.length === 0) {
        return 0;
      }

      for (let index = 0; index < video.buffered.length; index += 1) {
        const start = video.buffered.start(index);
        const end = video.buffered.end(index);

        if (video.currentTime >= start && video.currentTime <= end) {
          return Math.max(0, end - video.currentTime);
        }
      }

      return 0;
    };

    const hasComfortableBuffer = () =>
      video.readyState >= HTMLMediaElement.HAVE_ENOUGH_DATA ||
      getBufferedAheadSeconds() >= requiredBufferedSeconds;

    const markFallback = () => {
      if (isCancelled || hasResolved) {
        return;
      }

      hasResolved = true;
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(playAttemptTimer);
      video.pause();
      onSkipped?.();
    };

    const markReady = async () => {
      if (isCancelled || hasResolved || !hasComfortableBuffer()) {
        return;
      }

      try {
        if (playbackRate != null) {
          video.playbackRate = playbackRate;
        }

        await video.play();
      } catch {
        markFallback();
        return;
      }

      if (isCancelled || hasResolved) {
        return;
      }

      hasResolved = true;
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(playAttemptTimer);
      setIsVideoVisible(true);
      onReady?.();
    };

    video.preload = 'auto';
    video.load();

    video.addEventListener('canplay', markReady);
    video.addEventListener('canplaythrough', markReady);
    video.addEventListener('progress', markReady);
    video.addEventListener('loadeddata', markReady);
    video.addEventListener('error', markFallback, { once: true });
    if (fallbackOnPlaybackWait) {
      video.addEventListener('stalled', markFallback, { once: true });
      video.addEventListener('waiting', markFallback, { once: true });
    }

    playAttemptTimer = window.setTimeout(() => {
      void markReady();
    }, playAttemptDelayMs);

    fallbackTimer = window.setTimeout(markFallback, fallbackMs);

    return () => {
      isCancelled = true;
      window.clearTimeout(fallbackTimer);
      window.clearTimeout(playAttemptTimer);
      video.removeEventListener('canplay', markReady);
      video.removeEventListener('canplaythrough', markReady);
      video.removeEventListener('progress', markReady);
      video.removeEventListener('loadeddata', markReady);
      video.removeEventListener('error', markFallback);
      if (fallbackOnPlaybackWait) {
        video.removeEventListener('stalled', markFallback);
        video.removeEventListener('waiting', markFallback);
      }
    };
  }, [
    fallbackOnPlaybackWait,
    fallbackMs,
    onReady,
    onSkipped,
    playAttemptDelayMs,
    playbackRate,
    requiredBufferedSeconds,
    shouldLoadVideo,
    videoRef,
  ]);

  return {
    shouldLoadVideo,
    isVideoVisible,
  };
}
