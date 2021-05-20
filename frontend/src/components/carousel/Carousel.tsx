import { Component } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import CarouselItem from "./CarouselItem";
import { Box } from "@chakra-ui/react";

export default class Carousel extends Component<{ images: string[] }> {
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
    console.log("PROPS", this.props.images);

    return (
      <Box>
        <Slider {...settings}>
          {this.props.images?.map((image, index) => (
            <CarouselItem image={image} key={index} />
          ))}
        </Slider>
      </Box>
    );
  }
}
