import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import SearchBar from "../form/SearchBar";
import Title from "../typography/Title";
import NavMenu from "./NavMenu";
import BeatLoader from "react-spinners/BeatLoader";

import { logout } from "../../API/authAPI";

const Navbar: React.FC = () => {
  const isAuthenticated = localStorage.getItem("token");
  const { isLoading, mutateAsync } = useMutation(logout, {
    onSuccess: () => {
      localStorage.removeItem("token");
    },
  });

  const onLogout = async () => {
    await mutateAsync();
  };
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
        <Title>
          <Link to="/">Destination App</Link>
        </Title>
      </Box>
      <Flex flex="1" mx={10}>
        <SearchBar />
      </Flex>
      <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
        <Box mr={8}>
          <NavMenu link="/" title="Home" />
          <NavMenu link="/destination" title="Destinasi" />
        </Box>
        {!isAuthenticated ? (
          <>
            <Button colorScheme="whatsapp" mr="4" as={Link} to="/signup">
              Sign Up
            </Button>
            <Button colorScheme="gray" as={Link} to="/login">
              Log in
            </Button>
          </>
        ) : (
          <Button
            colorScheme="whatsapp"
            mr="4"
            onClick={onLogout}
            isLoading={isLoading}
            type="submit"
            spinner={<BeatLoader size={8} color="white" />}
          >
            Log out
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
export default Navbar;
