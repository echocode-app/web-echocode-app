'use client';

import { useEffect, useRef, useState } from 'react';

const FULL_TEXT = 'SPECIALIZING IN FULL-CYCLE MOBILE APP DEVELOPMENT';

const TYPING_SPEED = 150;
const EASE_FACTOR = 0.9;

const headingClasses = `
  font-title
  font-bold
  leading-[1.3]
  text-[clamp(28px,5vw,var(--text-title-5xl))]
`;

const HeroHeading = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [isFinished, setIsFinished] = useState(false);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const typingTimerRef = useRef<number | null>(null);
  const hasStartedRef = useRef(false);

  useEffect(() => {
    const startTyping = () => {
      if (hasStartedRef.current) {
        return;
      }
      hasStartedRef.current = true;

      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setIsReducedMotion(media.matches);

      if (media.matches) {
        setDisplayedText(FULL_TEXT);
        setIsFinished(true);
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
    };
  }, []);

  return (
    <div className="relative text-center">
      <h1 className={`${headingClasses} text-transparent select-none`}>{FULL_TEXT}</h1>
      <h1 className={`${headingClasses} absolute inset-0 text-white`}>
        {displayedText}

        {!isReducedMotion && !isFinished && (
          <span
            className="
              inline-block
              w-0.5
              h-[1em]
              bg-white
              animate-[blink_1s_infinite]
            "
          />
        )}
      </h1>
    </div>
  );
};

export default HeroHeading;
