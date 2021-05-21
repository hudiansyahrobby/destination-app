import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { FaUmbrellaBeach } from "react-icons/fa";
import BeatLoader from "react-spinners/BeatLoader";
import Wrapper from "../shared/Wrapper";
import InputField from "./InputField";
import useAddCategory from "../../hooks/categories/useAddCategory";
import useUpdateCategory from "../../hooks/categories/useUpdateCategories";
import useCategory from "../../hooks/categories/useCategory";
import { useParams } from "react-router";
import Loading from "../Loading";

interface CategoryFormProps {
  editMode: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ editMode }) => {
  const [name, setName] = React.useState<string>("");
  const pageTitle = editMode ? "Edit Category" : "Add Category";
  const buttonTitle = editMode ? "Update Category" : "Add Category";

  const {
    mutateAsync: addCategory,
    isLoading: isAddLoading,
  } = useAddCategory();

  const {
    mutateAsync: updateCategory,
    isLoading: isUpdateLoading,
  } = useUpdateCategory();

  const { id } = useParams() as any;

  const {
    data: category,
    isLoading: isCategoryLoading,
    isError: isCategoryError,
  } = useCategory(id);

  React.useEffect(() => {
    setName(category?.name);
  }, [category?.name]);

  if (isCategoryLoading) {
    return <Loading />;
  }
  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        {pageTitle}
      </Heading>
      <Formik
        enableReinitialize
        initialValues={{ name: name || "" }}
        onSubmit={async (values) => {
          if (editMode) {
            await updateCategory({ ...values, id });
          } else {
            await addCategory(values);
          }
        }}
      >
        {() => (
          <Form>
            <Wrapper size="sm">
              <Field>
                {() => (
                  <Stack spacing={4} mt={8}>
                    <InputField
                      name="name"
                      type="text"
                      label="Name"
                      leftIcon={<FaUmbrellaBeach size={20} />}
                      placeholder="Name..."
                    />
                  </Stack>
                )}
              </Field>
              <Flex justifyContent="flex-end">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isAddLoading || isUpdateLoading}
                  type="submit"
                  spinner={<BeatLoader size={8} color="white" />}
                >
                  {buttonTitle}
                </Button>
              </Flex>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default CategoryForm;
