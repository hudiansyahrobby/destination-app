import { Box } from "@chakra-ui/react";
import React, { TextareaHTMLAttributes } from "react";

type TextAreaFieldProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  name: string;
  placeholder: string;
};

const TextAreaField: React.FC<TextAreaFieldProps> = (props) => {
  return (
    <Box>
      {/* <FormLabel htmlFor={name}>{label}</FormLabel>
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
      <FormErrorMessage>{error}</FormErrorMessage> */}
    </Box>
  );
};

export default TextAreaField;
