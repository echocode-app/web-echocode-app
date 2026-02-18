import { Dispatch, SetStateAction } from 'react';

import NavLink from '../NavLink';

interface MobileNavListProps {
  onClose: () => void;
  isOpenDropdown: boolean;
  setIsOpenDropdown: Dispatch<SetStateAction<boolean>>;
}

const MobileNavList = ({ onClose }: MobileNavListProps) => {
  return (
    <ul className="flex flex-col items-center gap-8">
      <li onClick={onClose}>
        <NavLink link={'#products'}>Products</NavLink>
      </li>
      <li onClick={onClose}>
        <NavLink link={'#partnership'}>Partnership</NavLink>
      </li>
      <li onClick={onClose}>
        <NavLink link={'#team'}>Team</NavLink>
      </li>
      <li onClick={onClose}>
        <NavLink link={'#career'}>Career</NavLink>
      </li>
      <li onClick={onClose}>
        <NavLink link={'#contacts'}>Contacts</NavLink>
      </li>
      {/* <li onClick={onClose}>
        <NavLink link={"/portfolio"}>Portfolio</NavLink>
      </li> */}
    </ul>
  );
};

export default MobileNavList;
