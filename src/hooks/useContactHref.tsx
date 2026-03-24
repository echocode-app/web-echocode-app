'use client';

import { useMemo } from 'react';
import { usePathname } from 'next/navigation';
import {
  CONTACT_ROUTE_CONFIGS,
  DEFAULT_CONTACT_ROUTE_CONFIG,
  type ContactRouteConfig,
} from '@/components/modals/ContactUsModal/modal.constants';

const normalizePathname = (path: string | null) => {
  if (!path || path === '/') {
    return '/';
  }

  return path.endsWith('/') ? path.slice(0, -1) : path;
};

const isContactRoute = (pathname: string, routeConfig: ContactRouteConfig) =>
  pathname === routeConfig.contactPath || pathname === routeConfig.successPath;

const getContactRouteConfig = (pathname: string) =>
  CONTACT_ROUTE_CONFIGS.find(
    (routeConfig) => pathname === routeConfig.returnPath || isContactRoute(pathname, routeConfig),
  ) ?? DEFAULT_CONTACT_ROUTE_CONFIG;

export const useContactHref = () => {
  const pathname = usePathname();

  return useMemo(() => {
    const normalizedPathname = normalizePathname(pathname);
    const routeConfig = getContactRouteConfig(normalizedPathname);

    if (isContactRoute(normalizedPathname, routeConfig)) {
      return routeConfig.contactPath;
    }

    if (normalizedPathname === routeConfig.returnPath) {
      return routeConfig.contactPath;
    }

    return `${routeConfig.contactPath}?from=${encodeURIComponent(normalizedPathname)}`;
  }, [pathname]);
};
