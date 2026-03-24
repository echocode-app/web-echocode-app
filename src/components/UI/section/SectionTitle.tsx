import { ReactNode } from 'react';

interface SectionTitleProps {
  marginBottom?: string;
  children: ReactNode;
}

const SectionTitle = ({ children, marginBottom }: SectionTitleProps) => {
  return (
    <h2
      className="block text-title-2xl md:text-title-4xl font-title text-white"
      style={{ marginBottom }}
    >
      {children}
    </h2>
  );
};

export default SectionTitle;
