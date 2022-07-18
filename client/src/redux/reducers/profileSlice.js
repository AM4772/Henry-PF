import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {},
  favourites: [],
  cart: [],
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.userProfile = action.payload;
    },
  },
});

export const { getProfile } = profileSlice.actions;

export default profileSlice.reducer;
