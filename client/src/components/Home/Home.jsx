import React from "react";
import Pagination from "../Pagination/Pagination.jsx";
import LogIn from "../LogIn/LogIn.jsx";
import s from "./Home.module.sass";
import banner from "../../assets/banner.jpg";
import { FaChevronDown } from "react-icons/fa";
import Slider from "../Slider/Slider.jsx";

export function Home(props) {
  // Añado mi componente pagination solo para probarlo
  return (
    <div className={s.home}>
      <div className={s.banner}>
        <img src={banner} alt="banner image" className={s.bannerImg} />
        <div className={s.arrow}>
          <FaChevronDown className={s.icon} />
        </div>
      </div>
      <div className={s.carrusel}>
        <h2>Best Sellers</h2>
        <Slider />
      </div>
      <div className={s.carrusel}>
        <h2>Most Populars</h2>
        <Slider />
      </div>
      <div className={s.carrusel}>
        <h2>New Releases</h2>
        <Slider />
      </div>
    </div>
  );
}

export default Home;
