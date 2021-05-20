import {
  Divider,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { adminLink, link, userLink } from "../data/link";
import useAuthenticated from "../hooks/useAuthenticated";
import NavMenu from "./navbar/NavMenu";

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerProps> = ({ onClose, isOpen }) => {
  const { isAdmin, isAuthenticated } = useAuthenticated();

  return (
    <>
      <Drawer isOpen={isOpen} onClose={onClose} placement="left">
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Destination App</DrawerHeader>
            <Divider />
            <DrawerBody>
              <Flex flexDirection="column" mt="15px" ml="-11px">
                <VStack
                  spacing="15px"
                  align="start"
                  divider={<StackDivider borderColor="gray.200" />}
                >
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
                </VStack>
              </Flex>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default DrawerMenu;
