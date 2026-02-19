import services from './services.json';

import ServiceItem from './CarouselItem';

const CarouselList = () => {
  const doubled = [...services, ...services];

  return (
    <div className="overflow-hidden group mask-[linear-gradient(to_right,transparent_0%,black_20%,black_80%,transparent_100%)]">
      <ul
        className="flex w-max h-20
          animate-[marquee-reverse_50s_linear_infinite]
         group-hover:[animation-play-state:paused]"
      >
        {doubled.map((items, i) => (
          <ServiceItem key={i} {...items} />
        ))}
      </ul>
    </div>
  );
};

export default CarouselList;
