import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import SearchBar from "../form/SearchBar";
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
          <Link to="/">Destination App</Link>
        </Heading>
      </Box>
      <Flex flex="1" mx={10}>
        <SearchBar />
      </Flex>
      <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
        <Box mr={8}>
          <NavMenu link="/" title="Home" />
          <NavMenu link="/destination" title="Destinasi" />
        </Box>
        <Button colorScheme="whatsapp" mr="4" as={Link} to="/signup">
          Sign Up
        </Button>
        <Button colorScheme="gray" as={Link} to="/login">
          Log in
        </Button>
      </Flex>
    </Flex>
  );
};
export default Navbar;
