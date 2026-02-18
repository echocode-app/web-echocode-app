'use client';

import { useEffect, useState } from 'react';

import TeamItem from './TeamItem';

const items = ['Passion', 'Experience', 'Friendly Staff', 'Innovation', 'The Best!'];

const TeamList = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <ul className="flex flex-wrap justify-between gap-y-7 gap-x-5">
      {items.map((title, index) => (
        <TeamItem key={title} title={title} active={index === activeIndex} />
      ))}
    </ul>
  );
};

export default TeamList;
