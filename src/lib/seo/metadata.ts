import type { Metadata } from 'next';

import { withBasePath } from '@/shared/url/withBasePath';

export const SEO_SITE_NAME = 'Echocode.app';
export const SEO_BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://echocode.app';
const DEFAULT_OG_IMAGE = '/images/fulllogo.png';

type PageMetadataInput = {
  title: string;
  description: string;
  path: string;
  image?: string;
  keywords?: string[];
};

export const toAbsoluteUrl = (path: string) => {
  const normalizedPath = withBasePath(path);
  return new URL(normalizedPath, SEO_BASE_URL).toString();
};

export function buildPageMetadata({
  title,
  description,
  path,
  image = DEFAULT_OG_IMAGE,
  keywords,
}: PageMetadataInput): Metadata {
  const canonicalUrl = toAbsoluteUrl(path);
  const imageUrl = toAbsoluteUrl(image);
  const fullTitle = `${title} | ${SEO_SITE_NAME}`;

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: fullTitle,
      description,
      url: canonicalUrl,
      siteName: SEO_SITE_NAME,
      locale: 'en_US',
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
  };
}
