import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import Wrapper from "../shared/Wrapper";
import BeatLoader from "react-spinners/BeatLoader";
import PasswordField from "./PasswordField";

const ChangePasswordForm: React.FC = () => {
  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Change Your Password
      </Heading>
      <Formik initialValues={{ email: "" }} onSubmit={(values, actions) => {}}>
        {({ isSubmitting }) => (
          <Form>
            <Wrapper size="sm">
              <Field>
                {() => (
                  <Stack spacing={4} mt={8}>
                    <PasswordField
                      label="New Password"
                      placeholder="New Password..."
                      name="password"
                    />
                    <PasswordField
                      label="Confirm New Password"
                      placeholder="Confirm New Password..."
                      name="password2"
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
                  Change Password
                </Button>
              </Flex>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default ChangePasswordForm;
