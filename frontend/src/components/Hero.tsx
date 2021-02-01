import { Box, Grid, GridItem, Heading, Image } from "@chakra-ui/react";
import React from "react";

const Hero: React.FC = () => {
  return (
    <Grid
      h="200px"
      templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)" }}
    >
      <Box>
        <Heading as="h1">Welcome To Destination App</Heading>
        <Text>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quos impedit
          aperiam aut omnis quasi voluptate vero quo nihil earum nemo.
        </Text>
      </Box>
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
