import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
// import Pagination from "../Pagination/Pagination.jsx";
// import LogIn from "../LogIn/LogIn.jsx";
import s from "./Home.module.sass";
import banner from "../../assets/banner.jpg";
import { FaChevronDown } from "react-icons/fa";
import Slider from "../Slider/Slider.jsx";
import { setCurrentPage } from "../../redux/actions/paginationActions";

export function Home(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setCurrentPage(1));
  });

  return (
    <div className={s.home}>
      <div className={s.banner}>
        <img src={banner} alt="banner" className={s.bannerImg} />
        <div className={s.arrow}>
          <FaChevronDown className={s.icon} />
        </div>
      </div>
      <div className={s.carrusel}>
        <h2>Best Sellers</h2>
        <Slider />
      </div>
      <div className={s.carrusel}>
        <h2>Most Popular</h2>
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
