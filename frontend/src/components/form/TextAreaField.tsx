import { Box, FormErrorMessage, FormLabel, Textarea } from "@chakra-ui/react";
import { useField } from "formik";
import React, { TextareaHTMLAttributes } from "react";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  placeholder: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  const [field, { error, touched }] = useField(props);
  const { name, label, placeholder } = props;

  let [value, setValue] = React.useState("");

  let handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let inputValue = e.target.value;
    setValue(inputValue);
  };

  return (
    <Box>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Textarea
        {...field}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        size="sm"
        isRequired
        height="150px"
        isInvalid={!!error && !!touched}
      />
      <FormErrorMessage>{error}</FormErrorMessage>
    </Box>
  );
};

export default TextAreaField;
