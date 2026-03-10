import Image from 'next/image';

interface CarouselItemProps {
  image: string;
  desc: string;
  scale?: number;
}

const CarouselItem = ({ image, desc, scale = 1 }: CarouselItemProps) => {
  return (
    <li
      className="w-28 h-18 p-2 mr-3
      md:w-33 md:h-20 md:px-5 md:py-4 md:mr-4 
      items-center justify-center
      bg-accent rounded-secondary hover:bg-transparent duration-main 
      border-accent border hover:border-accent"
    >
      <div className="relative m-auto w-20 md:w-22 h-full">
        <Image
          src={image}
          fill
          sizes="88px"
          alt={desc}
          style={{ scale: scale }}
          className="object-contain"
        />
      </div>
    </li>
  );
};

export default CarouselItem;
