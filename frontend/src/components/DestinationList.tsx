import { Box, Flex, Button } from "@chakra-ui/react";
import React from "react";
import Cards from "./card/Cards";
import { useInView } from "react-intersection-observer";
import { DotLoader } from "react-spinners";
import CardSkeletons from "./skeleton/CardSkeletons";
import { useLocation } from "react-router";
import useDestinations from "../hooks/useDestinations";

const DestinationList: React.FC = () => {
  const { pathname } = useLocation();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    isLoading,
    hasNextPage,
    fetchNextPage,
    isError,
    data,
    isFetchingNextPage,
  } = useDestinations();

  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) {
    return <CardSkeletons />;
  }
  if (isError) {
    return <Box>Error...</Box>;
  }

  return (
    <>
      <Box mx={{ base: 3, md: 8 }} mt={15}>
        {data?.pages?.map((page) => {
          return <Cards key={page.currentPage} destinations={page.results} />;
        })}
      </Box>
      {pathname !== "/" && (
        <Flex justifyContent="center" my="20px">
          <Button
            ref={ref}
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage || isFetchingNextPage}
            isLoading={isFetchingNextPage}
            spinner={<DotLoader size={50} color="teal" />}
          >
            {hasNextPage ? "Load More" : "Nothing more to load"}
          </Button>
        </Flex>
      )}
    </>
  );
};
export default DestinationList;
