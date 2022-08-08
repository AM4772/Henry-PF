import React, { useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBar.module.sass";
import { FiSearch } from "react-icons/fi";
import { BiArrowBack } from "react-icons/bi";
import { useState } from "react";
import {
  asyncGetBooks,
  asyncGetSearch,
} from "../../redux/actions/booksActions";
import {
  clearAllBooks,
  setAuthorFilter,
  setCategoryFilter,
  setSortBook,
} from "../../redux/reducers/booksSlice";
import { updateCurrentPage } from "../../redux/reducers/paginationSlice";

function SearchBar({ input, setInput }) {
  const [searchButton, setSearchButton] = useState(true);
  const { filterCard, search } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const searchList = useRef(null);
  const [open, setOpen] = useState(false);
  const history = useHistory();
  function closeList(e) {
    if (searchList.current && open && !searchList.current.contains(e.target)) {
      setOpen(false);
    }
  }
  document.addEventListener("mousedown", closeList);
  useEffect(() => {
    if (filterCard === "books") {
      dispatch(asyncGetSearch());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCard, open]);
  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
    setSearchButton(true);
    setOpen(true);
  }
  function handleClick(e, title) {
    e.preventDefault();
    setSearchButton(false);
    if (title !== "") {
      if (filterCard === "books") {
        window.scrollTo(0, 0);
        dispatch(asyncGetBooks(title));
        setInput(title);
        history.push("/search");
        dispatch(setAuthorFilter([]));
        dispatch(setCategoryFilter([]));
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSearchButton(false);
    if (input.replace(/^\s+|\s+$/g, "").replace(/\./g, "") !== "") {
      if (filterCard === "books") {
        window.scrollTo(0, 0);
        dispatch(updateCurrentPage(1));
        dispatch(clearAllBooks());
        dispatch(
          asyncGetBooks(
            input
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\s+/g, " ")
          )
        );
        setInput(input.replace(/^\s+|\s+$/g, ""));
        dispatch(setAuthorFilter([]));
        dispatch(setCategoryFilter([]));
        dispatch(setSortBook("A-Z"));
        history.push("/search");
      }
    }
  }
  return (
    <div className={s.container}>
      <form className={s.formSearch} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.searchDiv}>
          <BiArrowBack
            onClick={() => setInput("")}
            className={`${s.back} ${input.length > 0 ? s.allowBack : ""}`}
          />
          <input
            onChange={(e) => handleChange(e)}
            value={input}
            type="text"
            placeholder="Search"
            autoComplete="off"
          />
          <FiSearch
            onClick={(e) => handleSubmit(e)}
            className={s.searchButton}
            title="Search"
          />
        </div>
      </form>
      <div className={s.usualSearch} ref={searchList}>
        <div
          className={`${
            input
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\s+/g, " ").length > 0
              ? searchButton
                ? s.usualActive
                : s.noActive
              : s.noActive
          }`}
        >
          {input.replace(/^\s+|\s+$/g, "").length > 0
            ? open
              ? search.map((b) =>
                  b.title
                    .replace(/\./g, "")
                    .toLowerCase()
                    .includes(
                      input
                        .replace(/^\s+|\s+$/g, "")
                        .replace(/\./g, "")
                        .replace(/\s+/g, " ")
                        .toLowerCase()
                    ) ? (
                    <div
                      onClick={(e) => handleClick(e, b.title)}
                      className={s.usuals}
                      key={b.ID}
                    >
                      {b.title}
                    </div>
                  ) : null
                )
              : null
            : null}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
