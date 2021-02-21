import { Box, chakra, Flex } from "@chakra-ui/react";
import React from "react";
import { AiFillStar } from "react-icons/ai";

interface RatingProps {
  rating: number;
}

const Rating: React.FC<RatingProps> = ({ rating }) => {
  const StarIcon = chakra(AiFillStar);
  return (
    <Flex>
      {Array(5)
        .fill(0)
        .map((_, index) => {
          return (
            <Box key={index}>
              {rating >= index + 1 ? (
                <StarIcon color="yellow.300" fontSize="20px" />
              ) : (
                <StarIcon color="gray.500" fontSize="20px" />
              )}
            </Box>
          );
        })}
    </Flex>
  );
};

export default Rating;
