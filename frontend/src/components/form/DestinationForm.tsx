import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { FaMapMarkedAlt, FaUmbrellaBeach } from "react-icons/fa";
import { useParams } from "react-router";
import BeatLoader from "react-spinners/BeatLoader";
import { capitalizeEachWord } from "../../helpers/capitalizeEachWord";
import { getCategoryOption } from "../../helpers/getCategoryOption";
import useAddCategory from "../../hooks/categories/useAddCategory";
import useCategories from "../../hooks/categories/useCategories";
import useAddDestination from "../../hooks/useAddDestination";
import useDestination from "../../hooks/useDestination";
import useUpdateDestination from "../../hooks/useUpdateDestination";
import { DestinationData } from "../../interfaces/DestinationInterface";
import { destinationValidation } from "../../validations/destinationValidation";
import Loading from "../Loading";
import Wrapper from "../shared/Wrapper";
import InputField from "./InputField";
import InputImages from "./InputImages";
import InputSelect from "./InputSelect";
import TextEditor from "./TextEditor";

interface DestinationFormProps {
  editMode: boolean;
}

type FormData = DestinationData;

const DestinationForm: React.FC<DestinationFormProps> = ({ editMode }) => {
  const pageTitle = editMode ? "Edit Destination" : "Add Destination";
  const buttonTitle = editMode ? "Update Destination" : "Add Destination";
  const { id } = useParams() as any;

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

  const {
    mutateAsync: addDestination,
    isLoading: isAddDestinationLoading,
    isError: isAddDestinationError,
    error: addDestinationError,
  } = useAddDestination();

  const {
    mutateAsync: updateDestination,
    isLoading: isUpdateDestinationLoading,
    isError: isUpdateDestinationError,
    error: updateDestinationError,
  } = useUpdateDestination();

  const {
    data: destination,
    isLoading: isDestinationLoading,
    isError: isDestinationError,
  } = useDestination(id);

  const onCreateCategory = async (name: string) => {
    const newCategory = { name };
    await mutateAsync(newCategory, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  const options = getCategoryOption(categories);

  const {
    register,
    setValue,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(destinationValidation),
  });

  React.useEffect(() => {
    if (destination && categories) {
      const oldData: DestinationData = destination;
      setValue("name", oldData.name);
      setValue("categoryId", oldData.categoryId);
      setValue("city", oldData.city);
      setValue("description", oldData.description);
      setValue("province", oldData.province);
    }
  }, [destination, setValue, categories]);

  if (isDestinationLoading || isCategoryLoading) {
    return <Loading />;
  }

  const onSubmitDestination = handleSubmit(async (data) => {
    const destinationData = formatDataToForm(data);

    if (editMode) {
      await updateDestination(destinationData);
    } else {
      await addDestination(destinationData);
    }
  });

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        {pageTitle}
      </Heading>
      <Wrapper size="sm">
        <Box as="form" onSubmit={onSubmitDestination}>
          <Stack spacing={4} mt={8}>
            <InputField
              register={{ ...register("name") }}
              name="name"
              type="text"
              label="Name"
              leftIcon={<FaUmbrellaBeach size={20} />}
              placeholder="Name..."
              error={errors.name?.message}
            />

            <InputField
              register={{ ...register("province") }}
              name="province"
              type="text"
              label="Province"
              leftIcon={<FaMapMarkedAlt size={18} />}
              placeholder="Province..."
              error={errors.province?.message}
            />

            <InputField
              register={{ ...register("city") }}
              name="city"
              type="text"
              label="City"
              leftIcon={<FaMapMarkedAlt size={18} />}
              placeholder="City..."
              error={errors.city?.message}
            />

            <InputSelect
              register={{ ...register("categoryId") }}
              name="categoryId"
              label="Categories"
              placeholder="Categories..."
              isLoading={isCategoryLoading || isAddCategoryLoading}
              options={options}
              onHandleCreate={onCreateCategory}
              error={errors.categoryId?.message}
              setValue={setValue}
              getValue={getValues}
            />

            <InputImages
              register={{ ...register("images") }}
              name="images"
              label="Upload Images"
              error={errors.name?.message}
              getValue={getValues}
              setValue={setValue}
            />

            <TextEditor
              register={{ ...register("description") }}
              error={errors.description?.message}
              setValue={setValue}
              name="description"
              placeholder="Description..."
              label="Description"
              getValue={getValues}
            />
          </Stack>
          <Flex justifyContent="flex-end" mt="70px">
            <Button
              mb={12}
              onClick={onSubmitDestination}
              colorScheme="whatsapp"
              width={{ sm: "full", md: "max-content" }}
              isLoading={isAddDestinationLoading || isUpdateDestinationLoading}
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
export default DestinationForm;

const formatDataToForm = (data: DestinationData) => {
  const { name, city, description, images, province, categoryId } = data;

  const form = new FormData();
  form.append("name", name);
  form.append("city", city);
  form.append("province", province);
  form.append("description", description);
  form.append("categoryId", categoryId);
  [...images[0]].forEach((image) => form.append("images", image));
  return form;
};
