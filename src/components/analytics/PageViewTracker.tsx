'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

import { SPLASH_FINISHED_EVENT, trackPageView } from '@/lib/analytics/siteAnalytics';

const PageViewTracker = () => {
  const pathname = usePathname();
  const lastTrackedRouteRef = useRef<string | null>(null);

  useEffect(() => {
    const routeKey = pathname;
    if (lastTrackedRouteRef.current === routeKey) {
      return;
    }

    const trackCurrentRoute = () => {
      if (lastTrackedRouteRef.current === routeKey) {
        return;
      }

      lastTrackedRouteRef.current = routeKey;
      void trackPageView();
    };

    if (document.documentElement.classList.contains('splash')) {
      window.addEventListener(SPLASH_FINISHED_EVENT, trackCurrentRoute, { once: true });

      return () => {
        window.removeEventListener(SPLASH_FINISHED_EVENT, trackCurrentRoute);
      };
    }

    trackCurrentRoute();
  }, [pathname]);

  return null;
};

export default PageViewTracker;
