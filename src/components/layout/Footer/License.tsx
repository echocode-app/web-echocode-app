import Link from 'next/link';

const CITY_CENTER_LINKS = [
  {
    label: 'KYIV',
    href: 'https://www.google.com/maps/search/?api=1&query=Kyiv+city+center',
  },
  {
    label: 'BERLIN',
    href: 'https://www.google.com/maps/search/?api=1&query=Berlin+city+center',
  },
] as const;

const License = () => {
  const START_YEAR = 2024;

  return (
    <div className="flex flex-col md:flex-row md:justify-between font-extra text-[10px]">
      <p className="mb-3 md:mb-0 text-center">
        © <time dateTime={`${START_YEAR}`}>{START_YEAR}</time> ECHOCODE. ALL RIGHTS RESERVED.
      </p>
      <p className="flex items-center justify-center text-center">
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
