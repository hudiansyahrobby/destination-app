import React from "react";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel/Carousel";
import { Box, chakra, Flex, Heading, Tag, Text } from "@chakra-ui/react";
import Rating from "../components/Rating/Rating";
import { MdLocationOn } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";

const DestinationDetail = () => {
  const LocationIcon = chakra(MdLocationOn);
  const StarStackIcon = chakra(GiStarsStack);

  return (
    <Layout>
      <Box mt="100px">
        <Carousel />

        <Box mx={10} mt="40px">
          <Heading as="h1">Pantai Kuta</Heading>
          <Flex alignItems="center" mt={4}>
            <Text as="h2" mr={4}>
              <LocationIcon display="inline-block" fontSize={30} /> Location :{" "}
            </Text>
            <Tag color="teal" fontWeight="bold">
              Lombok
            </Tag>
          </Flex>

          <Flex alignItems="center" mt={4}>
            <Text as="h2" mr={4}>
              <StarStackIcon display="inline-block" fontSize={30} /> Rating :{" "}
            </Text>
            <Rating rating={4} />
            <Text color="gray.500" ml={2} fontSize="sm">
              (5 reviews)
            </Text>
          </Flex>
        </Box>
      </Box>
    </Layout>
  );
};

export default DestinationDetail;
