import {
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";
import { UseMutateAsyncFunction } from "react-query";
import CreatableSelect from "react-select/creatable";

type InputSelectProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  placeholder: string;
  isLoading: boolean;
  onHandleCreate: (data: any) => Promise<void>;
  options: Array<{
    value: string;
    label: string;
  }>;
};

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const [field, { error, touched }] = useField(props);
  const { setFieldValue } = useFormikContext();
  const {
    name,
    label,
    placeholder,
    isLoading,
    onHandleCreate,
    options,
  } = props;

  const Select = chakra(CreatableSelect);

  return (
    <FormControl isInvalid={!!error && !!touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup width="full">
        <Select
          width="full"
          maxMenuHeight={200}
          isClearable
          placeholder={placeholder}
          isLoading={isLoading}
          {...field}
          formatCreateLabel={(inputValue: string) => `create "${inputValue}"`}
          onChange={(option: any) => {
            if (option) {
              setFieldValue(field.name, option.value);
            } else {
              setFieldValue(field.name, "");
            }
          }}
          onCreateOption={onHandleCreate}
          options={options}
          value={
            options
              ? options.find((option) => option.value === field.value)
              : ""
          }
        />
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputSelect;
