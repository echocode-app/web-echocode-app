'use client';

import { usePathname } from 'next/navigation';

import NavLink from './NavLink';

const NavList = () => {
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
    <nav>
      <ul className="flex gap-4 lg:gap-2.5">
        {links.map(({ href, label }) => (
          <li key={href}>
            <NavLink link={href}>{label}</NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default NavList;
