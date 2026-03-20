'use client';

import { useEffect } from 'react';

const HOME_NAVIGATION_SCROLL_RESET_KEY = 'home_navigation_scroll_reset';

export const markHomeNavigationScrollReset = () => {
  if (typeof window === 'undefined') {
    return;
  }

  window.sessionStorage.setItem(HOME_NAVIGATION_SCROLL_RESET_KEY, '1');
};

const HomeNavigationScrollReset = () => {
  useEffect(() => {
    const shouldReset = window.sessionStorage.getItem(HOME_NAVIGATION_SCROLL_RESET_KEY) === '1';
    if (!shouldReset) {
      return;
    }

    window.sessionStorage.removeItem(HOME_NAVIGATION_SCROLL_RESET_KEY);

    const html = document.documentElement;
    const previousInlineScrollBehavior = html.style.scrollBehavior;

    html.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, behavior: 'auto' });

    const restore = () => {
      html.style.scrollBehavior = previousInlineScrollBehavior;
    };

    const firstFrame = window.requestAnimationFrame(() => {
      const secondFrame = window.requestAnimationFrame(restore);

      return () => {
        window.cancelAnimationFrame(secondFrame);
      };
    });

    return () => {
      window.cancelAnimationFrame(firstFrame);
      restore();
    };
  }, []);

  return null;
};

export default HomeNavigationScrollReset;
