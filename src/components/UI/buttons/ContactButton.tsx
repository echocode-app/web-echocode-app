import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const ContactButton = ({ children, href, onClick, className }: Props) => {
  const baseClasses = clsx(
    `
    group inline-flex items-center rounded-full
    pl-6 h-14
    transition-all duration-main
    [background:var(--background-image-cta-default)]
    shadow-[var(--shadow-cta)]
    md:hover:scale-[1.04]
    md:hover:[background:var(--background-image-cta-hover)]
    md:hover:shadow-[var(--shadow-cta-hover)]
    `,
    className
  );
  if (href) {
    return (
      <Link href={href} scroll={false} className={baseClasses}>
        {children}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={baseClasses}>
      {children}
    </button>
  );
};

export default ContactButton;
