import type { MetadataRoute } from 'next';

import { SEO_BASE_URL } from '@/lib/seo/metadata';

export const dynamic = 'force-static';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/contact/', '/contact/success/', '/portfolio/contact/', '/portfolio/success/'],
    },
    sitemap: `${SEO_BASE_URL}/sitemap.xml`,
    host: SEO_BASE_URL,
  };
}
