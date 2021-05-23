import { Button } from "@chakra-ui/react";
import React from "react";
import { UseFormRegisterReturn } from "react-hook-form";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { FaLock } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import InputField from "./InputField";

interface PasswordFieldProps {
  label: string;
  name: string;
  placeholder: string;
  error: string | undefined;
  register: UseFormRegisterReturn;
}

const PasswordField: React.FC<PasswordFieldProps> = (props) => {
  const { register, ...rest } = props;
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <InputField
      register={register}
      {...rest}
      type={show ? "text" : "password"}
      leftIcon={<FaLock />}
      rightIcon={
        <Button variant="ghost" onClick={handleClick}>
          <IconContext.Provider
            value={{
              color: "black",
              size: "23px",
            }}
          >
            <div>{show ? <AiFillEye /> : <AiFillEyeInvisible />}</div>
          </IconContext.Provider>
        </Button>
      }
    />
  );
};
export default PasswordField;
