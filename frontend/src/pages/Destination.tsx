import { Flex, Heading } from "@chakra-ui/react";
import React from "react";
import FilterButton from "../components/button/FilterButton";
import DestinationList from "../components/DestinationList";
import Layout from "../components/Layout";

const Destination = () => {
  return (
    <Layout>
      <Heading as="h2" fontSize={34} textAlign="center" mt="100px">
        Daftar Tempat Wisata
      </Heading>
      <Flex justifyContent="flex-end" mx={{ base: 3, md: 8 }} mt={5}>
        <FilterButton />
      </Flex>
      <DestinationList />
    </Layout>
  );
};

export default Destination;
