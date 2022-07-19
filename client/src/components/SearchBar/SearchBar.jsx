import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import s from "./SearchBar.module.sass";
import { useState } from "react";
import {
  asyncGetBooks,
  asyncGetSearch,
} from "../../redux/actions/booksActions";
import {
  asyncGetSearchUser,
  asyncGetUsers,
} from "../../redux/actions/usersActions";

function SearchBar() {
  const [input, setInput] = useState("");
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
      } else if (filterCard === "users") {
        dispatch(asyncGetUsers(title));
        setInput(title);
        history.push("/search");
      }
    }
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (input !== "") {
      if (filterCard === "books") {
        dispatch(asyncGetBooks(input));
        history.push("/search");
        console.log("books");
      } else if (filterCard === "users") {
        dispatch(asyncGetUsers(input));
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
          <hr />
          <img
            onClick={(e) => handleSubmit(e)}
            className={s.searchButton}
            src="https://www.freeiconspng.com/thumbs/search-icon-png/search-icon-png-21.png"
            alt="searchButton"
          />
        </div>
      </form>
      <div className={s.usualSearch}>
        <div
          className={`${
            input.length > 0
              ? searchButton
                ? s.usualActive
                : s.noActive
              : s.noActive
          }`}
        >
          {input.length > 0 &&
            search.map((b) =>
              b.title.toLowerCase().includes(input.toLowerCase()) ? (
                <div
                  onClick={(e) => handleClick(e, b.title)}
                  className={s.usuals}
                  key={b.ID}
                >
                  {b.title}
                </div>
              ) : null
            )}
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
