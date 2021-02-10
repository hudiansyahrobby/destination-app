import { Flex, Grid, Heading, Image, Text } from "@chakra-ui/react";
import React from "react";

const Hero: React.FC = () => {
  return (
    <Grid
      h="full"
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
    >
      <Flex
        mx={10}
        textAlign="left"
        justifyContent="center"
        flexDirection="column"
      >
        <Heading as="h1">Welcome To Destination App</Heading>
        <Text mt={5}>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam
          amet maxime quaerat, libero error officia ipsa consectetur nulla quae
          autem officiis placeat nam soluta illo earum iste mollitia cum minus
          nobis corporis illum! Officia mollitia
        </Text>
      </Flex>
      <Image
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixid=MXwxMjA3fDB8MHxzZWFyY2h8M3x8bmF0dXJlfGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
        alt="Segun Adebayo"
        width="full"
        height="full"
      />
    </Grid>
  );
};
export default Hero;
