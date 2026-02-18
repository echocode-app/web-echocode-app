'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
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

          <Image
            src="/UI/rabbits/rabbit-coming.png"
            alt="Rabbit coming soon"
            width={166}
            height={95}
            priority
            fetchPriority="high"
            className={`pointer-events-none w-40 lg:w-auto h-auto select-none absolute hidden md:block -top-26 lg:-top-29 right-[10%] lg:right-[20%] ${
              isScrolled ? 'z-10' : 'z-110'
            }`}
          />
        </div>
      </Link>
    </section>
  );
};

export default ComingSoon;
