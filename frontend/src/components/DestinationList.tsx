import { Box, Flex } from "@chakra-ui/react";
import React from "react";
import FilterButton from "./button/FilterButton";
import Cards from "./card/Cards";

const DestinationList: React.FC = () => {
  return (
    <Box mx={{ base: 3, md: 8 }} mt={15}>
      <Flex justifyContent="flex-end">
        <FilterButton />
      </Flex>
      <Cards />
    </Box>
  );
};
export default DestinationList;
