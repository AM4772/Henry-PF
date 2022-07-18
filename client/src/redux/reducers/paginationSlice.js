import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentPage: 1,
  cardsPerPage: 40,
};

const paginationSlice = createSlice({
  name: 'pagination',
  initialState,
  reducers: {
    // getPage: state => state.currentPage = state.currentPage + 1,
    updateCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
});

export const { updateCurrentPage } = paginationSlice.actions;

export default paginationSlice.reducer;
