import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { FaUmbrellaBeach } from "react-icons/fa";
import { useHistory, useParams } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import useAddCategory from "../../hooks/categories/useAddCategory";
import useCategory from "../../hooks/categories/useCategory";
import useUpdateCategory from "../../hooks/categories/useUpdateCategories";
import { CategoryData } from "../../interfaces/CategoryInterface";
import { categoryValidation } from "../../validations/categoryValidation";
import Loading from "../Loading";
import Wrapper from "../shared/Wrapper";
import InputField from "./InputField";

interface CategoryFormProps {
  editMode: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ editMode }) => {
  const [name, setName] = React.useState<string>("");
  const pageTitle = editMode ? "Edit Category" : "Add Category";
  const buttonTitle = editMode ? "Update Category" : "Add Category";

  const history = useHistory();

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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CategoryData>({
    resolver: yupResolver(categoryValidation),
  });

  const onSubmitCategory = handleSubmit(async (category: CategoryData) => {
    if (editMode) {
      await updateCategory(
        { ...category, id },
        {
          onSuccess: () => {
            history.push("/admin/categories");
          },
        }
      );
    } else {
      await addCategory(category, {
        onSuccess: () => {
          history.push("/admin/categories");
        },
      });
    }
  });

  React.useEffect(() => {
    if (category) {
      setValue("name", category.name);
    }
  }, [category?.name]);

  if (isCategoryLoading) {
    return <Loading />;
  }

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        {pageTitle}
      </Heading>

      <Wrapper size="sm">
        <Box as="form" onSubmit={onSubmitCategory}>
          <Stack spacing={4} mt={8}>
            <InputField
              register={{ ...register("name") }}
              error={errors.name?.message}
              name="name"
              type="text"
              label="Name"
              leftIcon={<FaUmbrellaBeach size={20} />}
              placeholder="Name..."
            />
          </Stack>
          <Flex justifyContent="flex-end">
            <Button
              mt={4}
              colorScheme="whatsapp"
              isLoading={isAddLoading || isUpdateLoading}
              type="submit"
              spinner={<BeatLoader size={8} color="white" />}
            >
              {buttonTitle}
            </Button>
          </Flex>
        </Box>
      </Wrapper>
    </Box>
  );
};
export default CategoryForm;
