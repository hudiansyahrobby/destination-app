import { Box, Button, chakra, Flex, IconButton } from "@chakra-ui/react";
import React from "react";

interface FloatingButtonProps {
  icon: any;
  onClick: () => void;
}

const FloatingButton: React.FC<FloatingButtonProps> = ({ icon, onClick }) => {
  const ButtonIcon = chakra(icon);
  return (
    <IconButton
      colorScheme="red"
      position="fixed"
      w="50px"
      h="50px"
      right="20px"
      bottom="20px"
      rounded="full"
      aria-label="Search database"
      icon={<ButtonIcon fontSize="24px" />}
    />
  );
};

export default FloatingButton;
