import { Text } from "@chakra-ui/react";
import React from "react";

interface TextSmallProps {
  children: React.ReactNode;
}

const TextSmall: React.FC<TextSmallProps> = ({ children }) => {
  return (
    <Text fontSize="11px" color="gray.500" fontWeight="semibold">
      {children}
    </Text>
  );
};

export default TextSmall;
