import React, { useEffect, useState } from "react";
import s from "./Filters.module.sass";
import { useSelector, useDispatch } from "react-redux";
import {
  applyBookFilters,
  setAuthorFilter,
  setCategoryFilter,
  setFilterCard,
} from "../../redux/reducers/booksSlice";
import {
  asyncGetAuthors,
  asyncGetCategories,
} from "../../redux/actions/booksActions";
import { updateCurrentPage } from "../../redux/reducers/paginationSlice";

function Filters() {
  const {
    filterBooksByAuthor,
    filterBooksByCategory,
    filterCard,
    authors,
    categories,
  } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    author: "",
    category: "",
  });
  const [generalFilter,] = useState(filterCard);
  const [booksFilters, setBooksFilters] = useState({
    filterAuthor: filterBooksByAuthor.length > 0 ? filterBooksByAuthor : [],
    filterCategory: filterBooksByCategory,
  });
  useEffect(() => {
    dispatch(setFilterCard("books"));

    if (authors.length <= 0 || categories.length <= 0) {
      dispatch(asyncGetAuthors());
      dispatch(asyncGetCategories());
    }
    if (generalFilter === "books") {
      dispatch(setAuthorFilter(booksFilters.filterAuthor));
      dispatch(setCategoryFilter(booksFilters.filterCategory));
      dispatch(applyBookFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterBooksByAuthor, generalFilter, booksFilters]);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function addAuthor(a) {
    dispatch(updateCurrentPage(1));
    if (
      booksFilters.filterAuthor.length < 4 &&
      !booksFilters.filterAuthor.includes(a)
    ) {
      setBooksFilters({
        ...booksFilters,
        filterAuthor: [...booksFilters.filterAuthor, a],
      });
      setInputs({ ...inputs, author: "" });
    }
  }

  function deleteAuthor(e, a) {
    e.preventDefault();
    dispatch(updateCurrentPage(1));
    setBooksFilters({
      ...booksFilters,
      filterAuthor: booksFilters.filterAuthor.filter((auth) => auth !== a),
    });
  }

  function addCategory(c) {
    dispatch(updateCurrentPage(1));
    if (
      booksFilters.filterCategory.length < 4 &&
      !booksFilters.filterCategory.includes(c)
    ) {
      setBooksFilters({
        ...booksFilters,
        filterCategory: [...booksFilters.filterCategory, c],
      });
      setInputs({ ...inputs, category: "" });
    }
  }

  function deleteCategory(e, c) {
    e.preventDefault();
    dispatch(updateCurrentPage(1));
    setBooksFilters({
      ...booksFilters,
      filterCategory: booksFilters.filterCategory.filter((cat) => cat !== c),
    });
  }
  return (
    <form className={s.formCont}>
      {filterCard === "books" && (
        <div className={s.filtersBookCont}>
          <div className={s.inputCont}>
            <label>Filter By Author</label>
            <input
              onChange={(e) => handleChange(e)}
              value={inputs.author}
              type="text"
              placeholder="Example: Jk Rowling"
              autoComplete="off"
              name="author"
            />
            <div className={s.searchAuthorCont}>
              <div>
                {inputs.author.length > 0 &&
                  authors.map((a, i) =>
                    a
                      .toLowerCase()
                      .replace(/\./g, "")
                      .replace(/^\s+|\s+$/g, "")
                      .includes(
                        inputs.author
                          .replace(/^\s+|\s+$/g, "")
                          .replace(/\./g, "")
                          .replace(/\s+/g, " ")
                          .toLowerCase()
                      ) ? (
                      <div
                        key={i}
                        className={s.searchAuthor}
                        onClick={() => addAuthor(a)}
                        value={a}
                      >
                        {a}
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          </div>
          <div className={s.filterAuthorList}>
            {booksFilters.filterAuthor.map((a, i) => (
              <div key={i}>
                <button className={s.btn} onClick={(e) => deleteAuthor(e, a)}>
                  X
                </button>
                <span>{a}</span>
              </div>
            ))}
          </div>
          <div className={s.inputCont}>
            <label>Filter By Categories</label>
            <input
              onChange={(e) => handleChange(e)}
              value={inputs.category}
              type="text"
              placeholder="Example: Fiction"
              autoComplete="off"
              name="category"
            />
            <div className={s.searchCategoryCont}>
              <div>
                {inputs.category.length > 0 &&
                  categories.map((c, i) =>
                    c
                      .replace(/\./g, "")
                      .replace(/^\s+|\s+$/g, "")
                      .toLowerCase()
                      .includes(
                        inputs.category
                          .replace(/\s\s+/g, " ")
                          .replace(/\./g, "")
                          .replace(/\s+/g, " ")
                          .toLowerCase()
                      ) ? (
                      <div
                        className={s.searchCategory}
                        key={i}
                        onClick={() => addCategory(c)}
                        value={c}
                      >
                        {c}
                      </div>
                    ) : null
                  )}
              </div>
            </div>
          </div>
          <div className={s.filterCategoryList}>
            {booksFilters.filterCategory.map((c, i) => (
              <div key={i}>
                <button className={s.btn} onClick={(e) => deleteCategory(e, c)}>
                  X
                </button>
                <span>{c}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </form>
  );
}

export default Filters;
