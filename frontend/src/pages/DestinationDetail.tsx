import React from "react";
import { Box, Heading, useToast, VStack } from "@chakra-ui/react";
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
import AlertMessage from "../components/AlertMessage";
import Wrapper from "../components/shared/Wrapper";
import useToggleFavorite from "../hooks/favorites/useToggleFavorite";
import { capitalizeEachWord } from "../helpers/capitalizeEachWord";

const DestinationDetail = () => {
  const { id } = useParams() as any;

  const { data, isLoading, isError, error } = useDestination(id);

  const { mutateAsync } = useToggleFavorite();

  const customError: any = error;
  const getError = customError?.response?.data?.message;

  const destination: DestinationData = data;

  const toast = useToast();

  const toggleFavorite = async (id: number) => {
    await mutateAsync(id, {
      onSuccess: (data) => {
        toast({
          title: "Favorite Item",
          description: data.message,
          status: "success",
          position: "bottom",
          duration: 2000,
          isClosable: true,
        });
      },
    });
  };

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <Wrapper size="sm">
        <Box mb="14">
          <AlertMessage
            status="error"
            title="Something Went Wrong"
            description={getError}
          />
        </Box>
      </Wrapper>
    );
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
            <Title>{capitalizeEachWord(destination.name)}</Title>
          </Box>
          <DestinationInfo destination={destination} />
        </VStack>
      </Box>
      <Box my="50px" mx={10}>
        <TabItems items={items} />
      </Box>
      <FloatingButton icon={MdFavorite} onClick={() => toggleFavorite(id)} />
    </Layout>
  );
};

export default DestinationDetail;
