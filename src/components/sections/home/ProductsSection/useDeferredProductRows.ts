'use client';

import { useEffect, useState, type RefObject } from 'react';

import {
  HERO_BACKGROUND_READY_EVENT,
  type HeroReadyWindow,
} from '@/components/sections/home/Hero/heroBackground.shared';

import { PRODUCT_ROWS } from './productsSection.shared';

type UseDeferredProductRowsResult = {
  visibleRows: number;
};

export function useDeferredProductRows(
  sectionRef: RefObject<HTMLElement | null>,
): UseDeferredProductRowsResult {
  const [isHeroReady, setIsHeroReady] = useState(false);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [visibleRows, setVisibleRows] = useState(0);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const syncHeroState = () => {
      setIsHeroReady(true);
    };

    if ((window as HeroReadyWindow).__ECHOCODE_HERO_READY__) {
      const frameId = window.requestAnimationFrame(syncHeroState);

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    window.addEventListener(HERO_BACKGROUND_READY_EVENT, syncHeroState, { once: true });

    return () => {
      window.removeEventListener(HERO_BACKGROUND_READY_EVENT, syncHeroState);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const node = sectionRef.current;
    if (!node || !('IntersectionObserver' in window)) {
      const frameId = window.requestAnimationFrame(() => {
        setIsNearViewport(true);
      });

      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) {
          return;
        }

        setIsNearViewport(true);
        observer.disconnect();
      },
      {
        rootMargin: '350px 0px',
        threshold: 0,
      },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [sectionRef]);

  useEffect(() => {
    if (!isHeroReady || !isNearViewport) {
      return;
    }

    let cancelled = false;
    const timers: number[] = [];

    PRODUCT_ROWS.forEach((_, index) => {
      const timer = window.setTimeout(() => {
        if (cancelled) {
          return;
        }

        setVisibleRows((current) => Math.max(current, index + 1));
      }, index * 180);

      timers.push(timer);
    });

    return () => {
      cancelled = true;
      timers.forEach(window.clearTimeout);
    };
  }, [isHeroReady, isNearViewport]);

  return {
    visibleRows,
  };
}
