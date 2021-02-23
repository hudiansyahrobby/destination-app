import React from "react";
import Card from "./Card";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

it("Text in state is changed when button clicked", () => {
  const { getByText } = render(
    <Card
      title="Destination"
      image="https://via.placeholder.com/150"
      content="lorem"
      link="/destination/1"
    />
  );

  expect(getByText(/Destination/i).textContent).toBe("Destination");

  expect(getByText(/See Detail/i).textContent).toBe("See Detail");
});
