import Image from '@/components/UI/AppImage';

interface CarouselItemProps {
  image: string;
  desc: string;
  scale?: number;
}

const CarouselItem = ({ image, desc, scale = 1 }: CarouselItemProps) => {
  return (
    <li
      className="w-25 h-14 px-3 py-1 mr-3
      md:w-33 md:h-20 md:px-5 md:py-4 md:mr-4 
      items-center justify-center
      bg-accent rounded-secondary hover:bg-transparent duration-main 
      border-accent border hover:border-accent"
    >
      <div className="relative m-auto w-18 md:w-22 h-full">
        <Image src={image} fill sizes="88px" alt={desc} style={{ scale: scale }} className="object-contain" />
      </div>
    </li>
  );
};

export default CarouselItem;
