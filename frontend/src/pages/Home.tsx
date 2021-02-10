import { Heading } from "@chakra-ui/react";
import React from "react";
import DestinationList from "../components/DestinationList";
import Hero from "../components/Hero";
import Layout from "../components/Layout";

const Home: React.FC = () => {
  return (
    <Layout>
      <Hero />
      <Heading as="h2" fontSize={34} textAlign="center" mt={20}>
        Daftar Tempat Wisata
      </Heading>
      <DestinationList />
    </Layout>
  );
};
export default Home;
