import { Button, Flex, Heading } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import DestinationList from "../components/DestinationList";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Heading as="h2" fontSize={34} textAlign="center" mt={20} mb={6}>
        Daftar Tempat Wisata
      </Heading>
      <DestinationList />
      <Flex alignItems="center">
        <Button my={6} mx="auto" display="block" color="teal">
          <Link to="/destination">See Others</Link>
        </Button>
      </Flex>
    </Layout>
  );
};
export default Home;
