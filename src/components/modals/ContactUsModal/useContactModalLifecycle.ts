'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';

import {
  CONTACT_PATH,
  CONTACT_RETURN_PATH_KEY,
  CONTACT_SCROLL_Y_KEY,
  CONTACT_SUCCESS_FLAG,
  CONTACT_SUCCESS_PATH,
  SCROLL_RESTORE_DELAY_MS,
  SUCCESS_AUTO_CLOSE_MS,
  SUCCESS_CLOSE_ANIMATION_MS,
} from './modal.constants';
import { forceUnlockBodyScroll, lockBodyScroll, unlockBodyScroll } from './bodyScrollLock';

const normalizePathname = (path: string) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
};

const getSafeReturnPath = () => {
  const rawReturnPath = window.sessionStorage.getItem(CONTACT_RETURN_PATH_KEY) || '/';
  return rawReturnPath.startsWith('/contact') ? '/' : rawReturnPath;
};

const getSavedScrollY = () => {
  const savedScrollY = Number(window.sessionStorage.getItem(CONTACT_SCROLL_Y_KEY) || '0');
  return Number.isFinite(savedScrollY) ? savedScrollY : 0;
};

export const useContactModalLifecycle = () => {
  const router = useRouter();
  const pathname = usePathname();
  const normalizedPathname = normalizePathname(pathname || '/');
  const [isClosing, setIsClosing] = useState(false);
  const [shouldAnimateEnter] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    const isSuccessTransition =
      normalizePathname(window.location.pathname) === CONTACT_SUCCESS_PATH &&
      window.sessionStorage.getItem(CONTACT_SUCCESS_FLAG) === '1';

    return !isSuccessTransition;
  });

  const isSuccessRoute = normalizedPathname === CONTACT_SUCCESS_PATH;
  const isModalRoute = normalizedPathname === CONTACT_PATH || normalizedPathname === CONTACT_SUCCESS_PATH;
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
  }, [closeToReturnPath, isClosing]);

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
    router.replace(CONTACT_SUCCESS_PATH, { scroll: false });
  }, [router]);

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
      let returnPath = '/';
      const fromParam = new URL(window.location.href).searchParams.get('from');

      if (fromParam && fromParam.startsWith('/') && !fromParam.startsWith('/contact')) {
        returnPath = fromParam;
      }

      window.sessionStorage.setItem(CONTACT_RETURN_PATH_KEY, returnPath);
    }

    return () => {
      unlockBodyScroll();
    };
  }, [isModalRoute]);

  useEffect(() => {
    // Prevent direct access to /contact/success without a real successful submit.
    if (!isSuccessRoute || isClosing) {
      return;
    }

    const isAllowed = window.sessionStorage.getItem(CONTACT_SUCCESS_FLAG) === '1';
    if (!isAllowed) {
      router.replace(CONTACT_PATH, { scroll: false });
    }
  }, [isClosing, isSuccessRoute, router]);

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
