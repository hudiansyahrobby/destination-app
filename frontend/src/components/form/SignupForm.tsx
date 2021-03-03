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
import { BsFillPersonFill } from "react-icons/bs";
import { Link as LinkRoute } from "react-router-dom";
import { RegisterData } from "../../interfaces/AuthInterface";
import { registedValidation } from "../../validations/authValidation";
import useSignup from "../../hooks/useSignup";

const SignupForm: React.FC = () => {
  const { isError, mutateAsync, error, isLoading } = useSignup();

  let customError: any = {};
  customError = error;

  const onSignupUser = async (signupData: RegisterData) => {
    await mutateAsync(signupData);
  };
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
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          passwordConfirmation: "",
        }}
        validationSchema={registedValidation}
        onSubmit={(values, actions) => {
          onSignupUser(values);
        }}
      >
        {() => (
          <Form>
            <Wrapper size="sm">
              <Field>
                {() => (
                  <Stack spacing={4} mt={8}>
                    <InputField
                      name="name"
                      type="text"
                      label="Name"
                      leftIcon={<BsFillPersonFill size={20} />}
                      placeholder="Name..."
                    />

                    <InputField
                      name="email"
                      type="email"
                      label="Email"
                      leftIcon={<GrMail size={18} />}
                      placeholder="Email..."
                    />

                    <PasswordField
                      label="Password"
                      placeholder="Password..."
                      name="password"
                    />

                    <PasswordField
                      label="Password Confirmation"
                      placeholder="Password confirmation..."
                      name="passwordConfirmation"
                    />
                  </Stack>
                )}
              </Field>
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
                  colorScheme="teal"
                  isLoading={isLoading}
                  type="submit"
                  spinner={<BeatLoader size={8} color="white" />}
                >
                  Signup
                </Button>
              </Flex>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default SignupForm;
