import React from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import s from "./SearchBar.module.sass";
import { TESTING_BOOKS } from "../../testingObjects";
import { useState } from "react";

function SearchBar() {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const history = useHistory();
  function handleChange(e) {
    e.preventDefault();
    setInput(e.target.value);
  }
  function handleSubmit(e, title = input) {
    e.preventDefault();
    if (input !== "") {
      // dispatch(get)
      history.push("/search");
      setInput("");
      //testing
      // const find = TESTING_BOOKS.find(
      //   (b) => b.title.toLowerCase() === title.toLowerCase()
      // );
      // console.log(find);
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
        <div className={`${input.length > 0 ? s.usualActive : s.noActive}`}>
          {TESTING_BOOKS.length > 0 &&
            TESTING_BOOKS.map((b) =>
              b.title.includes(input) ? (
                <div
                  onClick={(e) => handleSubmit(e, b.title)}
                  className={s.usuals}
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
