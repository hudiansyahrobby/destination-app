import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";
import {
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { DestinationData } from "../../interfaces/DestinationInterface";

type TextEditorProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  placeholder: string;
  error: string | undefined;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<any>;
  getValue: UseFormGetValues<DestinationData>;
};

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  };

  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
  ];

  const {
    name,
    label,
    placeholder,
    error,
    register,
    setValue,
    getValue,
  } = props;

  const defaultValue = getValue("description") || "";
  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ReactQuill
        theme="snow"
        onChange={(value) => {
          setValue("description", value);
        }}
        defaultValue={defaultValue}
        value={defaultValue || ""}
        modules={modules}
        formats={formats}
        placeholder={placeholder}
        style={{ height: "200px" }}
      />

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default TextEditor;
