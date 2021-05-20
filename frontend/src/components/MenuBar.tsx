import { Box, Button, Flex } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { BeatLoader } from "react-spinners";
import { adminLink, link, userLink } from "../data/link";
import useAuthenticated from "../hooks/useAuthenticated";
import useLogout from "../hooks/useLogout";
import NavMenu from "./navbar/NavMenu";

const MenuBar = () => {
  const { isAdmin, isAuthenticated } = useAuthenticated();

  const { isLoading, mutateAsync } = useLogout();

  const onLogout = async () => {
    await mutateAsync();
  };

  return (
    <Flex alignItems="center" display={{ base: "none", md: "flex" }}>
      <Box mr={8}>
        {/* Admin Menu */}
        {isAuthenticated &&
          isAdmin &&
          adminLink.map(({ title, link }) => (
            <NavMenu title={title} link={link} key={title} />
          ))}

        {/* Authenticated User Menu but Not Admin */}
        {isAuthenticated &&
          !isAdmin &&
          userLink.map(({ title, link }) => (
            <NavMenu title={title} link={link} key={title} />
          ))}

        {/* Guest Menu */}
        {!isAuthenticated &&
          !isAdmin &&
          link.map(({ title, link }) => (
            <NavMenu title={title} link={link} key={title} />
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
