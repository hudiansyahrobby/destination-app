import {
  FormControl,
  FormErrorMessage,
  FormLabel,
  Grid,
} from "@chakra-ui/react";
import { useField, useFormikContext } from "formik";
import React, { InputHTMLAttributes } from "react";
import { ImagePreviewer } from "react-file-utils";

type InputImagesProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const InputImages: React.FC<InputImagesProps> = (props) => {
  const [field, { error, touched }] = useField(props);
  const { name, label } = props;
  const { setFieldValue } = useFormikContext();

  function uploadSingleFile(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) {
      return;
    }

    setFieldValue(field.name, [
      ...field.value,
      URL.createObjectURL(e.target.files[0]),
    ]);
  }

  function upload(e: React.FormEvent) {
    e.preventDefault();
    console.log(field.value);
  }

  function deleteFile(_index: number) {
    const s = field.value.filter((_: any, index: number) => index !== _index);
    setFieldValue(field.name, s);
  }

  return (
    <FormControl isInvalid={!!error && !!touched}>
      <Grid templateColumns="repeat(2, 1fr)" gap={6}>
        {field.value?.length > 0 &&
          field.value?.map((item: any, index: number) => {
            return (
              <div key={item}>
                <img
                  src="https://www.positronx.io/wp-content/uploads/2019/09/react-multiple-images-upload-preview-6642-02.png"
                  alt=""
                />
                <button type="button" onClick={() => deleteFile(index)}>
                  delete
                </button>
              </div>
            );
          })}
      </Grid>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <input
        type="file"
        // disabled={file.length === 5}
        className="form-control"
        onChange={uploadSingleFile}
      />

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputImages;
