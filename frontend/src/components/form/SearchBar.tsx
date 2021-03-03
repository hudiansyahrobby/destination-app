import { Box, Flex } from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";
import React from "react";
import { BiSearchAlt2 } from "react-icons/bi";
import InputField from "./InputField";
import { setQuery } from "../../helpers/query";
import { useHistory } from "react-router";
import { useQueryClient } from "react-query";

interface SearchBarProps {
  placeholder: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ placeholder }) => {
  const history = useHistory();

  const queryClient = useQueryClient();

  return (
    <Flex flex="1" w="full" ml={10} mr={{ base: 0, md: 10 }}>
      <Box flex="1" w="full">
        <Formik
          initialValues={{
            search: "",
          }}
          onSubmit={({ search }) => {
            setQuery("search", search, history);
            queryClient.invalidateQueries("destinations");
          }}
        >
          {() => (
            <Form>
              <Field>
                {() => (
                  <InputField
                    name="search"
                    type="text"
                    rightIcon={<BiSearchAlt2 size={18} />}
                    placeholder={placeholder}
                  />
                )}
              </Field>
            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
};

export default SearchBar;
