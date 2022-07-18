import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentPage: 1,
  cardsPerPage: 40,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState,
  reducers: {
    getPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { getPage } = paginationSlice.actions;

export default paginationSlice.reducer;
