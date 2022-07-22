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
    loginUser: (state, action) => {
      state.userProfile = {
        ID: action.payload.id,
        name: action.payload.name,
        lastname: action.payload.lastname,
        email: action.payload.email,
      };
    },
  },
});

export const { getProfile, loginUser } = profileSlice.actions;

export default profileSlice.reducer;
