import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import TextAreaField from "../form/TextAreaField";
import BeatLoader from "react-spinners/BeatLoader";

const CommentForm = () => {
  return (
    <Box>
      <Formik
        initialValues={{ content: "", rating: 1 }}
        onSubmit={(values, actions) => {}}
      >
        {({ isSubmitting }) => (
          <Form>
            <Field>
              {() => (
                <Stack spacing={4} mt={8}>
                  <TextAreaField
                    name="comment"
                    placeholder="Add Comment..."
                    label="Add Your Comment"
                  />
                  <Flex justifyContent="flex-end">
                    <Button
                      mt={4}
                      colorScheme="teal"
                      isLoading={isSubmitting}
                      type="submit"
                      spinner={<BeatLoader size={8} color="white" />}
                    >
                      Komentar
                    </Button>
                  </Flex>
                </Stack>
              )}
            </Field>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default CommentForm;
