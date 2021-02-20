import { SimpleGrid } from "@chakra-ui/react";
import React from "react";
import Card from "./Card";

const Cards = (): JSX.Element => {
  return (
    <SimpleGrid columns={[1, 2, 3]} gap={6} mt={15}>
      {[1, 2, 3, 4, 5, 6, 7, 8].map((_, index) => {
        return (
          <>
            <Card
              key={index}
              title="Segun Adebayo"
              content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe eos vel
          iure laborum quis cupiditate corporis eligendi dolor illum, aliquam
          numquam inventore autem unde minus possimus quasi neque et non, illo
          sequi odit? Excepturi, eligendi."
              image="https://bit.ly/sage-adebayo"
              link="/"
            />
          </>
        );
      })}
    </SimpleGrid>
  );
};
export default Cards;
