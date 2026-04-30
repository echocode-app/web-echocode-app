'use client';

import { ReactNode, useState } from 'react';
import Link from 'next/link';

import SectionGradientLine from '@/components/UI/section/SectionGradientLine';
import SectionContainer from '@/components/UI/section/SectionContainer';

type PrivacySection = {
  title: string;
  paragraphs?: string[];
  bullets?: string[];
};

type LegalSectionProps = {
  intro: string;
  sections: PrivacySection[];
  effectiveDate: string;
};

const emailPattern = /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi;

function renderTextWithEmailLinks(text: string) {
  const matches = Array.from(text.matchAll(emailPattern));

  if (matches.length === 0) {
    return text;
  }

  const nodes: ReactNode[] = [];
  let lastIndex = 0;

  matches.forEach((match, index) => {
    const email = match[0];
    const start = match.index ?? 0;

    if (start > lastIndex) {
      nodes.push(text.slice(lastIndex, start));
    }

    nodes.push(
      <Link
        key={`${email}-${index}`}
        href={`mailto:${email}`}
        className="underline underline-offset-2"
        onClick={(event) => event.stopPropagation()}
      >
        {email}
      </Link>,
    );

    lastIndex = start + email.length;
  });

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

const LegalDropdown = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <li
      onClick={() => setIsOpen((current) => !current)}
      className="p-3 border border-main-border rounded-secondary cursor-pointer hover:border-accent duration-main"
    >
      <div className="flex items-center justify-between gap-4">
        <h3 className="font-title">{title}</h3>
        <span
          aria-hidden="true"
          className={`text-gray75 text-main-base transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          ^
        </span>
      </div>
      <div
        className={`grid overflow-hidden duration-400 ease-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100 mt-3' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div
            className={`text-primary-base text-gray75 duration-400 ease-out ${
              isOpen ? 'translate-y-0' : '-translate-y-2'
            }`}
          >
            {children}
          </div>
        </div>
      </div>
    </li>
  );
};

const LegalSection = ({ intro, sections, effectiveDate }: LegalSectionProps) => {
  return (
    <section className="pt-10 pb-5 md:pb-19.5">
      <SectionContainer>
        <div className="p-3 mb-7 border border-main-border rounded-secondary">
          <p className="text-primary-base text-gray75">{intro}</p>
        </div>
        <SectionGradientLine height="1" fullWidth />
        <ul className="flex flex-col gap-6 mb-6">
          {sections.map((section) => (
            <LegalDropdown key={section.title} title={section.title}>
              <div className="flex flex-col gap-4">
                {section.paragraphs?.map((paragraph) => (
                  <p key={paragraph}>{renderTextWithEmailLinks(paragraph)}</p>
                ))}
                {section.bullets?.length ? (
                  <ul className="flex flex-col gap-3">
                    {section.bullets.map((bullet) => (
                      <li key={bullet} className="flex gap-2">
                        <div className="w-1 h-1 bg-gray75 rounded-full mt-2 shrink-0" />
                        <p className="text-primary-base text-gray75">
                          {renderTextWithEmailLinks(bullet)}
                        </p>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </LegalDropdown>
          ))}
        </ul>
        <p className="mb-7 font-medium">{effectiveDate}</p>
      </SectionContainer>
    </section>
  );
};

export default LegalSection;
