import {
  Alert,
  AlertIcon,
  Box,
  Button,
  Flex,
  Heading,
  Link,
  Stack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { BsFillPersonFill } from "react-icons/bs";
import { GrMail } from "react-icons/gr";
import { Link as LinkRoute } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import useSignup from "../../hooks/useSignup";
import { RegisterData } from "../../interfaces/AuthInterface";
import Wrapper from "../shared/Wrapper";
import InputField from "./InputField";
import PasswordField from "./PasswordField";
import { registedValidation } from "../../validations/authValidation";

const SignupForm: React.FC = () => {
  const { isError, mutateAsync, error, isLoading } = useSignup();

  let customError: any = {};
  customError = error;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>({
    resolver: yupResolver(registedValidation),
  });

  const onSignupUser = handleSubmit(async (signupData: RegisterData) => {
    await mutateAsync(signupData);
  });

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Create Account
      </Heading>
      {isError && (
        <Box mx="18px">
          <Alert status="error" mt="20px">
            <AlertIcon />
            {customError?.response?.data?.message}
          </Alert>
        </Box>
      )}

      <Wrapper size="sm">
        <Box as="form" onSubmit={onSignupUser}>
          <Stack spacing={4} mt={8}>
            <InputField
              register={{ ...register("name") }}
              error={errors.name?.message}
              name="name"
              type="text"
              label="Name"
              leftIcon={<BsFillPersonFill size={20} />}
              placeholder="Name..."
            />

            <InputField
              register={{ ...register("email") }}
              error={errors.email?.message}
              name="email"
              type="email"
              label="Email"
              leftIcon={<GrMail size={18} />}
              placeholder="Email..."
            />

            <PasswordField
              register={{ ...register("password") }}
              error={errors.password?.message}
              label="Password"
              placeholder="Password..."
              name="password"
            />

            <PasswordField
              register={{ ...register("passwordConfirmation") }}
              error={errors.passwordConfirmation?.message}
              label="Password Confirmation"
              placeholder="Password confirmation..."
              name="passwordConfirmation"
            />
          </Stack>
          <Link
            as={LinkRoute}
            to="/login"
            _hover={{
              textDecoration: "none",
              color: "green.600",
            }}
            display="block"
            mt={3}
          >
            Already have an account ? Login
          </Link>
          <Flex justifyContent="flex-end">
            <Button
              mt={4}
              colorScheme="whatsapp"
              isLoading={isLoading}
              type="submit"
              spinner={<BeatLoader size={8} color="white" />}
            >
              Signup
            </Button>
          </Flex>
        </Box>
      </Wrapper>
    </Box>
  );
};
export default SignupForm;
