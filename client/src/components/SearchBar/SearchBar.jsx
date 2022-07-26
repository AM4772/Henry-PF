import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBar.module.sass";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import {
  asyncGetBooks,
  asyncGetSearch,
} from "../../redux/actions/booksActions";
import {
  asyncGetSearchUser,
  asyncGetUsers,
} from "../../redux/actions/usersActions";
import {
  setAuthorFilter,
  setCategoryFilter,
} from "../../redux/reducers/booksSlice";
import { updateCurrentPage } from "../../redux/reducers/paginationSlice";

function SearchBar({ input, setInput }) {
  const [searchButton, setSearchButton] = useState(true);
  const { filterCard, search } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    if (filterCard === "books") {
      dispatch(asyncGetSearch());
    } else if (filterCard === "users") {
      dispatch(asyncGetSearchUser());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCard]);
  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
    setSearchButton(true);
  }
  function handleClick(e, title) {
    e.preventDefault();
    setSearchButton(false);
    if (title !== "") {
      if (filterCard === "books") {
        dispatch(asyncGetBooks(title));
        setInput(title);
        history.push("/search");
        dispatch(setAuthorFilter([]));
        dispatch(setCategoryFilter([]));
      } else if (filterCard === "users") {
        dispatch(asyncGetUsers(title));
        setInput(title);
        history.push("/search");
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    setSearchButton(false);
    if (input.replace(/^\s+|\s+$/g, "").replace(/\./g, "") !== "") {
      if (filterCard === "books") {
        dispatch(updateCurrentPage(1));
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
        history.push("/search");
      } else if (filterCard === "users") {
        dispatch(
          asyncGetUsers(
            input
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\s+/g, " ")
          )
        );
        setInput(input.replace(/^\s+|\s+$/g, ""));
        history.push("/search");
      }
    }
  }
  return (
    <div>
      <form className={s.formSearch} onSubmit={(e) => handleSubmit(e)}>
        <div className={s.searchDiv}>
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
      <div className={s.usualSearch}>
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
            : null}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
