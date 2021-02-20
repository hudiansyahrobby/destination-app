import { Box, Tag } from "@chakra-ui/react";
import React from "react";

interface TagListProps {
  tags: Array<string>;
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <Box>
      {tags.map((tag) => {
        return (
          <Tag mr="3px" color="teal" fontWeight="bold">
            {tag}
          </Tag>
        );
      })}
    </Box>
  );
};

export default TagList;
