import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./reducers/booksSlice";
import usersReducer from "./reducers/usersSlice";
import profileReducer from "./reducers/profileSlice";
import paginationReducer from "./reducers/paginationSlice";

export const store = configureStore({
  reducer: {
    books: booksReducer,
    users: usersReducer,
    profile: profileReducer,
    pagination: paginationReducer,
  },
});
