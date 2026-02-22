import Image from '@/components/UI/AppImage';
import Link from 'next/link';

interface SocialLinkItemProps {
  image: string;
  title: string;
  link: string;
  width: string;
}

const SocialLinkItem = ({ image, title, link, width }: SocialLinkItemProps) => {
  return (
    <li>
      <Link
        href={link}
        target="blank"
        className="group flex items-center gap-3 px-3 py-2 border-l border-accent "
      >
        <div
          className="flex justify-center items-center w-10 h-10 bg-base-gray rounded-full 
        "
        >
          <div className="relative h-6" style={{ width: `${width}` + 'px' }}>
            <Image src={image} alt="/" fill />
          </div>
        </div>
        <p
          className="font-title text-title-sm sm:text-title-base underline
         group-hover:text-accent duration-main"
        >
          {title}
        </p>
      </Link>
    </li>
  );
};

export default SocialLinkItem;
