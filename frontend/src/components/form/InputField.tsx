import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import { useField } from "formik";
import { type } from "os";
import React, { InputHTMLAttributes } from "react";

type InputFieldProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  name: string;
  placeholder: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  type: string;
};

const InputField: React.FC<InputFieldProps> = React.memo((props) => {
  const [field, { error, touched }] = useField(props);
  const { name, label, placeholder, leftIcon, rightIcon, type } = props;

  return (
    <FormControl isInvalid={!!error && !!touched}>
      {label && <FormLabel htmlFor={name}>{label}</FormLabel>}
      <InputGroup>
        {leftIcon && (
          <InputLeftElement pointerEvents="none" children={leftIcon} />
        )}

        <Input {...field} id={name} placeholder={placeholder} type={type} />

        {rightIcon && <InputRightElement children={rightIcon} />}
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
});

export default React.memo(InputField);
