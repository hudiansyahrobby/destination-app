import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import TextAreaField from "../form/TextAreaField";
import BeatLoader from "react-spinners/BeatLoader";

const CommentForm = () => {
  return (
    <Box>
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
            // isLoading={isSubmitting}
            type="submit"
            spinner={<BeatLoader size={8} color="white" />}
          >
            Komentar
          </Button>
        </Flex>
      </Stack>
    </Box>
  );
};

export default CommentForm;
