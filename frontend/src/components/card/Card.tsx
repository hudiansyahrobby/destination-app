import { Box, Button, Heading, Image, Tag, Text } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

interface CardProps {
  title: string;
  content: string;
  image: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, content, image, link }) => {
  return (
    <Box boxShadow="md">
      <Box>
        <Image
          w="full"
          h="full"
          objectFit="cover"
          src={image}
          alt={title}
          fallbackSrc="https://via.placeholder.com/150"
        />
        <Box m={2} px={4} pb={4}>
          <Tag mt={2} color="teal" fontWeight="bold">
            Jakarta
          </Tag>
          <Heading fontSize={23} mt={3} as="h2">
            {title}
          </Heading>
          <Text as="p" mt={4} fontSize={15} color="gray.500">
            {content}
          </Text>
          <Button
            mt={5}
            display="block"
            w="full"
            textAlign="center"
            color="teal"
          >
            <Link to={link}>See Detail</Link>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
export default Card;
