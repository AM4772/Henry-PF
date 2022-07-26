import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: [],
  allBooks: [],
  books: [],
  homeBooks: {},
  bookDetail: {},
  authors: [],
  categories: [],
  filterBooksByAuthor: [],
  filterBooksByCategory: [],
  filterCard: "books",
  orderBooksBy: "",
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks: (state, action) => {
      state.books = action.payload;
      state.allBooks = [...action.payload];
    },
    getSearch: (state, action) => {
      state.search = action.payload;
    },
    getAuthors: (state, action) => {
      state.authors = action.payload;
    },
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    getBookDetail: (state, action) => {
      state.bookDetail = action.payload;
    },
    clearBookDetail: (state) => {
      state.bookDetail = {};
    },
    setFilterCard: (state, action) => {
      state.filterCard = action.payload;
    },
    setAuthorFilter: (state, action) => {
      state.filterBooksByAuthor = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.filterBooksByCategory = action.payload;
    },
    applyBookFilters: (state) => {
      state.books = [...state.allBooks];

      if (state.books[0] !== null && state.books.length > 0) {
        if (state.filterBooksByAuthor.length > 0) {
          var filterAuthorArray = [];
          state.filterBooksByAuthor.map((a) =>
            state.books.filter((book) =>
              book.authors.filter((auth) => {
                if (
                  auth
                    .toLowerCase()
                    .replace(/^\s+|\s+$/g, "")
                    .replace(/\./g, "")
                    .replace(/\s+/g, "")
                    .includes(
                      a
                        .replace(/^\s+|\s+$/g, "")
                        .replace(/\./g, "")
                        .replace(/\s+/g, "")
                        .toLowerCase()
                    )
                ) {
                  const finded = filterAuthorArray.find(
                    (b) => b.ID === book.ID
                  );
                  if (!finded) {
                    return filterAuthorArray.push(book);
                  } else {
                    return null;
                  }
                }
                return null;
              })
            )
          );
          state.books = filterAuthorArray;
        }
      }
      if (state.books[0] && state.books.length > 0) {
        if (state.filterBooksByCategory.length > 0) {
          var filterCategoryArray = [];
          state.filterBooksByCategory.map((c) =>
            state.books.filter((book) =>
              book.categories.filter((cat) => {
                if (
                  cat
                    .toLowerCase()
                    .replace(/^\s+|\s+$/g, "")
                    .replace(/\./g, "")
                    .replace(/\s+/g, "")
                    .includes(
                      c
                        .replace(/^\s+|\s+$/g, "")
                        .replace(/\./g, "")
                        .replace(/\s+/g, "")
                        .toLowerCase()
                    )
                ) {
                  const finded = filterCategoryArray.find(
                    (b) => b.ID === book.ID
                  );
                  if (!finded) {
                    return filterCategoryArray.push(book);
                  } else {
                    return null;
                  }
                }
                return null;
              })
            )
          );
          state.books = filterCategoryArray;
        }
      }
    },
    getHomeBooks: (state, action) => {
      state.homeBooks = action.payload;
    },
  },
});

export const {
  getBooks,
  getAuthors,
  getCategories,
  getBookDetail,
  clearBookDetail,
  setFilterCard,
  setAuthorFilter,
  setCategoryFilter,
  applyBookFilters,
  getSearch,
  getHomeBooks,
} = booksSlice.actions;

export default booksSlice.reducer;
