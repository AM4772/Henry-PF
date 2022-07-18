import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBooks: [],
  books: [],
  bookDetail: {},
  filterBooksByAuthor: "",
  filterBooksByCategory: "",
  filterCard: "",
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
    getBookDetail: (state, action) => {
      state.bookDetail = action.payload;
    },
    clearBookDetail: (state) => {
      state.bookDetail = {};
    },
  },
});

export const { getBooks, getBookDetail, clearBookDetail } = booksSlice.actions;

export default booksSlice.reducer;
