import { Box } from "@chakra-ui/react";
import React from "react";
import CommentBody from "./CommentBody";
import CommentHeader from "./CommentHeader";

interface CommentItemProps {
  name: string;
  avatar: string;
  content: string;
  date: string;
}

const CommentItem: React.FC<CommentItemProps> = (props, { content }) => {
  return (
    <Box>
      <CommentHeader {...props} />
      <CommentBody content={content} />
    </Box>
  );
};

export default CommentItem;
