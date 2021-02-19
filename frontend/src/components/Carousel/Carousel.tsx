import { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";
import { Box } from "@chakra-ui/react";

export default class Carousel extends Component {
  render() {
    const settings = {
      centerMode: true,
      infinite: true,
      slidesToShow: 1,
      speed: 500,
      dots: true,
      swipeToSlide: true,
      responsive: [
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 1,
          },
        },
      ],
    };
    return (
      <Box>
        <Slider {...settings}>
          <CarouselItem image="https://bit.ly/sage-adebayo" />
          <CarouselItem image="https://bit.ly/sage-adebayo" />
          <CarouselItem image="https://bit.ly/sage-adebayo" />
        </Slider>
      </Box>
    );
  }
}
