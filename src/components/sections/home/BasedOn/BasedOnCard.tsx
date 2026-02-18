import { BasedOnItem } from '@/data/based-on.data';

interface Props {
  item: BasedOnItem;
}

const BasedOnCard = ({ item }: Props) => {
  return (
    <div
      className="
        based-card-hover group relative
        h-48 sm:h-52 md:h-52
        p-2.5 sm:p-3.5 md:p-3 lg:p-5
        rounded-(--radius-secondary)
        flex flex-col justify-center
        text-center
      "
    >
      <div className="flex flex-col items-center">

        <h3
          className="
            based-card-title
            font-title uppercase text-white
            text-[18px] sm:text-[clamp(14px,3vw,20px)]
            leading-[1.2] md:leading-[1.3] lg:leading-7.5
          "
        >
          {item.title}
        </h3>

        <p
          className="
            based-card-description
            font-main text-[14px] sm:text-[clamp(12px,2vw,16px)] md:text-[14px] lg:text-[16px]
            leading-[1.3] sm:leading-[1.35] lg:leading-6
            max-h-0 overflow-hidden mt-2 md:mt-0
          "
        >
          {item.description}
        </p>

      </div>
    </div>
  );
};


export default BasedOnCard;
