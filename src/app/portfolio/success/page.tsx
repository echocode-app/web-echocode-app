import type { Metadata } from 'next';

import PortfolioPage from '../page';
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
    canonical: toAbsoluteUrl('/portfolio/'),
  },
};

export default function PortfolioSuccessPage() {
  return <PortfolioPage />;
}
