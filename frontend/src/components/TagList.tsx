import { Box, Tag } from "@chakra-ui/react";
import React from "react";
import { capitalizeFirstLetter } from "../helpers/capitalizeFirstLetter";

interface TagListProps {
  tags: Array<string>;
}

const TagList: React.FC<TagListProps> = ({ tags }) => {
  return (
    <Box>
      {tags.map((tag) => {
        return (
          <Tag mr="3px" color="teal" fontWeight="bold" key={tag}>
            {capitalizeFirstLetter(tag)}
          </Tag>
        );
      })}
    </Box>
  );
};

export default TagList;
