'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { markHomeNavigationScrollReset } from '@/components/layout/HomeNavigationScrollReset';

interface FooterNavLinkProps {
  children: ReactNode;
  link: string;
}

const FooterNavLink = ({ children, link }: FooterNavLinkProps) => {
  const pathname = usePathname();

  const handleHomeClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (link !== '/') {
      return;
    }

    if (pathname !== '/') {
      markHomeNavigationScrollReset();
      return;
    }

    event.preventDefault();

    if (window.location.hash) {
      window.history.replaceState(null, '', '/');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link
      href={link}
      onClick={handleHomeClick}
      className="block w-full text-main-base text-base-gray hover:text-accent duration-main"
    >
      {children}
    </Link>
  );
};

export default FooterNavLink;
