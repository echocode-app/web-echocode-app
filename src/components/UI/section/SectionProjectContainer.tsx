import { ReactNode } from 'react';

interface SectionProjectContainerProps {
  children: ReactNode;
}

const SectionProjectContainer = ({ children }: SectionProjectContainerProps) => {
  return <div className="mx-auto px-4 max-w-266 md:px-8">{children}</div>;
};

export default SectionProjectContainer;
