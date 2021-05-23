import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";
import { UseFormRegisterReturn } from "react-hook-form";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  placeholder: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type: string;
  error: string | undefined;
  register: UseFormRegisterReturn;
};

const InputField: React.FC<InputFieldProps> = (props) => {
  const {
    name,
    label,
    placeholder,
    leftIcon,
    rightIcon,
    type,
    error,
    register,
  } = props;

  return (
    <FormControl isInvalid={!!error}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none" children={leftIcon} />
        )}

        <Input
          {...register}
          id={name}
          placeholder={placeholder}
          type={type}
          autoComplete="off"
        />

        {rightIcon && <InputRightElement children={rightIcon} />}
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputField;
