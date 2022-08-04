import { createSlice } from "@reduxjs/toolkit";
const initialState = {
	reviews2: [],
	allReviews: [],
};
const reviewSlice = createSlice({
	name: "reviews",
	initialState,
	reducers: {
		getReviews: (state, action) => {
			state.reviews2 = action.payload;
			state.allReviews = [action.payload];
		},
	},
});
export const { getReviews } = reviewSlice.actions;
export default reviewSlice.reducer;
