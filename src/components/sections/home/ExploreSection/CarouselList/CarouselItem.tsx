import Image from '@/components/UI/AppImage';

interface CarouselItemProps {
  image: string;
  desc: string;
  scale?: number;
}

const CarouselItem = ({ image, desc, scale = 1 }: CarouselItemProps) => {
  return (
    <li
      className="w-33 h-20 px-5 py-4 mr-4 bg-accent rounded-secondary hover:bg-transparent duration-main 
      border-accent border hover:border-accent"
    >
      <div className="relative w-22 h-full">
        <Image src={image} fill sizes="88px" alt={desc} style={{ scale: scale }} className="object-contain" />
      </div>
    </li>
  );
};

export default CarouselItem;
