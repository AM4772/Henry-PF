import React from "react";
import Carousel from "@brainhubeu/react-carousel";
import s from "./Slider.module.sass";
import Slides from "./Slides";
import "@brainhubeu/react-carousel/lib/style.css";

export function Slider() {
  return (
    <div className={s.carouselContainer}>
      <Carousel
        arrows
        slidesPerPage={5}
        infinite
        animationSpeed={200}
        offset={50}
        itemWidth={200}
        slides={Slides}
        className={s.slider}
      />
    </div>
  );
}

export default Slider;
