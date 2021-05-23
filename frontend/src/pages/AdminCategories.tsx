import { Heading } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import { useCallback, useMemo } from "react";
import AlertMessage from "../components/AlertMessage";
import ActionButton from "../components/button/ActionButton";
import Layout from "../components/Layout";
import Loading from "../components/Loading";
import Wrapper from "../components/shared/Wrapper";
import TableItem from "../components/table/TableItem";
import Subtitle from "../components/typography/Subtitle";
import Title from "../components/typography/Title";
import { capitalizeEachWord } from "../helpers/capitalizeEachWord";
import useCategories from "../hooks/categories/useCategories";
import useDeleteCategory from "../hooks/categories/useDeleteCategory";
import { CategoryData } from "../interfaces/CategoryInterface";

const AdminCategories = () => {
  const {
    data: categories,
    isLoading: isCategoriesLoading,
    refetch,
    error: categoriesError,
    isError: isCategoriesError,
  } = useCategories();

  const customCategoryError: any = categoriesError;
  const getError = customCategoryError?.response?.data?.message;

  const {
    isLoading: isDeleteCategoryLoading,
    mutateAsync,
  } = useDeleteCategory();

  const toast = useToast();

  const onDeleteCategory = useCallback(
    async (id: number) => {
      await mutateAsync(id, {
        onSuccess: () => {
          refetch();
        },
        onError: (error) => {
          const customError: any = error;
          const deleteError = customError?.response?.data?.message;
          toast({
            title: "Delete Category Failed",
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
        Header: "Category Name",
        accessor: "col1",
      },
      {
        Header: "Action",
        accessor: "col2",
      },
    ],
    []
  );

  const data = useMemo(
    () =>
      categories?.map((category: CategoryData) => {
        return {
          col1: capitalizeEachWord(category.name),
          col2: (
            <ActionButton
              id={category.id as number}
              link="categories"
              onDelete={onDeleteCategory}
              isDeleteLoading={isDeleteCategoryLoading}
            />
          ),
        };
      }),
    [categories, isDeleteCategoryLoading, onDeleteCategory]
  );

  if (isCategoriesLoading) {
    return <Loading />;
  }

  return (
    <Layout>
      <Wrapper size="lg">
        <Title textAlign="center" mt="24" fontSize="4xl">
          Category List
        </Title>
        {isCategoriesError ? (
          <AlertMessage
            status="error"
            title="Something Went Wrong"
            description={getError}
          />
        ) : data?.length !== 0 ? (
          <TableItem columns={columns} data={data} />
        ) : (
          <Heading textAlign="center" as="h2" fontSize="large" mt={10}>
            Data Tidak Ada
          </Heading>
        )}
      </Wrapper>
    </Layout>
  );
};

export default AdminCategories;
