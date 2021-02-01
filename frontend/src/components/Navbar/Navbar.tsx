import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import NavMenu from "./NavMenu";

const Navbar: React.FC = () => {
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
      <Box>
        <Heading as="h1" fontSize={25}>
          Destination App
        </Heading>
      </Box>
      <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
        <Box mr={8}>
          <NavMenu link="/" title="Home" />
          <NavMenu link="/daftar-tempat-wisata" title="Daftar Tempat Wisata" />
        </Box>
        <Button colorScheme="whatsapp" mr="4">
          Sign Up
        </Button>
        <Button colorScheme="gray">Log in</Button>
      </Flex>
    </Flex>
  );
};
export default Navbar;
