'use client';

import Logo from '@/components/UI/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { markHomeNavigationScrollReset } from '@/components/layout/HomeNavigationScrollReset';

const FooterLogo = () => {
  const pathname = usePathname();

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
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
      href={'/'}
      onClick={handleClick}
      className="flex flex-col gap-2.5 items-center z-10 mb-6 md:mb-0"
    >
      <Logo />
      <p className="font-title text-accent">Echocode.app</p>
    </Link>
  );
};

export default FooterLogo;
