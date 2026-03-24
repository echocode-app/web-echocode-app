import { ReactNode } from 'react';

interface ExploreItemProps {
  children: ReactNode;
  width: string;
}

const ExploreItem = ({ children, width }: ExploreItemProps) => {
  const style: React.CSSProperties = {
    ['--w' as string]: width + 'px',
  };

  return (
    <div
      className="p-4 font-title text-title-sm md:text-title-base border-l
       border-accent w-full rounded-secondary bg-[#121212] shrink-0 md:max-w-(--w)"
      style={style}
    >
      {children}
    </div>
  );
};

export default ExploreItem;
