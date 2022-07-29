import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	/* section: ["dashboard", "users", "books", "payments", "analytics"], */
	currentSection: 0,
};

const dashboardSlice = createSlice({
	name: "dashboard",
	initialState,
	reducers: {
		changeSection: (state, action) => {
			state.currentSection = action.payload;
		},
	},
});

export const { changeSection } = dashboardSlice.actions;

export default dashboardSlice.reducer;
