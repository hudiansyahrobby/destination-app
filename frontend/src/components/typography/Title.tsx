import { Heading } from "@chakra-ui/react";
import React from "react";

interface TitleProps {
  children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
  return (
    <Heading as="h1" color="gray.700" fontSize="22px" fontWeight="bold">
      {children}
    </Heading>
  );
};

export default Title;
