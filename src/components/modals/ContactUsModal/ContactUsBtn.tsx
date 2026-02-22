'use client';

import Image from '@/components/UI/AppImage';
import Link from 'next/link';
import { useContactHref } from '@/hooks/useContactHref';

const ContactUsBtn = () => {
  const contactHref = useContactHref();

  return (
    <Link
      href={contactHref}
      scroll={false}
      className="
  w-60.5 shadow-main 
  relative z-0 overflow-hidden
  h-14 pl-6 flex items-center justify-between gap-4
  rounded-full bg-accent
  before:absolute before:inset-0
  before:bg-main-gradient
  before:opacity-0
  before:transition-opacity before:duration-300
  before:z-0
  hover:before:opacity-100
  "
    >
      <span className="block relative z-10 font-title text-title-base">Contact us</span>

      <div
        className="
    relative z-10
    flex justify-center items-center w-14 h-14
    bg-[#010101] rounded-full border-2 border-accent
    "
      >
        <div className="relative w-6.5 h-5.5">
          <Image src="/UI/contact.svg" alt="Contact Us" width={26} height={22} className="w-6.5 h-5.5" />
        </div>
      </div>
    </Link>
  );
};

export default ContactUsBtn;
