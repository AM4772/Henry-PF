import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  review: {},
  reviews: [],
  allReviews: [],
};
const reviewSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    getReviews: (state, action) => {
      state.reviews = action.payload;
      state.allReviews = [...action.payload];
    },
    addReview: (state, action) => {
      state.review = {
        title: action.payload.title,
        review: action.payload.review,
        rating: action.payload.rating,
        bookID: action.payload.bookID,
        userID: action.payload.userID,
      };
    },
    editReview: (state, action) => {
      state.review = {
        ID: action.payload.ID,
        title: action.payload.title,
        review: action.payload.review,
        rating: action.payload.rating,
        bookID: action.payload.bookID,
        userID: action.payload.userID,
        reports: action.payload.reports,
      };
    },
  },
});
export const { getReviews, addReview, editReview } = reviewSlice.actions;
export default reviewSlice.reducer;
