interface CycleCardProps {
  title: string;
  subTitle: string;
  desc: string;
  active: boolean;
}

const CycleCard = ({ title, subTitle, desc, active }: CycleCardProps) => {
  return (
    <article className="group flex flex-col gap-3 ">
      <p
        className={`font-title text-title-xs leading-2.5 text-accent text-left
      duration-main pointer-events-none uppercase 
      ${active ? 'text-accent-hover' : 'text-accent'} `}
      >
        {title}
      </p>
      <h3 className="font-title text-title-base pointer-events-none uppercase">{subTitle}</h3>
      <p className="text-main-sm text-gray75 pointer-events-none">{desc}</p>
    </article>
  );
};

export default CycleCard;
