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
        ID: action.payload.ID,
        name: action.payload.name,
        lastName: action.payload.lastName,
        username: action.payload.username,
        email: action.payload.email,
      };
    },
    logOut: (state) => {
      state.userProfile = {};
    },
  },
});

export const { getProfile, loginUser, logOut } = profileSlice.actions;

export default profileSlice.reducer;
