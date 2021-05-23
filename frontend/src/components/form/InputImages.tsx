import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
  Image,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";
import {
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import { FaCamera } from "react-icons/fa";
import { DestinationData } from "../../interfaces/DestinationInterface";

type InputImagesProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  error: string | undefined;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<DestinationData>;
  getValue: UseFormGetValues<DestinationData>;
};

const InputImages: React.FC<InputImagesProps> = React.memo((props) => {
  const { name, label, error, setValue, getValue } = props;
  const currentValue = getValue("images") || [];
  const images = [...currentValue];
  function uploadFiles(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    setValue("images", [e.target.files]);
  }

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Grid templateColumns="repeat(2, 1fr)" gap={6} my="4">
        {images?.length > 0 &&
          images?.map((items: any, index: number) => {
            return [...items].map((item: any, index: number) => {
              return (
                <Box
                  key={index}
                  position="relative"
                  borderWidth="thick"
                  borderColor="gray.200"
                  borderRadius="lg"
                  overflow="hidden"
                >
                  <Image
                    src={URL.createObjectURL(item)}
                    alt=""
                    height="48"
                    width="full"
                    backgroundSize="cover"
                  />
                </Box>
              );
            });
          })}
      </Grid>
      <FormControl
        as="label"
        width="full"
        display="flex"
        justifyContent="center"
        py={2}
        alignItems="center"
        borderColor="#22c35e"
        borderWidth="thin"
        borderRadius="lg"
        fontWeight="bold"
        cursor="pointer"
      >
        <input
          style={{ display: "none" }}
          type="file"
          accept="image/*"
          multiple
          // disabled={field.value?.length === 5}
          className="form-control"
          onChange={uploadFiles}
        />
        <Box mr="2">
          <FaCamera />
        </Box>{" "}
        Upload Images
      </FormControl>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default InputImages;
