import {
  Box,
  FormControl,
  FormErrorMessage,
  FormLabel,
} from "@chakra-ui/react";
import { useField } from "formik";
import React, { InputHTMLAttributes, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

type TextEditorProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  placeholder: string;
};

const TextEditor: React.FC<TextEditorProps> = (props) => {
  const [value, setValue] = useState("");

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

  const [field, { error, touched }] = useField(props);
  const { name, label, placeholder } = props;

  return (
    <FormControl isInvalid={!!error && !!touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ReactQuill
        {...field}
        theme="snow"
        value={value}
        onChange={setValue}
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
