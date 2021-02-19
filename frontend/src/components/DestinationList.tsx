import { Box } from "@chakra-ui/react";
import React from "react";
import Cards from "./card/Cards";

const DestinationList: React.FC = () => {
  return (
    <Box mx={{ base: 3, md: 8 }} mt={15}>
      <Cards />
    </Box>
  );
};
export default DestinationList;
