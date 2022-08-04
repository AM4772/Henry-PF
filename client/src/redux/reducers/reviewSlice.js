import { createSlice } from "@reduxjs/toolkit";
const initialState = {
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
	},
});
export const { getReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
