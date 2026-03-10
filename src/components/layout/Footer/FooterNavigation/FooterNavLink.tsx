'use client';

import { ReactNode } from 'react';
import Link from 'next/link';

interface FooterNavLinkProps {
  children: ReactNode;
  link: string;
}

const FooterNavLink = ({ children, link }: FooterNavLinkProps) => {
  const scrollToTop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <li>
      <Link
        href={link}
        onClick={scrollToTop}
        className="block w-full text-main-base text-base-gray hover:text-accent duration-main"
      >
        {children}
      </Link>
    </li>
  );
};

export default FooterNavLink;
