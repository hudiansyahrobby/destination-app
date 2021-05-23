import { Box, Button, Flex, Heading } from "@chakra-ui/react";
import { useToast } from "@chakra-ui/toast";
import React, { useCallback, useEffect, useMemo } from "react";
import { useInView } from "react-intersection-observer";
import { DotLoader } from "react-spinners";
import AlertMessage from "../components/AlertMessage";
import ActionButton from "../components/button/ActionButton";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Wrapper from "../components/shared/Wrapper";
import TableItem from "../components/table/TableItem";
import Title from "../components/typography/Title";
import { capitalizeEachWord } from "../helpers/capitalizeEachWord";
import useDeleteDestination from "../hooks/useDeleteDestination";
import useDestinations from "../hooks/useDestinations";
import { DestinationData } from "../interfaces/DestinationInterface";

const AdminDestination = () => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  const {
    data: destinations,
    isLoading: isDestinationsLoading,
    refetch,
    error: destinationsError,
    isError: isDestinationsError,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useDestinations();

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  const customCategoryError: any = destinationsError;
  const getError = customCategoryError?.response?.data?.message;

  const {
    isLoading: isDeleteDestinationLoading,
    mutateAsync,
  } = useDeleteDestination();

  const toast = useToast();

  const onDeleteDestination = useCallback(
    async (id: number) => {
      await mutateAsync(id, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          const customError: any = error;
          const deleteError = customError?.response?.data?.message;
          toast({
            title: "Delete Destination Failed",
            description: deleteError,
            status: "error",
            position: "bottom",
            duration: 2000,
            isClosable: true,
          });
        },
      });
    },
    [mutateAsync, refetch, toast]
  );

  const columns = useMemo(
    () => [
      {
        Header: "Destination Name",
        accessor: "col1",
      },
      {
        Header: "Province",
        accessor: "col2",
      },
      {
        Header: "City",
        accessor: "col3",
      },
      {
        Header: "Action",
        accessor: "col4",
      },
    ],
    []
  );
  // console.log(destinations);
  const data = useMemo(() => {
    return destinations?.pages?.map((page) => {
      return page.results?.map((destination: DestinationData) => {
        return {
          col1: capitalizeEachWord(destination.name),
          col2: capitalizeEachWord(destination.province),
          col3: capitalizeEachWord(destination.city),
          col4: (
            <ActionButton
              id={destination.id as number}
              link="destinations"
              onDelete={onDeleteDestination}
              isDeleteLoading={isDeleteDestinationLoading}
            />
          ),
        };
      });
    });
  }, [destinations, isDeleteDestinationLoading, onDeleteDestination]);

  const destinationData = useMemo(() => {
    return data?.flat(1);
  }, [data]);

  if (isDestinationsLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Wrapper size="lg">
        <Title textAlign="center" mt="24" fontSize="4xl">
          Destination List
        </Title>
        <Box mb="14">
          {isDestinationsError ? (
            <AlertMessage
              status="error"
              title="Something Went Wrong"
              description={getError}
            />
          ) : data?.length !== 0 ? (
            <>
              <TableItem columns={columns} data={destinationData as any[]} />
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
            </>
          ) : (
            <Heading textAlign="center" as="h2" fontSize="large" mt={10}>
              Data is Empty
            </Heading>
          )}
        </Box>
      </Wrapper>
    </Layout>
  );
};

export default AdminDestination;
