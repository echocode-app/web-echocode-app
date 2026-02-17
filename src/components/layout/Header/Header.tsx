import Link from 'next/link';

import NavList from './NavList';
import MobileMenu from './MobileMenu';

import Logo from '@/components/UI/Logo';
import SectionContainer from '@/components/UI/section/SectionContainer';

const Header = () => {
  return (
    <header
      className="fixed py-9  w-full z-100 before:absolute before:inset-0
    before:bg-header-gradient
    before:backdrop-blur-[6px]
    before:z-0"
    >
      <SectionContainer>
        <div className="flex justify-between items-center z-10">
          <Link href={'/'} className="flex items-center z-10">
            <Logo />
          </Link>
          <div className="hidden md:block">
            <NavList />
          </div>
          <MobileMenu />
        </div>
      </SectionContainer>
    </header>
  );
};

export default Header;
