import { Box, Heading, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import AlertMessage from "../components/AlertMessage";
import Card from "../components/card/Card";
import Cards from "../components/card/Cards";
import Layout from "../components/Layout";
import CardSkeletons from "../components/skeleton/CardSkeletons";
import useFavorites from "../hooks/favorites/useFavorites";
import { FavoriteData } from "../interfaces/FavoriteInterface";

const FavoriteDestination: React.FC = () => {
  const { data, isLoading, isError, error } = useFavorites();

  const customError: any = error;
  const getError = customError?.response?.data?.message;
  console.log("FAVC", data);
  return (
    <Layout>
      <Heading as="h2" fontSize={34} textAlign="center" mt={24} mb={6}>
        My Favorite Destination
      </Heading>

      <Box mx={{ base: 3, md: 8 }} mt="14">
        {isLoading ? (
          <CardSkeletons />
        ) : (
          <Box mb="14">
            {isError ? (
              <AlertMessage
                status="error"
                title="Something Went Wrong"
                description={getError}
              />
            ) : data?.length !== 0 ? (
              <SimpleGrid columns={[1, 2, 3]} gap={6} mt={15}>
                {data.map((favorite: FavoriteData) => {
                  return <Card key={favorite.id} {...favorite.destination} />;
                })}
              </SimpleGrid>
            ) : (
              <Heading textAlign="center" as="h2" fontSize="large" mt={10}>
                You don't have favorite destination, Add One
              </Heading>
            )}
          </Box>
        )}
      </Box>
    </Layout>
  );
};
export default FavoriteDestination;
