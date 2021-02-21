import {
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";
import { InputHTMLAttributes } from "react";
import CreatableSelect from "react-select/creatable";

type InputSelectProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  placeholder: string;
};

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const [field, { error, touched }] = useField(props);
  const { name, label, placeholder } = props;

  const Select = chakra(CreatableSelect);
  return (
    <FormControl isInvalid={!!error && !!touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup width="full">
        <Select
          width="full"
          isMulti
          maxMenuHeight={200}
          isClearable
          placeholder={placeholder}
          {...field}
          //   isDisabled={isCategoryLoading}
          //   isLoading={isCategoryLoading}
          //   formatCreateLabel={(inputValue) => `c "${inputValue}"`}
          //   onChange={(option) => {
          //     if (option) {
          //       form.setFieldValue(field.name, option.value);
          //     } else {
          //       form.setFieldValue(field.name, '');
          //     }
          //   }}
          //   onCreateOption={handleCreateCategory}
          //   options={categoryOptions}
          //   value={
          //     categoryOptions
          //       ? categoryOptions.find((option) => option.value === field.value)
          //       : ''
          //   }
        />
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputSelect;
