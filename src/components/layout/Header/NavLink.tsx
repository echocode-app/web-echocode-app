'use client';

import { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const navLinkHoverEffectClass =
  'transition-all duration-main ' +
  'group-hover:text-transparent group-hover:bg-clip-text group-hover:after:opacity-100 ' +
  'hover:text-transparent hover:bg-clip-text ' +
  'after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[-2px] after:h-px after:w-full ' +
  'after:bg-main-gradient after:opacity-0 after:transition-opacity ' +
  'after:duration-main hover:after:opacity-100';

export const navLinkBaseClass =
  'relative font-main uppercase text-main-sm font-semibold lg:text-main-base-link ' +
  'bg-main-gradient bg-clip-text bg-transparent ' +
  navLinkHoverEffectClass;

const navLinkActiveClass =
  'relative font-main uppercase text-main-sm font-semibold lg:text-main-base-link ' +
  'text-transparent bg-main-gradient bg-clip-text ' +
  'after:absolute after:left-1/2 after:-translate-x-1/2 after:-bottom-[-2px] ' +
  'after:h-px after:w-full after:bg-main-gradient after:opacity-100';

interface NavLinkProps {
  children: ReactNode;
  link: string;
}

const normalizePath = (value: string) => {
  if (!value || value === '/') {
    return '/';
  }

  return value.endsWith('/') ? value.slice(0, -1) : value;
};

const NavLink = ({ children, link }: NavLinkProps) => {
  const pathname = usePathname();
  const isHashLink = link.includes('#');
  const normalizedPathname = normalizePath(pathname || '/');
  const normalizedLink = normalizePath(link.split('#')[0] || '/');
  const isPortfolioRoute =
    normalizedPathname === '/portfolio' || normalizedPathname.startsWith('/portfolio/');
  const isActive = isPortfolioRoute && !isHashLink && normalizedPathname === normalizedLink;

  return (
    <Link href={link} data-text={children} className="block relative group lg:px-5 lg:py-2.5">
      <p className={isActive ? navLinkActiveClass : navLinkBaseClass}>{children}</p>
    </Link>
  );
};

export default NavLink;
