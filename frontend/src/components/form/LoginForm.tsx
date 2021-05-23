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
import React from "react";
import { useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import { Link as LinkRoute } from "react-router-dom";
import BeatLoader from "react-spinners/BeatLoader";
import useLogin from "../../hooks/useLogin";
import { LoginData } from "../../interfaces/AuthInterface";
import Wrapper from "../shared/Wrapper";
import InputField from "./InputField";
import PasswordField from "./PasswordField";

const LoginForm: React.FC = () => {
  const { isError, mutateAsync, error, isLoading } = useLogin();

  let customError: any = {};
  customError = error;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>();

  const onSignupUser = handleSubmit(async (loginData: LoginData) => {
    await mutateAsync(loginData);
  });

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Login to Your Account
      </Heading>
      <Wrapper size="sm">
        {isError && (
          <Box>
            <Alert status="error" mt="20px">
              <AlertIcon />
              {customError?.response?.data?.message}
            </Alert>
          </Box>
        )}
        <Box as="form" onSubmit={onSignupUser}>
          <Stack spacing={4} mt={8}>
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
          </Stack>
          <Flex mt={3} justifyContent="space-between">
            <Link
              as={LinkRoute}
              to="/signup"
              _hover={{
                textDecoration: "none",
                color: "green.600",
              }}
            >
              Don't have an account ? Sign up
            </Link>
            <Link
              as={LinkRoute}
              to="/forget-password"
              _hover={{
                textDecoration: "none",
                color: "green.600",
              }}
            >
              Forget Password?
            </Link>
          </Flex>
          <Flex justifyContent="flex-end">
            <Button
              mt={4}
              colorScheme="whatsapp"
              isLoading={isLoading}
              type="submit"
              spinner={<BeatLoader size={8} color="white" />}
            >
              Login
            </Button>
          </Flex>
        </Box>
      </Wrapper>
    </Box>
  );
};
export default LoginForm;
