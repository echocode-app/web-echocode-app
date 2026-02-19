'use client';

import Link from 'next/link';
import { ReactNode } from 'react';
import clsx from 'clsx';
import { useContactHref } from '@/hooks/useContactHref';

interface Props {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  className?: string;
}

const ContactButton = ({ children, href, onClick, className }: Props) => {
  const contactHref = useContactHref();
  const baseClasses = clsx(
    `
    group relative z-0 inline-flex items-center rounded-full
    pl-6 h-14 overflow-hidden
    [background:var(--background-image-cta-default)]
    shadow-[var(--shadow-cta)]
    transform-gpu origin-center will-change-transform [backface-visibility:hidden]
    [transform:translateZ(0)_scale(1)]
    [transition:transform_620ms_cubic-bezier(0.16,1,0.3,1),box-shadow_620ms_cubic-bezier(0.16,1,0.3,1)]
    before:absolute before:inset-0
    before:[background:var(--background-image-cta-hover)]
    before:opacity-0 before:transition-opacity before:duration-800 before:ease-[cubic-bezier(0.4,0,0.2,1)]
    before:z-0
    hover:before:opacity-100 hover:shadow-[var(--shadow-cta-hover)] hover:[transform:translateZ(0)_scale(1.01)]
    focus-visible:before:opacity-100 focus-visible:shadow-[var(--shadow-cta-hover)] focus-visible:[transform:translateZ(0)_scale(1.01)]
    focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/70
    `,
    className
  );
  if (href) {
    const resolvedHref = href.startsWith('/contact') ? contactHref : href;

    return (
      <Link href={resolvedHref} scroll={false} className={baseClasses}>
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
