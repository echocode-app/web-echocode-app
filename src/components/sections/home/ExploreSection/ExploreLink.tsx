import Link from 'next/link';
import ExploreIcon from './ExploreIcon';

const ExploreLink = () => {
  return (
    <Link
      href={'/contact'}
      scroll={false}
      className="group relative flex items-center justify-between mx-auto lg:mx-0 w-59.25 h-13.5 px-6 py-4
                 font-title text-title-sm text-white rounded-base overflow-hidden duration-main shadow-main "
    >
      <div className="absolute inset-0 bg-accent transition-opacity duration-main" />
      <div className="absolute inset-0 bg-main-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-main" />
      <div className="absolute inset-0.5 bg-black rounded-[calc(var(--radius-base)-2px)] z-0" />
      <span className="relative z-10 group-hover:text-accent duration-main">Explore more</span>
      <div className="relative z-10">
        <ExploreIcon />
      </div>
    </Link>
  );
};

export default ExploreLink;
