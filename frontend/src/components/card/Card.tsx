import { Box, Button, Flex, Image, Tag, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import { capitalizeEachWord } from "../../helpers/capitalizeEachWord";
import Paragraph from "../typography/Paragraph";
import Title from "../typography/Title";

interface CardProps {
  id: number;
  name: string;
  city: string;
  province: string;
  images: Array<string>;
  description: string;
}
const Card: React.FC<CardProps> = ({
  id,
  name,
  province,
  images,
  description,
}) => {
  return (
    <Box boxShadow="lg" rounded="lg" overflow="hidden">
      <Box>
        <Image
          w="full"
          h="200px"
          objectFit="cover"
          src={images[0]}
          alt={name}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <VStack align="flex-start" spacing="10px" m={2} px={4} pb={4}>
          <Tag mt={2} color="teal" fontWeight="bold">
            {province}
          </Tag>
          <Title>
            <Link to={`/destination/${id}`}>{capitalizeEachWord(name)}</Link>
          </Title>
          <Flex flexDirection="column" minHeight="full" position="relative">
            <Paragraph>{description}</Paragraph>
          </Flex>
        </VStack>
      </Box>
    </Box>
  );
};
export default Card;
