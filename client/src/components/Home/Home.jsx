import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Home.module.sass";
import sa from "../Slider/Slider.module.sass";
import banner from "../../assets/banner.jpg";
import { FaChevronDown } from "react-icons/fa";
import Slider from "../Slider/Slider.jsx";
import { setCurrentPage } from "../../redux/actions/paginationActions";
import { asyncGetHomeBooks } from "../../redux/actions/booksActions";

export function Home(props) {
  const dispatch = useDispatch();
  const { mostPopular, bestSellers, newReleases } = useSelector(
    (state) => state.books.homeBooks
  );
  var slidesMP = [];
  var slidesBS = [];
  var slidesNR = [];

  useEffect(() => {
    dispatch(setCurrentPage(1));
    if (!mostPopular || !bestSellers || !newReleases) {
      dispatch(asyncGetHomeBooks());
    }
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

  return (
    <div className={s.home}>
      <div className={s.banner}>
        <img src={banner} alt="banner" className={s.bannerImg} />
        <a className={s.arrow} href="#slider1">
          <FaChevronDown className={s.icon} id="slider1" />
        </a>
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
