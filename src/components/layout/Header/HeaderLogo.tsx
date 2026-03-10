'use client';

import Logo from '@/components/UI/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const HeaderLogo = () => {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (pathname !== '/') {
      return;
    }

    event.preventDefault();

    if (window.location.hash) {
      window.history.replaceState(null, '', '/');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <Link href="/" onClick={handleClick} className="flex items-center z-10">
      <Logo />
    </Link>
  );
};

export default HeaderLogo;
