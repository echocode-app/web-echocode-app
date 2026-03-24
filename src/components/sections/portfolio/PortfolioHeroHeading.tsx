'use client';

import { useEffect, useRef, useState } from 'react';

const HERO_LINES = ['WE EMPOWER BUSINESSES TO', 'EMBRACE A MOBILE-FIRST', 'STRATEGY'] as const;
const FULL_TEXT = HERO_LINES.join(' ');

const TYPING_SPEED = 150;
const EASE_FACTOR = 0.9;
const HERO_TYPED_KEY = 'echocode:portfolio-hero:typed';
const HERO_RELOAD_HANDLED_AT_KEY = 'echocode:portfolio-hero:reloadHandledAt';

const headingClasses = `
  font-title
  font-bold
  leading-[1.3]
  text-title-3xl
  md:text-title-5xl
  xl:text-[56px]
`;

const cursorClasses = `
  inline-block
  align-[-0.08em]
  w-0.5
  h-[0.92em]
  bg-white
  animate-[blink_1s_infinite]
`;

const PortfolioHeroHeading = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const typingTimerRef = useRef<number | null>(null);
  const isTypingRef = useRef(false);

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(media.matches);

    const navigationEntry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined;
    const isReload = navigationEntry?.type === 'reload';
    const currentLoadId = String(performance.timeOrigin);

    let isAlreadyTyped = false;
    try {
      isAlreadyTyped = sessionStorage.getItem(HERO_TYPED_KEY) === '1';
      const reloadHandledAt = sessionStorage.getItem(HERO_RELOAD_HANDLED_AT_KEY);

      if (isReload && reloadHandledAt !== currentLoadId) {
        sessionStorage.removeItem(HERO_TYPED_KEY);
        sessionStorage.setItem(HERO_RELOAD_HANDLED_AT_KEY, currentLoadId);
        isAlreadyTyped = false;
      }
    } catch {}

    if (isAlreadyTyped) {
      setDisplayedText(FULL_TEXT);
      setIsFinished(true);
      return () => {
        if (typingTimerRef.current !== null) {
          window.clearTimeout(typingTimerRef.current);
        }
      };
    }

    const startTyping = () => {
      if (isTypingRef.current) {
        return;
      }
      isTypingRef.current = true;

      if (media.matches) {
        setDisplayedText(FULL_TEXT);
        setIsFinished(true);
        try {
          sessionStorage.setItem(HERO_TYPED_KEY, '1');
        } catch {}
        return;
      }

      let i = 0;
      let delay = TYPING_SPEED;

      const type = () => {
        setDisplayedText(FULL_TEXT.slice(0, i));
        i++;

        if (i <= FULL_TEXT.length) {
          delay = delay * EASE_FACTOR + 5;
          typingTimerRef.current = window.setTimeout(type, delay);
        } else {
          setIsFinished(true);
          try {
            sessionStorage.setItem(HERO_TYPED_KEY, '1');
          } catch {}
        }
      };

      type();
    };

    window.addEventListener('splash:finished', startTyping);

    if (!document.documentElement.classList.contains('splash')) {
      startTyping();
    }

    return () => {
      window.removeEventListener('splash:finished', startTyping);
      if (typingTimerRef.current !== null) {
        window.clearTimeout(typingTimerRef.current);
      }
      isTypingRef.current = false;
    };
  }, []);

  const firstLineLength = HERO_LINES[0].length;
  const secondLineLength = HERO_LINES[1].length;
  const firstLineText = displayedText.slice(0, firstLineLength);
  const secondLineText =
    displayedText.length > firstLineLength
      ? displayedText.slice(firstLineLength + 1, firstLineLength + 1 + secondLineLength)
      : '';
  const thirdLineText =
    displayedText.length > firstLineLength + secondLineLength + 1
      ? displayedText.slice(firstLineLength + secondLineLength + 2)
      : '';
  const activeLine =
    displayedText.length <= firstLineLength
      ? 1
      : displayedText.length <= firstLineLength + secondLineLength + 1
        ? 2
        : 3;
  const shouldShowCursor = !isReducedMotion && !isFinished;

  return (
    <div className="relative text-center">
      <div
        aria-hidden="true"
        className={`${headingClasses} text-transparent select-none xl:hidden`}
      >
        {FULL_TEXT}
      </div>
      <div
        aria-hidden="true"
        className={`${headingClasses} text-transparent select-none hidden xl:flex flex-col items-center`}
      >
        <span className="whitespace-nowrap">{HERO_LINES[0]}</span>
        <span className="whitespace-nowrap">{HERO_LINES[1]}</span>
        <span className="whitespace-nowrap">{HERO_LINES[2]}</span>
      </div>
      <h1
        className={`${headingClasses} absolute inset-0 text-white xl:hidden`}
        aria-label={FULL_TEXT}
      >
        {displayedText}
        {shouldShowCursor && <span className={cursorClasses} />}
      </h1>
      <h1
        className={`${headingClasses} absolute inset-0 text-white hidden xl:flex flex-col items-center`}
        aria-label={FULL_TEXT}
      >
        <span className="whitespace-nowrap">
          {firstLineText}
          {shouldShowCursor && activeLine === 1 && <span className={cursorClasses} />}
        </span>
        <span className="whitespace-nowrap">
          {secondLineText}
          {shouldShowCursor && activeLine === 2 && <span className={cursorClasses} />}
        </span>
        <span className="whitespace-nowrap">
          {thirdLineText}
          {shouldShowCursor && activeLine === 3 && <span className={cursorClasses} />}
        </span>
      </h1>
    </div>
  );
};

export default PortfolioHeroHeading;
