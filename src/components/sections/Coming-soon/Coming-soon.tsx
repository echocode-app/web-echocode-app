'use client';

import { useEffect, useState } from 'react';
import Image from '@/components/UI/AppImage';
import Link from 'next/link';

const ComingSoon = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const scrollThreshold = 10;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > scrollThreshold);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrollThreshold]);

  return (
    <section className="w-full pt-33">
      <Link
        href="https://www.echocode.digital/"
        target="_blank"
        rel="noopener noreferrer"
        className="
          coming-soon-gradient
          group relative block w-full
          h-10 lg:h-14
        "
      >
        <div className="relative mx-auto flex h-full max-w-360 items-center justify-center">
          <span
            className="
              font-title text-black uppercase leading-6 font-bold
              text-[clamp(18px,3vw,24px)] duration-main
              md:group-hover:text-white
            "
          >
            Coming Soon
          </span>

          <span
            className={`pointer-events-none select-none absolute hidden md:block -top-9 right-[6%] h-23 w-40 lg:-top-6 lg:right-[20%] xl:right-[24%] lg:h-24 lg:w-41.5 ${
              isScrolled ? 'z-10' : 'z-110'
            }`}
          >
            <Image
              src="/UI/rabbits/rabbit-coming.png"
              alt="Rabbit coming soon"
              fill
              priority
              fetchPriority="high"
              sizes="(min-width: 1024px) 166px, 160px"
              className="object-cover object-bottom"
            />
          </span>
        </div>
      </Link>
    </section>
  );
};

export default ComingSoon;
