import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import ExploreIcon from '../../home/ExploreSection/ExploreIcon';
import { withBasePath } from '@/shared/url/withBasePath';

interface ProjectItemProps {
  image: string;
  title: string;
  id: string;
  children: ReactNode;
}

const ProjectItem = ({ image, title, id, children }: ProjectItemProps) => {
  return (
    <li
      className="flex flex-col items-center lg:items-stretch lg:flex-row gap-5 relative w-full pt-6
before:absolute before:left-0 before:top-0 before:h-0.5 before:w-full
before:bg-main-gradient before:content-[''] before:animate-[section-gradient-drift_5s_ease-in-out_infinite] before:bg-size-[200%_200%]"
    >
      <div className="relative w-full max-w-122 aspect-488/306 rounded-secondary">
        <Image
          src={withBasePath(image)}
          alt={title}
          sizes="320px"
          fill
          className="object-cover rounded-secondary"
        />
      </div>
      <div className="w-full flex gap-2 justify-between">
        <div className="flex mx-auto lg:mx-0 flex-col gap-6 lg:gap-3 max-w-122.5">
          <div>
            <h3
              className="font-title 
          block text-title-2xl md:text-title-4xl font-title text-white mb-6"
            >
              {title}
            </h3>
            <div className="mb-6">{children}</div>
            <span className="block lg:hidden min-w-23.5 uppercase text-gray60 font-semibold">
              Mobile App
            </span>
          </div>
          <Link
            href={`/portfolio/${id}`}
            className="mt-auto group relative flex items-center justify-between lg:mx-0 w-48 h-13.5 px-6 py-4
                 font-title text-title-sm text-white rounded-base overflow-hidden duration-main shadow-main "
          >
            <div className="absolute inset-0 bg-accent transition-opacity duration-main" />
            <div className="absolute inset-0 bg-main-gradient animate-[section-gradient-drift_5s_ease-in-out_infinite] bg-size-[200%_200%] opacity-0 group-hover:opacity-100 transition-opacity duration-main" />
            <div className="absolute inset-0.5 bg-black rounded-[calc(var(--radius-base)-2px)] z-0" />
            <span className="relative z-10 group-hover:text-accent duration-main">VIEW MORE</span>
            <div className="relative z-10">
              <ExploreIcon />
            </div>
          </Link>
        </div>
        <span className="hidden lg:block min-w-23.5 uppercase text-gray60 font-semibold">
          Mobile App
        </span>
      </div>
    </li>
  );
};

export default ProjectItem;
