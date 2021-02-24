import {
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Drawer,
  Flex,
  Stack,
  Divider,
  VStack,
  StackDivider,
} from "@chakra-ui/react";
import React from "react";
import { link } from "../data/link";
import NavMenu from "./navbar/NavMenu";

interface DrawerProps {
  btnRef: any;
  isOpen: boolean;
  onClose: () => void;
}

const DrawerMenu: React.FC<DrawerProps> = ({ btnRef, onClose, isOpen }) => {
  return (
    <>
      <Drawer
        isOpen={isOpen}
        onClose={onClose}
        placement="left"
        finalFocusRef={btnRef}
      >
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
                  {link.map(({ title, link }) => (
                    <NavMenu title={title} link={link} />
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
