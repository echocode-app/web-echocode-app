'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

export const useContactHref = () => {
  const pathname = usePathname();

  return useMemo(() => {
    if (!pathname) {
      return '/contact';
    }

    if (pathname.startsWith('/contact')) {
      return '/contact';
    }

    if (pathname === '/') {
      return '/contact';
    }

    return `/contact?from=${encodeURIComponent(pathname)}`;
  }, [pathname]);
};
