'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  ALLOWED_DOCUMENT_MIME_TYPES,
  ALLOWED_IMAGE_MIME_TYPES,
} from '@/shared/validation/submissions.files';

type ContactFileProps = {
  fileName: string | null;
  error?: string;
  onFileChange: (file: File | null) => void;
};

const ContactFile = ({ fileName, error, onFileChange }: ContactFileProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div>
      <input
        id="attachment"
        name="attachment"
        ref={inputRef}
        type="file"
        accept={[...ALLOWED_DOCUMENT_MIME_TYPES, ...ALLOWED_IMAGE_MIME_TYPES].join(',')}
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          onFileChange(file ?? null);
        }}
      />

      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="
         flex items-center gap-1 py-4 pl-4 pr-6 w-full text-left border rounded-secondary leading-3.5 
         hover:border-accent focus:border-accent duration-main transition-colors
       outline-0 text-[10px] font-title text-white placeholder:text-white 
        border-white cursor-pointer
        "
      >
        <div className="relative w-4.5 h-4.5">
          <Image src={'/UI/clip.svg'} alt="Clip" fill />
        </div>
        <span className="text-white truncate">{fileName ?? 'Attach your file (optional)'}</span>
      </button>
      {error ? <p className="mt-1 text-main-xs text-[#ff8d8d]">{error}</p> : null}
    </div>
  );
};

export default ContactFile;
