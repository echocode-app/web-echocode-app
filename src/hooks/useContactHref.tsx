'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';

const normalizePathname = (path: string | null) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
};

export const useContactHref = () => {
  const pathname = usePathname();

  return useMemo(() => {
    const normalizedPathname = normalizePathname(pathname);

    if (normalizedPathname.startsWith('/contact')) {
      return '/contact';
    }

    if (normalizedPathname === '/') {
      return '/contact';
    }

    return `/contact?from=${encodeURIComponent(normalizedPathname)}`;
  }, [pathname]);
};
