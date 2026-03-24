import Image from '@/components/UI/AppImage';

interface ServiceItemProps {
  image: string;
  desc: string;
}

const ServiceItem = ({ image, desc }: ServiceItemProps) => {
  return (
    <li
      className="w-20 h-20 md:w-24 md:h-24 flex justify-center items-center p-3 mr-3 md:mr-4 bg-gray7 rounded-secondary
     hover:bg-accent duration-main hover:scale-106"
    >
      <div className="relative w-14 h-14 md:w-18 md:h-18 rounded-secondary">
        <Image
          src={image}
          fill
          alt={desc}
          sizes="72px"
          loading="lazy"
          className="object-contain rounded-secondary"
        />
      </div>
    </li>
  );
};

export default ServiceItem;
