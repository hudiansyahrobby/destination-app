import { Flex, Spinner } from "@chakra-ui/react";
import React from "react";

const Loading: React.FC = () => {
  return (
    <Flex
      position="fixed"
      justifyContent="center"
      alignItems="center"
      inset="0"
    >
      <Spinner
        thickness="10px"
        speed="0.65s"
        emptyColor="gray.200"
        color="blue.500"
        width={120}
        height={120}
      />
    </Flex>
  );
};
export default Loading;
