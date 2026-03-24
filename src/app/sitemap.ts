import type { MetadataRoute } from 'next';

import { SEO_BASE_URL } from '@/lib/seo/metadata';

export const dynamic = 'force-static';

const STATIC_ROUTES = [
  '/',
  '/portfolio/',
  '/portfolio/cleaning/',
  '/portfolio/e-commers/',
  '/portfolio/food/',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return STATIC_ROUTES.map((route) => ({
    url: new URL(route, SEO_BASE_URL).toString(),
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : route === '/portfolio/' ? 0.9 : 0.8,
  }));
}
