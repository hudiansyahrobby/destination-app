import { Box } from "@chakra-ui/react";
import React from "react";
import Navbar from "./navbar/Navbar";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box mt="67px">{children}</Box>
    </>
  );
};
export default Layout;
