import React from "react";
import Cards from "../Cards/Cards";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import s from "./Searching.module.sass";

function Searching(props) {
  return (
    <div className={s.container}>
      <div className={s.filterCont}>
        <Filters />
      </div>
      <div className={s.cardsCont}>
        <Pagination />
        <div className={s.cardsComponent}>
          <Cards />
        </div>
        <Pagination />
      </div>
    </div>
  );
}

export default Searching;
