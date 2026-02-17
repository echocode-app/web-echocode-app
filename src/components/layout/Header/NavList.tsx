import NavLink from "./NavLink";

const NavList = () => {
  return (
    <nav>
      <ul className="flex gap-4 lg:gap-2.5">
        <li>
          <NavLink link={"#/products"}>Products</NavLink>
        </li>
        <li>
          <NavLink link={"#/services"}>Services</NavLink>
        </li>
        <li>
          <NavLink link={"#/partnership"}>Partnership</NavLink>
        </li>
        <li>
          <NavLink link={"#/team"}>Team</NavLink>
        </li>
        <li>
          <NavLink link={"#/career"}>Career</NavLink>
        </li>
        <li>
          <NavLink link={"#/contacts"}>Contacts</NavLink>
        </li>
        <li>
          <NavLink link={"/portfolio"}>Portfolio</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default NavList;
