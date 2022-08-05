import { configureStore } from "@reduxjs/toolkit";
import booksReducer from "./reducers/booksSlice";
import usersReducer from "./reducers/usersSlice";
import profileReducer from "./reducers/profileSlice";
import paginationReducer from "./reducers/paginationSlice";
import historySlice from "./reducers/historySlice";
import dashboardSlice from "./reducers/dashboardSlice";
import checkoutSlice from "./reducers/checkoutSlice";
import reviewSlice from "./reducers/reviewSlice";
export const store = configureStore({
  reducer: {
    books: booksReducer,
    users: usersReducer,
    profile: profileReducer,
    pagination: paginationReducer,
    history: historySlice,
    dashboard: dashboardSlice,
    checkout: checkoutSlice,
    reviews: reviewSlice,
  },
});
