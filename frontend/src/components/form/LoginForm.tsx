import React from "react";
import { Formik, Form, Field } from "formik";
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
import InputField from "./InputField";
import { GrMail } from "react-icons/gr";
import Wrapper from "../shared/Wrapper";
import BeatLoader from "react-spinners/BeatLoader";
import PasswordField from "./PasswordField";
import { Link as LinkRoute, useHistory } from "react-router-dom";
import { useMutation } from "react-query";
import { login } from "../../API/authAPI";
import { LoginData } from "../../interface/AuthInterface";

const LoginForm: React.FC = () => {
  const history = useHistory();
  const { mutateAsync, isLoading, isError, error } = useMutation(login, {
    onSuccess: (data) => {
      console.log(data);
      localStorage.setItem("token", "TEST");
      history.push("/");
    },
  });

  let customError: any = {};
  customError = error;

  const onLoginUser = async (loginData: LoginData) => {
    await mutateAsync(loginData);
  };

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Login to Your Account
      </Heading>
      {isError && (
        <Box mx="18px">
          <Alert status="error" mt="20px">
            <AlertIcon />
            {customError?.response?.data?.message}
          </Alert>
        </Box>
      )}
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {
          onLoginUser(values);
        }}
      >
        {() => (
          <Form>
            <Wrapper size="sm">
              <Field>
                {() => (
                  <Stack spacing={4} mt={8}>
                    <InputField
                      name="email"
                      type="email"
                      label="Email"
                      leftIcon={<GrMail />}
                      placeholder="Email..."
                    />

                    <PasswordField
                      label="Password"
                      placeholder="Password..."
                      name="password"
                    />
                  </Stack>
                )}
              </Field>
              <Flex mt={3} justifyContent="space-between">
                <Link
                  as={LinkRoute}
                  to="/login"
                  _hover={{
                    textDecoration: "none",
                    color: "green.600",
                  }}
                >
                  Already have an account ? Login
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
                  colorScheme="teal"
                  isLoading={isLoading}
                  type="submit"
                  spinner={<BeatLoader size={8} color="white" />}
                >
                  Login
                </Button>
              </Flex>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default LoginForm;
