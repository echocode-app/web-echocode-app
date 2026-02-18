import ServiceItem from './ProductItem';

interface ProductListProps {
  list: { image: string; desc: string }[];
  directionReverse?: boolean;
}

const ProductList = ({ list, directionReverse }: ProductListProps) => {
  const doubled = [...list, ...list];

  return (
    <div className="overflow-hidden group mask-[linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)]">
      <ul
        className={`flex w-max ${
          directionReverse
            ? 'animate-[marquee-reverse_140s_linear_infinite]'
            : 'animate-[marquee_140s_linear_infinite]'
        } group-hover:[animation-play-state:paused]`}
      >
        {doubled.map(({ image, desc }, i) => (
          <ServiceItem key={i} image={image} desc={desc} />
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
