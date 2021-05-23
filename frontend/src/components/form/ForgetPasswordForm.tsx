import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { GrMail } from "react-icons/gr";
import BeatLoader from "react-spinners/BeatLoader";
import { ForgetPasswordData } from "../../interfaces/AuthInterface";
import { forgetPasswordValidation } from "../../validations/authValidation";
import Wrapper from "../shared/Wrapper";
import InputField from "./InputField";

const ForgetPasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>({
    resolver: yupResolver(forgetPasswordValidation),
  });

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Forget Password
      </Heading>
      <Wrapper size="sm">
        <Box as="form">
          <Stack spacing={4} mt={8}>
            <InputField
              register={{ ...register("email") }}
              error={errors.email?.message}
              name="email"
              type="email"
              label="Email"
              leftIcon={<GrMail />}
              placeholder="Email..."
            />
          </Stack>
          <Flex justifyContent="flex-end">
            <Button
              mt={4}
              colorScheme="teal"
              // isLoading={isSubmitting}
              type="submit"
              spinner={<BeatLoader size={8} color="white" />}
            >
              Forget
            </Button>
          </Flex>
        </Box>
      </Wrapper>
    </Box>
  );
};
export default ForgetPasswordForm;
