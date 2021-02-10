import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Flex, Heading, Link, Stack } from "@chakra-ui/react";
import InputField from "./InputField";
import { GrMail } from "react-icons/gr";
import Wrapper from "../shared/Wrapper";
import BeatLoader from "react-spinners/BeatLoader";
import PasswordField from "./PasswordField";
import { BsFillPersonFill } from "react-icons/bs";
import { Link as LinkRoute } from "react-router-dom";

const SignupForm: React.FC = () => {
  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Create Account
      </Heading>
      <Formik
        initialValues={{ email: "", password: "" }}
        onSubmit={(values, actions) => {}}
      >
        {({ isSubmitting }) => (
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
                      name="password2"
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
                  isLoading={isSubmitting}
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
