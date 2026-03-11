'use client';

import Image from 'next/image';
import { useRef } from 'react';

import { ATTACHMENT_ACCEPT } from './contactForm.constants';

type ContactFileProps = {
  file: File | null;
  error?: string;
  disabled?: boolean;
  onBlur?: () => void;
  onChange: (file: File | null) => void;
};

const ContactFile = ({ file, error, disabled = false, onBlur, onChange }: ContactFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative w-full">
      <input
        id="contact-file"
        ref={inputRef}
        type="file"
        accept={ATTACHMENT_ACCEPT}
        className="hidden"
        aria-label="Attach file"
        title="Attach file"
        onBlur={onBlur}
        disabled={disabled}
        onChange={(event) => {
          const nextFile = event.target.files?.[0] ?? null;
          onChange(nextFile);
          event.currentTarget.value = '';
        }}
      />

      <button
        type="button"
        disabled={disabled}
        onClick={() => inputRef.current?.click()}
        aria-label="Attach file"
        title="Attach file"
        className="
          flex h-11 md:h-12.5 items-center gap-1 pl-4 pr-6 w-full text-left border rounded-secondary leading-3.5
          hover:border-accent focus:border-accent duration-main transition-colors
          outline-0 text-[10px] font-title text-white placeholder:text-white
          border-white cursor-pointer disabled:cursor-not-allowed disabled:opacity-70
        "
      >
        <div className="relative w-4.5 h-4.5">
          <Image src={'/UI/clip.svg'} alt="Clip" fill />
        </div>
        <span className="text-white truncate uppercase font-bold">
          {file?.name ?? 'ATTACH YOUR FILE'}
        </span>
      </button>

      <p
        className={`min-h-4 mt-1 ml-2 lg:ml-4 text-main-xs leading-4 transition-opacity ${
          error ? 'text-[#d96e6e] opacity-100' : 'opacity-0'
        }`}
        aria-live="polite"
      >
        {error ?? ' '}
      </p>
    </div>
  );
};

export default ContactFile;
