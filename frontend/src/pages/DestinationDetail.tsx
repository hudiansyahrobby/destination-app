import React from "react";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel/Carousel";
import {
  Box,
  chakra,
  Flex,
  Heading,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import Rating from "../components/Rating/Rating";
import { MdLocationOn } from "react-icons/md";
import { GiStarsStack } from "react-icons/gi";
import Title from "../components/typography/Title";
import TextWithIcon from "../components/typography/TextWithIcon";
import Paragraph from "../components/typography/Paragraph";

const DestinationDetail = () => {
  const LocationIcon = chakra(MdLocationOn);
  const StarStackIcon = chakra(GiStarsStack);

  return (
    <Layout>
      <Box mt="100px">
        <Carousel />

        <VStack mx={10} align="flex-start" spacing="15px" mt="50px">
          <Box ml="5px">
            <Title>Pantai Kuta</Title>
          </Box>
          <TextWithIcon text="Location" icon={LocationIcon}>
            <Tag color="teal" fontWeight="bold">
              Lombok
            </Tag>
          </TextWithIcon>

          <TextWithIcon text="Rating" icon={StarStackIcon}>
            <Box mr="5px">
              <Rating rating={4} />
            </Box>
            <Paragraph>(5 reviews)</Paragraph>
          </TextWithIcon>
        </VStack>
      </Box>
    </Layout>
  );
};

export default DestinationDetail;
