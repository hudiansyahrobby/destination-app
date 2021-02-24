import { Box, Flex, Button } from "@chakra-ui/react";
import { useInfiniteQuery } from "react-query";
import React from "react";
import { getAllDestinations } from "../API/destinationAPI";
import Cards from "./card/Cards";
import { useInView } from "react-intersection-observer";
import { DotLoader } from "react-spinners";
import CardSkeletons from "./skeleton/CardSkeletons";
import { useLocation } from "react-router";

const DestinationList: React.FC = () => {
  const { pathname } = useLocation();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  const fetchDestinations = ({ pageParam = 0 }) => {
    return getAllDestinations(pageParam);
  };

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isError,
    isLoading,
  } = useInfiniteQuery("destinations", fetchDestinations, {
    getNextPageParam: (lastPage, pages) => {
      const hasNextPage = lastPage.currentPage + 1 < lastPage.totalPages;
      let nextPage = false;
      if (hasNextPage) {
        nextPage = lastPage.currentPage + 1;
      }

      return nextPage;
    },
  });

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
