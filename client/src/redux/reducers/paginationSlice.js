import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentPage: 1,
	cardsPerPage: 40,
	currentSection: 0,
};

const paginationSlice = createSlice({
	name: "pagination",
	initialState,
	reducers: {
		updateCurrentPage: (state, action) => {
			state.currentPage = action.payload;
		},
		changeSection: (state, action) => {
			state.currentSection = action.payload;
		},
	},
});

export const { updateCurrentPage, changeSection } = paginationSlice.actions;

export default paginationSlice.reducer;
