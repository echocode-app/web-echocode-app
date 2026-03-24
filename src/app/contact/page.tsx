import type { Metadata } from 'next';

import Home from '../page';
import { toAbsoluteUrl } from '@/lib/seo/metadata';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
  alternates: {
    canonical: toAbsoluteUrl('/'),
  },
};

export default function ContactPage() {
  return <Home />;
}
