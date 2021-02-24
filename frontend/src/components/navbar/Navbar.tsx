import { Flex, useDisclosure } from "@chakra-ui/react";
import React from "react";
import MenuIcon from "../MenuIcon";
import Logo from "../Logo";
import SearchBar from "../form/SearchBar";
import MenuBar from "../MenuBar";
import DrawerMenu from "../DrawerMenu";

const Navbar: React.FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <Flex
      py="4"
      px="8"
      position="fixed"
      boxShadow="md"
      zIndex={50}
      width="full"
      bgColor="white"
      top="0"
      alignItems="center"
      justifyContent="space-between"
    >
      <MenuIcon onOpen={onOpen} btnRef={btnRef} />
      <DrawerMenu isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Logo title="Destination App" />
      <SearchBar placeholder="Search Destination" />
      <MenuBar />
    </Flex>
  );
};
export default Navbar;
