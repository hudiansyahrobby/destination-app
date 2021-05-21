import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import InputField from "./InputField";
import Wrapper from "../shared/Wrapper";
import BeatLoader from "react-spinners/BeatLoader";
import { FaMapMarkedAlt, FaUmbrellaBeach } from "react-icons/fa";
import TextEditor from "./TextEditor";
import InputSelect from "./InputSelect";
import InputImages from "./InputImages";
import useCategories from "../../hooks/categories/useCategories";
import useAddCategory from "../../hooks/categories/useAddCategory";
import { CategoryData } from "../../interfaces/CategoryInterface";
import { capitalizeEachWord } from "../../helpers/capitalizeEachWord";

interface DestinationFormProps {
  editMode: boolean;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ editMode }) => {
  const pageTitle = editMode ? "Edit Destination" : "Add Destination";
  const buttonTitle = editMode ? "Update" : "Add";

  const {
    isLoading: isCategoryLoading,
    data: categories,
    isError: isCategoryError,
    refetch,
  } = useCategories();

  const {
    mutateAsync,
    isLoading: isAddCategoryLoading,
    isError: isAddCategoryError,
  } = useAddCategory();

  const onCreateCategory = async (name: string) => {
    const newCategory = { name };
    await mutateAsync(newCategory, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const options = categories?.map((category: { id: string; name: string }) => {
    return {
      value: category?.id,
      label: capitalizeEachWord(category?.name),
    };
  });

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        {pageTitle}
      </Heading>
      <Formik
        initialValues={{ name: "", location: "", category: "", images: [] }}
        onSubmit={(values, actions) => {}}
      >
        {({ isSubmitting }) => (
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

                    <InputField
                      name="location"
                      type="text"
                      label="Location"
                      leftIcon={<FaMapMarkedAlt size={18} />}
                      placeholder="Location..."
                    />

                    <InputSelect
                      name="Categories"
                      label="Categories"
                      placeholder="Categories..."
                      isLoading={isCategoryLoading || isAddCategoryLoading}
                      options={options}
                      onHandleCreate={onCreateCategory}
                    />

                    <InputImages name="images" label="Upload Images" />
                    <TextEditor
                      name="description"
                      placeholder="Description..."
                      label="Description"
                    />
                  </Stack>
                )}
              </Field>
              <Flex justifyContent="flex-end" mt="70px">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
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
export default DestinationForm;
