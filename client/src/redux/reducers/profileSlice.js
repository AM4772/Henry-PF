import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {},
  favourites: [],
  cart: [],
  firstAuto: true,
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
      localStorage.removeItem("ALTKN");
    },
    firstAutoLogin: (state) => {
      state.firstAuto = false;
    },
    addFavourite: (state, action) => {
      state.favourites = action.payload;
    },
    deleteFavourite: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

export const {
  getProfile,
  loginUser,
  logOut,
  firstAutoLogin,
  addFavourite,
  deleteFavourite,
} = profileSlice.actions;

export default profileSlice.reducer;
