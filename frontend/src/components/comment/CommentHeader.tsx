import { Avatar, Box, Flex } from "@chakra-ui/react";
import React from "react";
import Subtitle from "../typography/Subtitle";
import TextSmall from "../typography/TextSmall";

interface CommentHeaderProps {
  name: string;
  avatar: string;
  date: string;
}

const CommentHeader: React.FC<CommentHeaderProps> = ({
  name,
  avatar,
  date,
}) => {
  return (
    <Flex alignItems="center">
      <Avatar
        name="Dan Abramov"
        src="https://bit.ly/dan-abramov"
        loading="lazy"
        showBorder
        mr="15px"
      />
      <Box>
        <Subtitle>Dan Abramov</Subtitle>
        <TextSmall>16 Januari 2020</TextSmall>
      </Box>
    </Flex>
  );
};

export default CommentHeader;
