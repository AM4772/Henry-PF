import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stack: [],
};

const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    addStack: (state, action) => {
      state.stack = [action.payload, ...state.stack];
      state.stack = state.stack.slice(0, 11);
    },
  },
});

export const { addStack } = historySlice.actions;

export default historySlice.reducer;
