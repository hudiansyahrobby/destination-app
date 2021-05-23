import { Box, Button, Flex, Heading, Stack } from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import BeatLoader from "react-spinners/BeatLoader";
import { ChangePasswordData } from "../../interfaces/AuthInterface";
import Wrapper from "../shared/Wrapper";
import PasswordField from "./PasswordField";
import { changePasswordValidation } from "../../validations/authValidation";

const ChangePasswordForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ChangePasswordData>({
    resolver: yupResolver(changePasswordValidation),
  });

  return (
    <Box as="section">
      <Heading as="h1" textAlign="center" mt="120px">
        Change Your Password
      </Heading>
      <Wrapper size="sm">
        <Box as="form">
          <Stack spacing={4} mt={8}>
            <PasswordField
              register={{ ...register("password") }}
              error={errors.password?.message}
              label="New Password"
              placeholder="New Password..."
              name="password"
            />
            <PasswordField
              register={{ ...register("passwordConfirmation") }}
              error={errors.passwordConfirmation?.message}
              label="Confirm New Password"
              placeholder="Confirm New Password..."
              name="password2"
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
              Change Password
            </Button>
          </Flex>
        </Box>
      </Wrapper>
    </Box>
  );
};
export default ChangePasswordForm;
