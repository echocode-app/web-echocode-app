'use client';

import Logo from '@/components/UI/Logo';
import Link from 'next/link';

const FooterLogo = () => {
  const scrollToTop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link
      href={'/'}
      className="flex flex-col gap-2.5 items-center z-10 mb-6 md:mb-0"
      onClick={scrollToTop}
    >
      <Logo />
      <p className="font-title text-accent">Echocode.app</p>
    </Link>
  );
};

export default FooterLogo;
