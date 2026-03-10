'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface FooterNavLinkProps {
  children: ReactNode;
  link: string;
}

const FooterNavLink = ({ children, link }: FooterNavLinkProps) => {
  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <li onClick={scrollToTop}>
      <Link
        href={link}
        className="block w-full text-main-base text-base-gray hover:text-accent duration-main"
      >
        {children}
      </Link>
    </li>
  );
};

export default FooterNavLink;
