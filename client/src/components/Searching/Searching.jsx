import React from "react";
import Cards from "../Cards/Cards";
import s from "./Searching.module.sass";

function Searching(props) {
  return (
    <div className={s.container}>
      <div className={s.filterCont}>"FILTERS SECTION"</div>
      <div className={s.cardsCont}>
        "Cards"
        <Cards />
      </div>
    </div>
  );
}

export default Searching;
