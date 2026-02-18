import Image from 'next/image';

interface ServiceItemProps {
  image: string;
  desc: string;
}

const ServiceItem = ({ image, desc }: ServiceItemProps) => {
  return (
    <li
      className="w-24 h-24 flex justify-center items-center p-3 mr-4 bg-gray7 rounded-secondary
     hover:bg-accent duration-main"
    >
      <div className="relative w-18 h-18 rounded-secondary">
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
