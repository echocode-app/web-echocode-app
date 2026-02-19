'use client';

import Link from 'next/link';

import { type MouseEvent, useCallback, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { usePathname, useRouter } from 'next/navigation';

import ContactUsForm from './ContactUsForm';
import CloseBtn from './ContactUsForm/CloseBtn';
import SectionTitle from '@/components/UI/section/SectionTitle';
import { useEscapeKey } from '@/hooks/useEscapeKey';

const CONTACT_PATH = '/contact';
const CONTACT_SUCCESS_PATH = '/contact/success';
const CONTACT_SUCCESS_FLAG = 'contact_success_allowed';
const CONTACT_SCROLL_Y_KEY = 'contact_modal_scroll_y';
const CONTACT_RETURN_PATH_KEY = 'contact_modal_return_path';

const ContactUsModal = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [shouldAnimateEnter] = useState(() => {
    if (typeof window === 'undefined') {
      return true;
    }

    const isSuccessTransition =
      window.location.pathname === CONTACT_SUCCESS_PATH &&
      window.sessionStorage.getItem(CONTACT_SUCCESS_FLAG) === '1';

    return !isSuccessTransition;
  });

  const isContactRoute = pathname === CONTACT_PATH;
  const isSuccessRoute = pathname === CONTACT_SUCCESS_PATH;
  const isModalRoute = isContactRoute || isSuccessRoute;

  const clearModalSessionState = useCallback(() => {
    window.sessionStorage.removeItem(CONTACT_SUCCESS_FLAG);
    window.sessionStorage.removeItem(CONTACT_SCROLL_Y_KEY);
    window.sessionStorage.removeItem(CONTACT_RETURN_PATH_KEY);
  }, []);

  const closeToHomeWithScrollRestore = useCallback(() => {
    const savedScrollY = Number(window.sessionStorage.getItem(CONTACT_SCROLL_Y_KEY) || '0');
    const returnPath = window.sessionStorage.getItem(CONTACT_RETURN_PATH_KEY) || '/';

    router.replace(returnPath, { scroll: false });

    window.setTimeout(() => {
      clearModalSessionState();
      window.scrollTo({ top: Number.isFinite(savedScrollY) ? savedScrollY : 0, behavior: 'auto' });
    }, 80);
  }, [clearModalSessionState, router]);

  const closeByButton = useCallback(() => {
    if (isSuccessRoute) {
      closeToHomeWithScrollRestore();
      return;
    }

    clearModalSessionState();
    router.back();
  }, [clearModalSessionState, closeToHomeWithScrollRestore, isSuccessRoute, router]);

  const closeByBackdropOrEsc = useCallback(() => {
    if (isSuccessRoute) {
      return;
    }

    clearModalSessionState();
    router.back();
  }, [clearModalSessionState, isSuccessRoute, router]);

  useEscapeKey(closeByBackdropOrEsc);

  useEffect(() => {
    if (!isModalRoute) {
      return;
    }

    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    if (!window.sessionStorage.getItem(CONTACT_SCROLL_Y_KEY)) {
      window.sessionStorage.setItem(CONTACT_SCROLL_Y_KEY, String(window.scrollY));
    }

    if (!window.sessionStorage.getItem(CONTACT_RETURN_PATH_KEY)) {
      let returnPath = '/';

      const fromParam = new URL(window.location.href).searchParams.get('from');
      if (fromParam && fromParam.startsWith('/') && !fromParam.startsWith('/contact')) {
        returnPath = fromParam;
      } else if (document.referrer) {
        try {
          const ref = new URL(document.referrer);
          if (ref.origin === window.location.origin && !ref.pathname.startsWith('/contact')) {
            returnPath = `${ref.pathname}${ref.search}`;
          }
        } catch {
          returnPath = '/';
        }
      }

      window.sessionStorage.setItem(CONTACT_RETURN_PATH_KEY, returnPath);
    }

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, [isModalRoute]);

  useEffect(() => {
    if (!isSuccessRoute) {
      return;
    }

    const isAllowed = window.sessionStorage.getItem(CONTACT_SUCCESS_FLAG) === '1';
    if (!isAllowed) {
      router.replace(CONTACT_PATH, { scroll: false });
      return;
    }

    const timeoutId = window.setTimeout(() => {
      closeToHomeWithScrollRestore();
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [closeToHomeWithScrollRestore, isSuccessRoute, router]);

  const handleSuccessSubmit = useCallback(() => {
    window.sessionStorage.setItem(CONTACT_SUCCESS_FLAG, '1');
    router.replace(CONTACT_SUCCESS_PATH, { scroll: false });
  }, [router]);

  if (!isModalRoute) {
    return null;
  }

  return (
    <motion.div
      onClick={closeByBackdropOrEsc}
      className="fixed inset-0 z-200 flex items-center justify-center
         bg-black/50 backdrop-blur-[2px]"
      initial={shouldAnimateEnter ? { opacity: 0 } : false}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="px-4 md:px-8 max-w-280 w-full">
        <motion.div
          onClick={(e: MouseEvent<HTMLDivElement>) => e.stopPropagation()}
          className="relative  w-full flex flex-col mx-auto p-5 pt-10 md:pt-15 md:pb-15 md:px-5 lg:p-15
           rounded-secondary border bg-[rgba(0,0,0,0.8)] border-white backdrop-blur-[26px]"
          initial={shouldAnimateEnter ? { y: 20, opacity: 0 } : false}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 20, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div className="absolute top-1 right-2 md:top-4 md:right-4">
            <CloseBtn onClose={closeByButton} />
          </div>
          <div className=" md:mb-2.5">
            <SectionTitle>GOT A PROJECT IN MIND?</SectionTitle>
          </div>
          <div className="flex flex-wrap md:gap-1 text-main-sm mb-2 md:mb-8">
            <p className="text-white">
              Get professional advice. Use the form or write us an email:
            </p>
            <Link href={'mailto:hello@echocode.com'} className="font-semibold text-accent">
              hello@echocode.com
            </Link>
          </div>
          <ContactUsForm isSuccessRoute={isSuccessRoute} onSuccessSubmit={handleSuccessSubmit} />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ContactUsModal;
