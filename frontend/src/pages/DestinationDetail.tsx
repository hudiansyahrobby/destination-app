import React from "react";
import Layout from "../components/Layout";
import Carousel from "../components/Carousel/Carousel";
import { Box, VStack } from "@chakra-ui/react";
import Title from "../components/typography/Title";
import DestinationInfo from "../components/DestinationInfo";
import TabItems from "../components/Tabs/TabItems";
import { IoMdInformationCircle } from "react-icons/io";
import { FaComments, FaMapMarkedAlt } from "react-icons/fa";

const DestinationDetail = () => {
  const items = [
    {
      name: "Information",
      icon: <IoMdInformationCircle />,
      content:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Culpa a, quos at repudiandae soluta sed modi voluptatibus facilis, mollitia similique enim reiciendis impedit facere eveniet labore, fugit vero quis eum laborum corporis? Blanditiis rerum at modi saepe error deserunt laboriosam doloremque, suscipit illum eum quaerat omnis voluptatum magni accusamus? Distinctio.",
    },
    {
      name: "Comments",
      icon: <FaComments />,
      content:
        "dolor sit amet consectetur adipisicing elit. Culpa a, quos at repudiandae soluta sed modi voluptatibus facilis, mollitia similique enim reiciendis impedit facere eveniet labore, fugit vero quis eum laborum corporis? Blanditiis rerum at modi saepe error deserunt laboriosam doloremque, suscipit illum eum quaerat omnis voluptatum magni accusamus? Distinctio.",
    },
    {
      name: "Location",
      icon: <FaMapMarkedAlt />,
      content:
        "amet consectetur adipisicing elit. Culpa a, quos at repudiandae soluta sed modi voluptatibus facilis, mollitia similique enim reiciendis impedit facere eveniet labore, fugit vero quis eum laborum corporis? Blanditiis rerum at modi saepe error deserunt laboriosam doloremque, suscipit illum eum quaerat omnis voluptatum magni accusamus? Distinctio.",
    },
  ];
  return (
    <Layout>
      <Box mt="100px">
        <Carousel />
        <VStack mx={10} align="flex-start" spacing="15px" mt="50px">
          <Box ml="5px">
            <Title>Pantai Kuta</Title>
          </Box>
          <DestinationInfo />
        </VStack>
      </Box>
      <Box mt="50px" mx={10}>
        <TabItems items={items} />
      </Box>
    </Layout>
  );
};

export default DestinationDetail;
