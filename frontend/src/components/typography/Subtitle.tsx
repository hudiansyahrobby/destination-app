import { Text } from "@chakra-ui/react";
import React from "react";

interface SubtitleProps {
  children: React.ReactNode;
}

const Subtitle: React.FC<SubtitleProps> = ({ children }) => {
  return (
    <Text fontWeight="bold" color="gray.700" fontSize="16px">
      {children}
    </Text>
  );
};

export default Subtitle;
