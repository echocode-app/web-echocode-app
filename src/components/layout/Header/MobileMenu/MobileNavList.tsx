'use client';

import { Dispatch, SetStateAction } from 'react';
import { usePathname } from 'next/navigation';

import NavLink from '../NavLink';

interface MobileNavListProps {
  onClose: () => void;
  isOpenDropdown: boolean;
  setIsOpenDropdown: Dispatch<SetStateAction<boolean>>;
}

const MobileNavList = ({ onClose }: MobileNavListProps) => {
  const pathname = usePathname();
  const isPortfolioSection = pathname === '/portfolio' || pathname.startsWith('/portfolio/');

  const links = isPortfolioSection
    ? [
        { href: '/portfolio', label: 'Portfolio' },
        { href: '/portfolio/cleaning', label: 'Cleaning-APP' },
        { href: '/portfolio/e-commers', label: 'E-commerce' },
        { href: '/portfolio/food', label: 'Food & Drinks' },
      ]
    : [
        { href: '/#products', label: 'Products' },
        { href: '/#partnership', label: 'Partnership' },
        { href: '/#team', label: 'Team' },
        { href: '/#career', label: 'Career' },
        { href: '/#contacts', label: 'Contacts' },
        { href: '/portfolio', label: 'Portfolio' },
      ];

  return (
    <ul className="flex flex-col items-center gap-8">
      {links.map(({ href, label }) => (
        <li key={href} onClick={onClose}>
          <NavLink link={href}>{label}</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MobileNavList;
