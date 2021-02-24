import { Box, Flex, Button } from "@chakra-ui/react";
import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { logout } from "../API/authAPI";
import { link } from "../data/link";
import NavMenu from "./navbar/NavMenu";

const MenuBar = () => {
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
    <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
      <Box mr={8}>
        {link.map(({ title, link }) => (
          <NavMenu title={title} link={link} />
        ))}
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
  );
};

export default MenuBar;
