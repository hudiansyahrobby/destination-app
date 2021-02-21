import { Box, chakra, Tag } from "@chakra-ui/react";
import React from "react";
import { GiStarsStack } from "react-icons/gi";
import { MdLocationOn, MdSettings } from "react-icons/md";

import Rating from "./rating/Rating";
import TagList from "./TagList";
import Paragraph from "./typography/Paragraph";
import TextWithIcon from "./typography/TextWithIcon";

const DestinationInfo = () => {
  const LocationIcon = chakra(MdLocationOn);
  const StarStackIcon = chakra(GiStarsStack);
  const CategoryIcon = chakra(MdSettings);
  return (
    <>
      <TextWithIcon text="Location" icon={LocationIcon}>
        <Tag color="teal" fontWeight="bold">
          Lombok
        </Tag>
      </TextWithIcon>

      <TextWithIcon text="Rating" icon={StarStackIcon}>
        <Box mr="5px">
          <Rating rating={4} />
        </Box>
        <Paragraph>(5 reviews)</Paragraph>
      </TextWithIcon>

      <TextWithIcon text="Categories" icon={CategoryIcon}>
        <TagList tags={["beach", "destination"]} />
      </TextWithIcon>
    </>
  );
};

export default DestinationInfo;
