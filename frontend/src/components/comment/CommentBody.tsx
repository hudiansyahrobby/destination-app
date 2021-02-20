import { VStack } from "@chakra-ui/react";
import React from "react";
import Rating from "../Rating/Rating";
import Paragraph from "../typography/Paragraph";

interface CommentBodyProps {
  content: string;
}

const CommentBody: React.FC<CommentBodyProps> = ({ content }) => {
  return (
    <VStack spacing="10px" align="flex-start" mt="15px">
      <Rating rating={4} />
      <Paragraph>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia eum
        temporibus quod! Commodi impedit voluptates nihil id, velit doloremque
        suscipit.
      </Paragraph>
    </VStack>
  );
};

export default CommentBody;
