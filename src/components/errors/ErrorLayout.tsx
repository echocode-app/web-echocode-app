import { ReactNode } from 'react';

interface ErrorLayoutProps {
  children: ReactNode;
}

const ErrorLayout = ({ children }: ErrorLayoutProps) => {
  return (
    <>
      <main>{children}</main>
    </>
  );
};

export default ErrorLayout;
