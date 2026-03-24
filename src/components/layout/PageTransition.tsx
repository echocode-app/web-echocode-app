'use client';

import { ReactNode, useEffect } from 'react';
import { motion, useAnimationControls, useReducedMotion } from 'framer-motion';
import { usePathname } from 'next/navigation';

const normalizeTransitionKey = (pathname: string | null) => {
  if (!pathname || pathname === '/contact' || pathname === '/contact/success') {
    return '/';
  }

  if (pathname === '/portfolio/contact' || pathname === '/portfolio/success') {
    return '/portfolio';
  }

  return pathname;
};

interface PageTransitionProps {
  children: ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();
  const prefersReducedMotion = useReducedMotion();
  const controls = useAnimationControls();
  const transitionKey = normalizeTransitionKey(pathname);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    controls.set({ opacity: 0.98 });
    void controls.start({
      opacity: 1,
      transition: {
        duration: 0.4,
        ease: 'easeOut',
      },
    });
  }, [controls, prefersReducedMotion, transitionKey]);

  if (prefersReducedMotion) {
    return <>{children}</>;
  }

  return <motion.div animate={controls}>{children}</motion.div>;
};

export default PageTransition;
