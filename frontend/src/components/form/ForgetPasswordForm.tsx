import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import InputField from "./InputField";
import { GrMail } from "react-icons/gr";
import Wrapper from "../shared/Wrapper";
import BeatLoader from "react-spinners/BeatLoader";

const ForgetPasswordForm: React.FC = () => {
  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Forget Password
      </Heading>
      <Formik initialValues={{ email: "" }} onSubmit={(values, actions) => {}}>
        {({ isSubmitting }) => (
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
                  </Stack>
                )}
              </Field>
              <Flex justifyContent="flex-end">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  spinner={<BeatLoader size={8} color="white" />}
                >
                  Forget
                </Button>
              </Flex>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default ForgetPasswordForm;
