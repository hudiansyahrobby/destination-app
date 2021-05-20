import { Box } from "@chakra-ui/react";
import React from "react";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";

interface CommentItemProps {
  id: number;
  name: string;
  avatar: string;
  content: string;
  date: string;
}

interface CommentProps {
  comments: Array<CommentItemProps>;
}

const Comment: React.FC<CommentProps> = ({ comments }) => {
  return (
    <Box>
      {comments?.map((comment) => {
        return <CommentItem {...comment} key={comment.id} />;
      })}
      <CommentForm />
    </Box>
  );
};

export default Comment;
