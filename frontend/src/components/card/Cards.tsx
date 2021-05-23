import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

interface DestinationObj {
  id: number;
  name: string;
  city: string;
  province: string;
  images: Array<string>;
  description: string;
}

interface CardsProps {
  destinations: Array<DestinationObj> | undefined;
}

const Cards: React.FC<CardsProps> = ({ destinations }): JSX.Element => {
  return (
    <>
      {destinations?.map((destination) => {
        return <Card key={destination.id} {...destination} />;
      })}
    </>
  );
};
export default Cards;
