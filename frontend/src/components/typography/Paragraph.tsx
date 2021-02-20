import { Text } from "@chakra-ui/react";
import React from "react";

interface ParagraphProps {
  children: React.ReactNode;
}

const Paragraph: React.FC<ParagraphProps> = ({ children }) => {
  return (
    <Text color="gray.500" fontSize="15px" lineHeight="24px">
      {children}
    </Text>
  );
};

export default Paragraph;
