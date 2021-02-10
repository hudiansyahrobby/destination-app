import { Box } from "@chakra-ui/react";
import React from "react";

interface WrapperProps {
  size: "sm" | "lg";
  children: React.ReactNode;
}

const Wrapper: React.FC<WrapperProps> = ({ size, children }) => {
  if (size === "sm") {
    return (
      <Box width="800px" maxWidth="100%" px={4} mx="auto">
        {children}
      </Box>
    );
  } else if (size === "lg") {
    return (
      <Box width="1280px" maxWidth="100%" px={4} mx="auto">
        {children}
      </Box>
    );
  }

  return null;
};
export default Wrapper;
