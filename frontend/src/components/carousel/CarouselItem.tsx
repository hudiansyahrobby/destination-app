import { Box, Image } from "@chakra-ui/react";
import React from "react";

interface CarouselItemProps {
  image: string;
}

const CarouselItem: React.FC<CarouselItemProps> = ({ image }) => {
  return (
    <Box>
      <Image
        src={image}
        objectFit="contain"
        width="full"
        height="500px"
        fallbackSrc="https://via.placeholder.com/150"
      />
    </Box>
  );
};

export default CarouselItem;
