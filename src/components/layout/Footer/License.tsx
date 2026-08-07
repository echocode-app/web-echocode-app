import Link from 'next/link';

const CITY_CENTER_LINKS = [
  {
    label: 'KYIV',
    href: 'https://www.google.com/maps/search/?api=1&query=Kyiv',
  },
  {
    label: 'ALICANTE',
    href: 'https://www.google.com/maps/search/?api=1&query=Alicante',
  },
] as const;

const License = () => {
  const START_YEAR = 2024;
  const CURRENT_YEAR = String(new Date().getFullYear());

  return (
    <div className="flex justify-between items-center flex-col md:flex-row font-extra text-[10px] ">
      <p className="flex-1 mb-2 md:mb-0 text-center md:text-start">
        © <time dateTime={String(START_YEAR)}>{START_YEAR}</time>-
        <time dateTime={CURRENT_YEAR}>{CURRENT_YEAR}</time> ECHOCODE. ALL RIGHTS RESERVED.
      </p>
      <Link
        href="/privacy-policy"
        className="w-fit mx-auto mb-2 md:mb-0 uppercase underline text-center
        transition-colors duration-main
        hover:text-accent
        focus-visible:text-accent
        focus-visible:outline-none"
      >
        Privacy Policy
      </Link>
      <p className="flex-1 text-center md:text-end">
        {CITY_CENTER_LINKS.map(({ label, href }, index) => (
          <span key={label} className="inline-flex items-center">
            {index > 0 ? <span className="px-1">|</span> : null}
            <Link
              href={href}
              target="_blank"
              rel="noreferrer"
              className="
                transition-colors duration-main
                hover:text-accent
                focus-visible:text-accent
                focus-visible:outline-none
              "
            >
              {label}
            </Link>
          </span>
        ))}
      </p>
    </div>
  );
};

export default License;
