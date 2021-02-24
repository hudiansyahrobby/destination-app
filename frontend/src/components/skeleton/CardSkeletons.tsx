import { SimpleGrid, Skeleton, Stack } from "@chakra-ui/react";
import React from "react";

const CardSkeletons = () => {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6} mt={15} mx={{ base: 3, md: 8 }}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
        return (
          <Stack rounded="md" key={index}>
            <Skeleton height="160px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
            <Skeleton height="20px" />
          </Stack>
        );
      })}
    </SimpleGrid>
  );
};

export default CardSkeletons;
