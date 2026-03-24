'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  CONTACT_ROUTE_CONFIGS,
  CONTACT_RETURN_PATH_KEY,
  CONTACT_SCROLL_Y_KEY,
  CONTACT_SUCCESS_FLAG,
  DEFAULT_CONTACT_ROUTE_CONFIG,
  SCROLL_RESTORE_DELAY_MS,
  SUCCESS_AUTO_CLOSE_MS,
  SUCCESS_CLOSE_ANIMATION_MS,
  type ContactRouteConfig,
} from './modal.constants';
import { forceUnlockBodyScroll, lockBodyScroll, unlockBodyScroll } from './bodyScrollLock';

const normalizePathname = (path: string) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
};

const isModalRouteForConfig = (pathname: string, routeConfig: ContactRouteConfig) =>
  pathname === routeConfig.contactPath || pathname === routeConfig.successPath;

const getRouteConfig = (pathname: string) =>
  CONTACT_ROUTE_CONFIGS.find(
    (routeConfig) => pathname === routeConfig.returnPath || isModalRouteForConfig(pathname, routeConfig)
  ) ?? DEFAULT_CONTACT_ROUTE_CONFIG;

const getSafeReturnPath = () => {
  const rawReturnPath = normalizePathname(window.sessionStorage.getItem(CONTACT_RETURN_PATH_KEY) || '/');
  const routeConfig = getRouteConfig(rawReturnPath);

  return isModalRouteForConfig(rawReturnPath, routeConfig) ? routeConfig.returnPath : rawReturnPath;
};

const getSavedScrollY = () => {
  const savedScrollY = Number(window.sessionStorage.getItem(CONTACT_SCROLL_Y_KEY) || '0');
  return Number.isFinite(savedScrollY) ? savedScrollY : 0;
};

export const useContactModalLifecycle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname || '/');
  const routeConfig = getRouteConfig(normalizedPathname);
  const [isClosing, setIsClosing] = useState(false);
  const [shouldAnimateEnter] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    const isSuccessTransition =
      normalizePathname(window.location.pathname) === getRouteConfig(normalizePathname(window.location.pathname)).successPath &&
      window.sessionStorage.getItem(CONTACT_SUCCESS_FLAG) === '1';

    return !isSuccessTransition;
  });

  const isSuccessRoute = normalizedPathname === routeConfig.successPath;
  const isModalRoute = isModalRouteForConfig(normalizedPathname, routeConfig);
  const shouldAnimateClosing = isClosing && isSuccessRoute;

  const clearSession = useCallback(() => {
    window.sessionStorage.removeItem(CONTACT_SUCCESS_FLAG);
    window.sessionStorage.removeItem(CONTACT_SCROLL_Y_KEY);
    window.sessionStorage.removeItem(CONTACT_RETURN_PATH_KEY);
  }, []);

  const closeToReturnPath = useCallback(() => {
    // Route first, then unlock/restore scroll to avoid a visible jump during transition.
    const returnPath = getSafeReturnPath();
    const savedScrollY = getSavedScrollY();

    router.replace(returnPath, { scroll: false });

    window.setTimeout(() => {
      clearSession();
      forceUnlockBodyScroll();
      window.scrollTo({ top: savedScrollY, behavior: 'auto' });
    }, SCROLL_RESTORE_DELAY_MS);
  }, [clearSession, router]);

  const closeSuccessFlowSmoothly = useCallback(() => {
    if (isClosing) {
      return;
    }

    // Keep success state visible during fade-out before unmounting modal route.
    setIsClosing(true);
    window.setTimeout(() => {
      closeToReturnPath();
    }, SUCCESS_CLOSE_ANIMATION_MS);
  }, [closeToReturnPath, isClosing, setIsClosing]);

  const closeNormalFlow = useCallback(() => {
    closeToReturnPath();
  }, [closeToReturnPath]);

  const closeByButton = useCallback(() => {
    if (isSuccessRoute) {
      closeSuccessFlowSmoothly();
      return;
    }

    closeNormalFlow();
  }, [closeNormalFlow, closeSuccessFlowSmoothly, isSuccessRoute]);

  const closeByBackdropOrEsc = useCallback(() => {
    if (isSuccessRoute) {
      return;
    }

    closeNormalFlow();
  }, [closeNormalFlow, isSuccessRoute]);

  const onSuccessSubmit = useCallback(() => {
    setIsClosing(false);
    window.sessionStorage.setItem(CONTACT_SUCCESS_FLAG, '1');
    router.replace(routeConfig.successPath, { scroll: false });
  }, [routeConfig.successPath, router, setIsClosing]);

  useEffect(() => {
    if (!isModalRoute) {
      forceUnlockBodyScroll();
      return;
    }

    lockBodyScroll();

    if (!window.sessionStorage.getItem(CONTACT_SCROLL_Y_KEY)) {
      window.sessionStorage.setItem(CONTACT_SCROLL_Y_KEY, String(window.scrollY));
    }

    // Store the route where the user came from to guarantee a deterministic close behavior.
    if (!window.sessionStorage.getItem(CONTACT_RETURN_PATH_KEY)) {
      let returnPath = routeConfig.returnPath;
      const fromParam = new URL(window.location.href).searchParams.get('from');
      const normalizedFromPath = fromParam ? normalizePathname(fromParam) : null;

      if (
        normalizedFromPath &&
        normalizedFromPath.startsWith('/') &&
        !isModalRouteForConfig(normalizedFromPath, getRouteConfig(normalizedFromPath))
      ) {
        returnPath = normalizedFromPath;
      }

      window.sessionStorage.setItem(CONTACT_RETURN_PATH_KEY, returnPath);
    }

    return () => {
      unlockBodyScroll();
    };
  }, [isModalRoute, routeConfig.returnPath]);

  useEffect(() => {
    // Prevent direct access to /contact/success without a real successful submit.
    if (!isSuccessRoute || isClosing) {
      return;
    }

    const isAllowed = window.sessionStorage.getItem(CONTACT_SUCCESS_FLAG) === '1';
    if (!isAllowed) {
      router.replace(routeConfig.contactPath, { scroll: false });
    }
  }, [isClosing, isSuccessRoute, routeConfig.contactPath, router]);

  useEffect(() => {
    if (!isSuccessRoute) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      closeSuccessFlowSmoothly();
    }, SUCCESS_AUTO_CLOSE_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [closeSuccessFlowSmoothly, isSuccessRoute]);

  return {
    isModalRoute,
    isSuccessRoute,
    shouldAnimateEnter,
    shouldAnimateClosing,
    closeByButton,
    closeByBackdropOrEsc,
    onSuccessSubmit,
  };
};
