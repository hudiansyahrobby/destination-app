import React from "react";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { IoMdInformationCircle } from "react-icons/io";
import { FaComments, FaMapMarkedAlt } from "react-icons/fa";

import Layout from "../components/Layout";
import Carousel from "../components/carousel/Carousel";
import Title from "../components/typography/Title";
import DestinationInfo from "../components/DestinationInfo";
import TabItems from "../components/tabs/TabItems";
import FloatingButton from "../components/button/FloatingButton";
import { MdFavorite } from "react-icons/md";
import useDestination from "../hooks/useDestination";
import { useParams } from "react-router";
import Loading from "../components/Loading";
import { DestinationData } from "../interfaces/DestinationInterface";

const DestinationDetail = () => {
  const { id } = useParams() as any;

  const { data, isLoading, isError, error } = useDestination(id);

  const destination: DestinationData = data;

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return <Heading>Error</Heading>;
  }

  const items = [
    {
      name: "Information",
      icon: <IoMdInformationCircle />,
      content: destination?.description,
    },
    {
      name: "Comments",
      icon: <FaComments />,
      content: destination?.description,
    },
    {
      name: "Location",
      icon: <FaMapMarkedAlt />,
      content: destination?.description,
    },
  ];
  return (
    <Layout>
      <Box mt="75px">
        <Carousel images={destination.images} />
        <VStack mx={10} align="flex-start" spacing="15px" mt="50px">
          <Box ml="5px">
            <Title>{destination.name}</Title>
          </Box>
          <DestinationInfo destination={destination} />
        </VStack>
      </Box>
      <Box my="50px" mx={10}>
        <TabItems items={items} />
      </Box>
      <FloatingButton icon={MdFavorite} onClick={() => console.log("HAHA")} />
    </Layout>
  );
};

export default DestinationDetail;
