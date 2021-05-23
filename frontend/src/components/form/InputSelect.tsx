import {
  chakra,
  FormControl,
  FormErrorMessage,
  FormLabel,
  InputGroup,
} from "@chakra-ui/react";
import React, { InputHTMLAttributes } from "react";
import {
  UseFormGetValues,
  UseFormRegisterReturn,
  UseFormSetValue,
} from "react-hook-form";
import CreatableSelect from "react-select/creatable";
import { DestinationData } from "../../interfaces/DestinationInterface";

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
  error: string | undefined;
  register: UseFormRegisterReturn;
  setValue: UseFormSetValue<DestinationData>;
  getValue: UseFormGetValues<DestinationData>;
};

const InputSelect: React.FC<InputSelectProps> = (props) => {
  const {
    name,
    label,
    placeholder,
    isLoading,
    onHandleCreate,
    options,
    error,
    register,
    setValue,
    getValue,
  } = props;

  const Select = chakra(CreatableSelect);
  const [select, setSelect] = React.useState<string>("");

  React.useEffect(() => {
    console.log("AHHAHA", getValue("categoryId"));
    setSelect(getValue("categoryId"));
  }, [getValue]);

  return (
    <FormControl isInvalid={!!error}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <InputGroup width="full">
        <Select
          {...register}
          width="full"
          maxMenuHeight={200}
          isClearable
          placeholder={placeholder}
          isLoading={isLoading}
          formatCreateLabel={(inputValue: string) => `create "${inputValue}"`}
          onChange={(option: any) => {
            if (option) {
              setSelect(option.value);
              setValue("categoryId", option.value);
            } else {
              setSelect("");
              setValue("categoryId", "");
            }
          }}
          defaulValue={{ label: "gunung", value: 1 }}
          onCreateOption={onHandleCreate}
          options={options}
          value={
            options
              ? options.find((option) => {
                  console.log("SELECT", select);
                  console.log(option.value === select);
                  return option.value === select;
                })
              : ""
          }
        />
      </InputGroup>

      <FormErrorMessage>{error}</FormErrorMessage>
    </FormControl>
  );
};

export default InputSelect;
