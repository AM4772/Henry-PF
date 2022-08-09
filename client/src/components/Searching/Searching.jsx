import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Cards from "../Cards/Cards";
import Filters from "../Filters/Filters";
import Pagination from "../Pagination/Pagination";
import SortByBook from "../SortyByBook/SortByBook";
import s from "./Searching.module.sass";
import { GrClose } from "react-icons/gr";

function Searching(props) {
  const { stack } = useSelector((state) => state.history);
  const history = useHistory();
  const [openFilters, setOpenFilters] = useState(false);
  const { books } = useSelector((state) => state.books);
  useEffect(() => {
    if (stack.length <= 0) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);

  return (
    <div className={s.container}>
      {books[0] ? (
        <div className={`${s.filterCont} ${openFilters ? s.filtersOpen : ""}`}>
          {openFilters ? (
            <div className={s.closeButton}>
              <GrClose onClick={() => setOpenFilters(false)} />
            </div>
          ) : null}
          <Filters />
        </div>
      ) : null}
      <div className={s.cardsCont}>
        {books[0] ? <Pagination /> : null}
        {books[0] ? (
          <div className={s.sort}>
            <button
              onClick={() => setOpenFilters(true)}
              className={s.filtersButton}
            >
              Filters
            </button>
            <SortByBook />
          </div>
        ) : null}
        <div className={s.cardsComponent}>
          <Cards />
        </div>
        {books[0] ? <Pagination /> : null}
      </div>
    </div>
  );
}

export default Searching;
