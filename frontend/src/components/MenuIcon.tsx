import { chakra } from "@chakra-ui/react";
import React from "react";
import { MdMenu } from "react-icons/md";

interface MenuIconProps {
  onOpen: () => void;
  btnRef: any;
}

const MenuIcon: React.FC<MenuIconProps> = ({ onOpen, btnRef }) => {
  const MenuIcon = chakra(MdMenu);

  return (
    <MenuIcon
      size="36px"
      mr="10px"
      display={{ md: "none" }}
      onClick={onOpen}
      ref={btnRef}
    />
  );
};

export default MenuIcon;
