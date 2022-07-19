import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: [],
  allBooks: [],
  books: [],
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
      if (state.filterBooksByAuthor.length > 0) {
        state.books = state.filterBooksByAuthor.map((a) =>
          state.books.find((book) => book.authors.includes(a))
        );
      }
      if (state.filterBooksByCategory.length > 0) {
        state.books = state.filterBooksByCategory.map((c) =>
          state.books.find((book) => book.categories.includes(c))
        );
      }
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
} = booksSlice.actions;

export default booksSlice.reducer;
