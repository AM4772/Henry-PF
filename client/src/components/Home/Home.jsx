import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Home.module.sass";
import sa from "../Slider/Slider.module.sass";
import banner from "../../assets/banner.jpg";
import banner1 from "../../assets/bannerB.jpg";
import banner2 from "../../assets/bannerC.jpg";
import banner3 from "../../assets/bannerD.jpg";
import banner4 from "../../assets/bannerE.jpg";
import { FaChevronDown } from "react-icons/fa";
import Slider from "../Slider/Slider.jsx";
import { setCurrentPage } from "../../redux/actions/paginationActions";
import { asyncGetHomeBooks } from "../../redux/actions/booksActions";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

export function Home(props) {
  const dispatch = useDispatch();
  const { mostPopular, bestSellers, newReleases } = useSelector(
    (state) => state.books.homeBooks
  );
  var slidesMP = [];
  var slidesBS = [];
  var slidesNR = [];
  useEffect(() => {
    dispatch(asyncGetHomeBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setCurrentPage(1));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mostPopular, bestSellers, newReleases]);
  slidesMP = mostPopular?.map((slide) => (
    <Link to={`/book/${slide.ID}`}>
      <figure className={sa.figure}>
        <img className={sa.slideImg} src={slide.image} alt={slide.title} />
        <figcaption className={sa.figcaption}>{slide.title}</figcaption>
      </figure>
    </Link>
  ));

  slidesBS = bestSellers?.map((slide) => (
    <Link to={`/book/${slide.ID}`}>
      <figure className={sa.figure}>
        <img className={sa.slideImg} src={slide.image} alt={slide.title} />
        <figcaption className={sa.figcaption}>{slide.title}</figcaption>
      </figure>
    </Link>
  ));
  slidesNR = newReleases?.map((slide) => (
    <Link to={`/book/${slide.ID}`}>
      <figure className={sa.figure}>
        <img className={sa.slideImg} src={slide.image} alt={slide.title} />
        <figcaption className={sa.figcaption}>{slide.title}</figcaption>
      </figure>
    </Link>
  ));
  function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }

  const handleDragStart = (e) => e.preventDefault();

  const bannerSlides = [
    <img
      src={banner}
      alt="banner"
      className={s.bannerImg}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src={banner1}
      alt="banner"
      className={s.bannerImg}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src={banner2}
      alt="banner"
      className={s.bannerImg}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src={banner3}
      alt="banner"
      className={s.bannerImg}
      onDragStart={handleDragStart}
      role="presentation"
    />,
    <img
      src={banner4}
      alt="banner"
      className={s.bannerImg}
      onDragStart={handleDragStart}
      role="presentation"
    />,
  ];

  return (
    <div className={s.home}>
      <div className={s.banner}>
        <AliceCarousel
          autoPlay="true"
          autoPlayStrategy="all"
          disableButtonsControls="true"
          infinite="true"
          // paddingLeft={320}
          // paddingRight={0}
          // autoWidth="true"
          // autoHeight="true"
          autoPlayInterval={3000}
          items={bannerSlides}
        />
        <div className={s.arrow} onClick={() => scrollSmoothTo("slider1")}>
          <FaChevronDown className={s.icon} id="slider1" />
        </div>
      </div>
      <div className={s.carrusel}>
        <h2>Best Sellers</h2>
        <Slider slides={slidesBS} />
      </div>
      <div className={s.carrusel}>
        <h2>Most Popular</h2>
        <Slider slides={slidesMP} />
      </div>
      <div className={s.carrusel}>
        <h2>New Releases</h2>
        <Slider slides={slidesNR} />
      </div>
    </div>
  );
}

export default Home;
