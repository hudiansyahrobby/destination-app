import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import InputField from "./InputField";
import Wrapper from "../shared/Wrapper";
import BeatLoader from "react-spinners/BeatLoader";
import { FaMapMarkedAlt, FaUmbrellaBeach } from "react-icons/fa";
import TextEditor from "./TextEditor";
import InputSelect from "./InputSelect";
import InputImages from "./InputImages";

interface DestinationFormProps {
  editMode: boolean;
}

const DestinationForm: React.FC<DestinationFormProps> = ({ editMode }) => {
  const pageTitle = editMode ? "Edit Destination" : "Add Destination";
  const buttonTitle = editMode ? "Update" : "Add";

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        {pageTitle}
      </Heading>
      <Formik
        initialValues={{ name: "", location: "", category: "", image: "" }}
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
                      leftIcon={<FaUmbrellaBeach size={20} />}
                      placeholder="Name..."
                    />

                    <InputField
                      name="location"
                      type="text"
                      label="Location"
                      leftIcon={<FaMapMarkedAlt size={18} />}
                      placeholder="Location..."
                    />

                    <InputSelect
                      name="Categories"
                      label="Categories"
                      placeholder="Categories..."
                    />

                    <InputImages name="images" label="Upload Images" />
                    <TextEditor
                      name="description"
                      placeholder="Description..."
                      label="Description"
                    />
                  </Stack>
                )}
              </Field>
              <Flex justifyContent="flex-end" mt="70px">
                <Button
                  mt={4}
                  colorScheme="teal"
                  isLoading={isSubmitting}
                  type="submit"
                  spinner={<BeatLoader size={8} color="white" />}
                >
                  {buttonTitle}
                </Button>
              </Flex>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default DestinationForm;
