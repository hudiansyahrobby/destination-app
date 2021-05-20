import { chakra } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";

interface MenuIconProps {
  onOpen: () => void;
}

const MenuIcon: React.FC<MenuIconProps> = ({ onOpen }) => {
  const MenuIcon = chakra(MdMenu);

  return (
    <MenuIcon
      size="36px"
      mr="10px"
      display={{ md: "none" }}
      cursor="pointer"
      onClick={onOpen}
    />
  );
};

export default MenuIcon;
