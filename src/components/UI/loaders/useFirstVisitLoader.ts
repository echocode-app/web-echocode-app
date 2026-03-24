'use client';

import { useEffect, useRef, useState } from 'react';

const SESSION_KEY = 'echocode:splash:lastSeen';
const HERO_TYPED_KEY = 'echocode:hero:typed';
const SESSION_TIMEOUT_MS = 45 * 60 * 1000;
const LOGO_ANIMATION_MS = 3000;
const LOGO_ANIMATION_MS_REDUCED = 200;

type LoaderPhase = 'playing' | 'done';

const shouldRunLoader = (now: number) => {
  const rawTimestamp = sessionStorage.getItem(SESSION_KEY);
  const lastSeenTimestamp = rawTimestamp ? Number(rawTimestamp) : 0;

  if (!lastSeenTimestamp || Number.isNaN(lastSeenTimestamp)) {
    return true;
  }

  return now - lastSeenTimestamp > SESSION_TIMEOUT_MS;
};

export const useFirstVisitLoader = () => {
  const [phase, setPhase] = useState<LoaderPhase>('done');
  const timeoutRefs = useRef<number[]>([]);

  useEffect(() => {
    const root = document.documentElement;
    const now = Date.now();
    let shouldShow = true;
    let prefersReducedMotion = false;

    try {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      shouldShow = root.classList.contains('splash') || shouldRunLoader(now);
    } catch {
      shouldShow = true;
    }

    const finishSplash = () => {
      root.classList.remove('splash');
      window.dispatchEvent(new Event('splash:finished'));
    };

    if (!shouldShow) {
      finishSplash();
      return;
    }

    root.classList.add('splash');

    try {
      sessionStorage.setItem(SESSION_KEY, String(now));
      sessionStorage.removeItem(HERO_TYPED_KEY);
    } catch {}

    const logoDuration = prefersReducedMotion ? LOGO_ANIMATION_MS_REDUCED : LOGO_ANIMATION_MS;
    const startTimer = window.setTimeout(() => {
      setPhase('playing');
    }, 0);

    const doneTimer = window.setTimeout(() => {
      setPhase('done');
      finishSplash();
    }, logoDuration);

    timeoutRefs.current.push(startTimer, doneTimer);

    return () => {
      timeoutRefs.current.forEach(window.clearTimeout);
      timeoutRefs.current = [];
    };
  }, []);

  return {
    isContentVisible: phase === 'done',
    isOverlayVisible: phase === 'playing',
    shouldAnimateLogo: phase === 'playing',
  };
};

export { SESSION_KEY, SESSION_TIMEOUT_MS };
