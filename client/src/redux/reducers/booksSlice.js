import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  search: [],
  allBooks: [],
  loading: true,
  appLoading: true,
  books: [],
  booksNoSorted: [],
  homeBooks: {},
  bookDetail: {},
  authors: [],
  categories: [],
  filterBooksByAuthor: [],
  filterBooksByCategory: [],
  filterCard: "books",
  orderBooksBy: "A-Z",
  closeButtonReview: false,
  closeButtonEdit: false,
};

const booksSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    getBooks: (state, action) => {
      state.books = action.payload;
      state.booksNoSorted = [...action.payload];
      state.allBooks = [...action.payload];
      state.loading = false;
    },
    clearAllBooks: (state) => {
      state.allBooks = [];
      state.books = [];
      state.booksNoSorted = [];
      state.loading = true;
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
      state.booksNoSorted = [...state.allBooks];
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
          state.booksNoSorted = [...filterAuthorArray];
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
          state.booksNoSorted = [...filterCategoryArray];
        }
      }
    },
    getHomeBooks: (state, action) => {
      state.homeBooks = action.payload;
      state.appLoading = false;
    },
    setSortBook: (state, action) => {
      state.orderBooksBy = action.payload;
    },
    applyBookSort: (state) => {
      if (state.orderBooksBy === "A-Z") {
        state.books = [...state.booksNoSorted];
      } else if (state.orderBooksBy === "H-L-price") {
        state.books.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
      } else if (state.orderBooksBy === "L-H-price") {
        state.books.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
      } else if (state.orderBooksBy === "N-O") {
        state.books.sort(
          (a, b) => new Date(b.publishedDate) - new Date(a.publishedDate)
        );
      } else if (state.orderBooksBy === "O-N") {
        state.books.sort(
          (a, b) => new Date(a.publishedDate) - new Date(b.publishedDate)
        );
      } else if (state.orderBooksBy === "H-L-rating") {
        state.books.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
      } else if (state.orderBooksBy === "L-H-rating") {
        state.books.sort((a, b) => parseFloat(a.rating) - parseFloat(b.rating));
      }
    },
    setCloseButtonReview: (state) => {
      state.closeButtonReview = !state.closeButtonReview;
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
  clearAllBooks,
  setSortBook,
  applyBookSort,
  setCloseButtonReview,
  setCloseButtonEdit,
} = booksSlice.actions;

export default booksSlice.reducer;
