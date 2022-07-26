import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { applyBookSort, setSortBook } from "../../redux/reducers/booksSlice";
import { updateCurrentPage } from "../../redux/reducers/paginationSlice";
import s from "./SortByBook.module.sass";

function SortByBook() {
  const { orderBooksBy } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  function handleChange(e) {
    const { value } = e.target;
    e.preventDefault();
    dispatch(updateCurrentPage(1));
    dispatch(setSortBook(value));
    dispatch(applyBookSort());
  }
  useEffect(() => {}, [orderBooksBy]);

  return (
    <div className={s.orderCont}>
      <select
        className={s.selectOrder}
        onChange={(e) => handleChange(e)}
        value={orderBooksBy}
      >
        <option className={s.optionSort} value="A-Z">
          Select order
        </option>
        <option className={s.optionSort} value="H-L-price">
          Highest to lowest (price)
        </option>
        <option className={s.optionSort} value="L-H-price">
          Lowest to highest (price)
        </option>
        <option className={s.optionSort} value="N-O">
          Newest to oldest
        </option>
        <option className={s.optionSort} value="O-N">
          Oldest to newest
        </option>
        <option className={s.optionSort} value="H-L-rating">
          Highest to lowest (rating)
        </option>
        <option className={s.optionSort} value="L-H-rating">
          Lowest to highest (rating)
        </option>
      </select>
    </div>
  );
}

export default SortByBook;
