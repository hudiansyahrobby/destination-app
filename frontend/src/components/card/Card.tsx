import {
  Box,
  Button,
  Heading,
  Image,
  Stack,
  Tag,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import Paragraph from "../typography/Paragraph";
import Title from "../typography/Title";

interface CardProps {
  title: string;
  content: string;
  image: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, content, image, link }) => {
  return (
    <Box boxShadow="md" rounded="lg" overflow="hidden">
      <Box>
        <Image
          w="full"
          h="full"
          objectFit="cover"
          src={image}
          alt={title}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <VStack align="flex-start" spacing="10px" m={2} px={4} pb={4}>
          <Tag mt={2} color="teal" fontWeight="bold">
            Jakarta
          </Tag>
          <Title>
            <Link to="/destination/1">{title}</Link>
          </Title>
          <Paragraph>{content}</Paragraph>
          <Button display="block" w="full" textAlign="center" color="teal">
            <Link to={link}>See Detail</Link>
          </Button>
        </VStack>
      </Box>
    </Box>
  );
};
export default Card;
