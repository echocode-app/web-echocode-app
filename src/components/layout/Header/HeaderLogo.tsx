'use client';

import Logo from '@/components/UI/Logo';
import Link from 'next/link';

const HeaderLogo = () => {
  const scrollToTop = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <Link href="/" className="flex items-center z-10" onClick={scrollToTop}>
      <Logo />
    </Link>
  );
};

export default HeaderLogo;
