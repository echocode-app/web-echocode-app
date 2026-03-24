'use client';

import Logo from '@/components/UI/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { markHomeNavigationScrollReset } from '@/components/layout/HomeNavigationScrollReset';
import Image from 'next/image';

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
    <div className="flex flex-col gap-2 items-center z-10 mb-6 md:mb-0">
      <Link href={'/'} onClick={handleClick} className="group">
        <Logo />
        <span className="flex justify-center gap-2 mt-2 font-wadik text-title-xs text-accent">
          <span
            className="bg-main-gradient bg-clip-text text-transparent bg-main-gradient-animated 
          animate-[section-gradient-drift_5s_ease-in-out_infinite] bg-size-[200%_200%]"
          >
            .APP
          </span>
          <Image
            src={'/UI/link-icon-gradient.svg'}
            alt="Rigth Arrow"
            width={10}
            height={10}
            className="group-hover:scale-120 duration-main  will-change-transform"
          />
        </span>
      </Link>
      <Link
        href={'https://www.echocode.digital/'}
        target="blank"
        rel="noreferrer"
        className="group flex gap-2 font-wadik text-title-xs text-accent"
      >
        <span className="text-black">.DIGITAL</span>
        <Image
          src={'/UI/link-icon-black.svg'}
          alt="Rigth Arrow"
          width={10}
          height={10}
          className="group-hover:scale-120 duration-main  will-change-transform"
        />
      </Link>
    </div>
  );
};

export default FooterLogo;
