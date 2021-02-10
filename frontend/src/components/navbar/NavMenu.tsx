import { Link } from "@chakra-ui/react";
import React from "react";
import { NavLink } from "react-router-dom";

interface NavMenuProps {
  link: string;
  title: string;
}
const NavMenu: React.FC<NavMenuProps> = ({ link, title }) => {
  return (
    <Link
      as={NavLink}
      to={link}
      _hover={{
        textDecoration: "none",
        color: "green.600",
      }}
      px={3}
    >
      {title}
    </Link>
  );
};
export default NavMenu;
