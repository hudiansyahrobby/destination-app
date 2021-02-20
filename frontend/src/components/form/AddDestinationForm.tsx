import React from "react";
import { Formik, Form, Field } from "formik";
import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import InputField from "./InputField";
import Wrapper from "../shared/Wrapper";
import BeatLoader from "react-spinners/BeatLoader";
import { FaMapMarkedAlt, FaUmbrellaBeach } from "react-icons/fa";

const AddDestinationForm: React.FC = () => {
  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Add Destination
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
                  Add
                </Button>
              </Flex>
            </Wrapper>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
export default AddDestinationForm;
