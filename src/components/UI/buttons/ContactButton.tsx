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
    group relative z-0 inline-flex items-center rounded-full
    pl-6 h-14 overflow-hidden
    [background:var(--background-image-cta-default)]
    shadow-[var(--shadow-cta)]
    transform-gpu will-change-transform
    transition-[box-shadow,transform] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]
    before:absolute before:inset-0
    before:[background:var(--background-image-cta-hover)]
    before:opacity-0 before:transition-opacity before:duration-700 before:ease-[cubic-bezier(0.22,1,0.36,1)]
    before:z-0
    hover:before:opacity-100 hover:shadow-[var(--shadow-cta-hover)] hover:scale-[1.015]
    focus-visible:before:opacity-100 focus-visible:shadow-[var(--shadow-cta-hover)] focus-visible:scale-[1.015]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
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
