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
  applyUserFilters,
  setEnabledFilter,
  setTypeFilter,
} from "../../redux/reducers/usersSlice";
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
  const { filterUserByEnabled, filterUserByType } = useSelector(
    (state) => state.users
  );
  const dispatch = useDispatch();
  const [inputs, setInputs] = useState({
    author: "",
    category: "",
  });
  const [generalFilter, setGeneralFilter] = useState(filterCard);
  const [booksFilters, setBooksFilters] = useState({
    filterAuthor: filterBooksByAuthor,
    filterCategory: filterBooksByCategory,
  });
  const [userFilters, setUserFilters] = useState({
    filterEnabled: filterUserByEnabled,
    filterType: filterUserByType,
  });
  useEffect(() => {
    dispatch(setFilterCard(generalFilter));
    dispatch(updateCurrentPage(1));
    if (authors.length <= 0 || categories.length <= 0) {
      dispatch(asyncGetAuthors());
      dispatch(asyncGetCategories());
    }
    if (generalFilter === "books") {
      dispatch(setAuthorFilter(booksFilters.filterAuthor));
      dispatch(setCategoryFilter(booksFilters.filterCategory));
      dispatch(applyBookFilters());

      dispatch(setEnabledFilter(""));
      dispatch(setTypeFilter(""));
      dispatch(applyUserFilters());
    } else if (generalFilter === "users") {
      dispatch(setEnabledFilter(userFilters.filterEnabled));
      dispatch(setTypeFilter(userFilters.filterType));
      dispatch(applyUserFilters());

      dispatch(setAuthorFilter([]));
      dispatch(setCategoryFilter([]));
      dispatch(applyBookFilters());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, filterBooksByAuthor, generalFilter, booksFilters, userFilters]);

  function setCardType(e) {
    setGeneralFilter(e.target.value);
  }

  function handleChange(e) {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  }

  function addAuthor(a) {
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
    setBooksFilters({
      ...booksFilters,
      filterAuthor: booksFilters.filterAuthor.filter((auth) => auth !== a),
    });
  }

  function addCategory(c) {
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
    setBooksFilters({
      ...booksFilters,
      filterCategory: booksFilters.filterCategory.filter((cat) => cat !== c),
    });
  }
  return (
    <form className={s.formCont}>
      <select
        onChange={(e) => setCardType(e)}
        className={s.selects}
        id="cardType"
        value={filterCard}
      >
        <option className={s.option} value="books">
          Books
        </option>
        <option className={s.option} value="users">
          Users
        </option>
      </select>
      {filterCard === "books" ? (
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
          </div>
          <div className={s.searchAuthorCont}>
            <div>
              {inputs.author.length > 0 &&
                authors.map((a, i) =>
                  a.toLowerCase().includes(inputs.author.toLowerCase()) ? (
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
          <div className={s.filterAuthorList}>
            Authors applied:
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
          </div>
          <div className={s.searchCategoryCont}>
            <div>
              {inputs.category.length > 0 &&
                categories.map((c, i) =>
                  c.toLowerCase().includes(inputs.category.toLowerCase()) ? (
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
          <div className={s.filterCategoryList}>
            Categories applied:
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
      ) : (
        <div className={s.filtersUserCont}>
          <label>Filter user status:</label>
          <select
            onChange={(e) =>
              setUserFilters({ ...userFilters, filterEnabled: e.target.value })
            }
            className={s.selects}
            id="filterEnabled"
            value={userFilters.filterEnabled}
          >
            <option className={s.option} value="">
              All
            </option>
            <option className={s.option} value="enabled">
              Enabled
            </option>
            <option className={s.option} value="suspended">
              Suspended
            </option>
          </select>
          <label>Filter user type:</label>
          <select
            onChange={(e) =>
              setUserFilters({ ...userFilters, filterType: e.target.value })
            }
            className={s.selects}
            id="filterType"
            value={userFilters.filterType}
          >
            <option className={s.option} value="">
              All
            </option>
            <option className={s.option} value="user">
              User
            </option>
            <option className={s.option} value="admin">
              Admin
            </option>
          </select>
        </div>
      )}
    </form>
  );
}

export default Filters;
