import React, { useEffect, useState } from "react";
import s from "./Filters.module.sass";
import { useSelector, useDispatch } from "react-redux";
import {
  applyBookFilters,
  applyBookSort,
  setAuthorFilter,
  setCategoryFilter,
  setFilterCard,
} from "../../redux/reducers/booksSlice";
import {
  asyncGetAuthors,
  asyncGetCategories,
} from "../../redux/actions/booksActions";
import { updateCurrentPage } from "../../redux/reducers/paginationSlice";
import { useRef } from "react";

function Filters() {
  const {
    filterBooksByAuthor,
    filterBooksByCategory,
    filterCard,
    authors,
    books,
    categories,
  } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    author: "",
    category: "",
  });
  const [select, setSelect] = useState({
    authors: books.map((b) => authors.filter((a) => b.authors.includes(a))[0]),
    categories: categories,
  });
  const [generalFilter] = useState(filterCard);
  const [booksFilters, setBooksFilters] = useState({
    filterAuthor: filterBooksByAuthor.length > 0 ? filterBooksByAuthor : [],
    filterCategory: filterBooksByCategory,
  });
  const [openAuthor, setOpenAuthor] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const authorRef = useRef(null);
  const categoryRef = useRef(null);
  function closeListAuthor(e) {
    if (
      authorRef.current &&
      openAuthor &&
      !authorRef.current.contains(e.target)
    ) {
      setOpenAuthor(false);
    }
  }
  document.addEventListener("mousedown", closeListAuthor);
  function closeListCategory(e) {
    if (
      categoryRef.current &&
      openCategory &&
      !categoryRef.current.contains(e.target)
    ) {
      setOpenCategory(false);
    }
  }
  document.addEventListener("mousedown", closeListCategory);
  const [change, setChange] = useState(true);

  useEffect(() => {
    if (change) {
      setBooksFilters({
        filterAuthor: filterBooksByAuthor,
        filterCategory: filterBooksByCategory,
      });
      setChange(false);
    }
    return () => {
      setChange(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [books]);
  useEffect(() => {
    dispatch(setFilterCard("books"));
    var auth = [];
    books.map(
      (b) =>
        authors.filter((a) => {
          if (b.authors.includes(a)) {
            if (!auth.includes(a)) {
              auth.push(a);
            }
          }
          return "";
        })[0]
    );
    var cat = [];
    books.map(
      (b) =>
        categories.filter((c) => {
          if (b.categories.includes(c)) {
            if (!cat.includes(c)) {
              cat.push(c);
            }
          }
          return "";
        })[0]
    );
    setSelect({
      authors: auth,
      categories: cat,
    });
    if (authors.length <= 0 || categories.length <= 0) {
      dispatch(asyncGetAuthors());
      dispatch(asyncGetCategories());
    }
    if (generalFilter === "books") {
      dispatch(setAuthorFilter(booksFilters.filterAuthor));
      dispatch(setCategoryFilter(booksFilters.filterCategory));
      dispatch(applyBookFilters());
      dispatch(applyBookSort());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterBooksByAuthor, generalFilter, booksFilters]);

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
    if (e.target.name === "author") {
      setOpenAuthor(true);
    } else if (e.target.name === "category") {
      setOpenCategory(true);
    }
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
            <div ref={authorRef} className={s.searchAuthorCont}>
              <div>
                {inputs.author.length > 0 && openAuthor
                  ? select.authors.map((a, i) =>
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
                    )
                  : null}
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
            <div ref={categoryRef} className={s.searchCategoryCont}>
              <div>
                {inputs.category.length > 0 && openCategory
                  ? select.categories.map((c, i) =>
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
                    )
                  : null}
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
