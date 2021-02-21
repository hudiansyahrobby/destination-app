import { FormControl, FormErrorMessage, FormLabel } from "@chakra-ui/react";
import { useField } from "formik";
import { InputHTMLAttributes } from "react";
import { ImagePreviewer } from "react-file-utils";

type InputImagesProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
};

const InputImages: React.FC<InputImagesProps> = (props) => {
  const [field, { error, touched }] = useField(props);
  const { name, label } = props;
  return (
    <FormControl isInvalid={!!error && !!touched}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <ImagePreviewer
        {...field}
        handleRemove={(id) => console.log("Removed image " + id)}
        handleRetry={(id) => console.log("Retried image " + id)}
        handleFiles={(files) => {
          console.log(files);
        }}
        multiple
      />

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputImages;
