'use client';

import { useEffect, useState } from 'react';
import CycleCard from '../CycleCard';

interface ImplementationListProps {
  list: {
    title: string;
    subTitle: string;
    desc: string;
  }[];
}

const ImplementationList = ({ list }: ImplementationListProps) => {
  const useAutoIndex = (length: number, delay = 2000) => {
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      if (!length) return;

      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % length);
      }, delay);

      return () => clearInterval(interval);
    }, [length, delay]);

    return activeIndex;
  };

  const activeIndex = useAutoIndex(list.length);

  return (
    <ul className="flex flex-wrap justify-center gap-6">
      {list.map((item, i) => (
        <li key={i} className="max-w-45">
          <CycleCard {...item} active={activeIndex === i} />
        </li>
      ))}
    </ul>
  );
};

export default ImplementationList;
