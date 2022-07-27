import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userProfile: {},
  favourites: [],
  cart: [],
  appLoadingProfile: true,
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
      state.appLoadingProfile = false;
    },
    logOut: (state) => {
      state.userProfile = {};
      localStorage.removeItem("ALTKN");
    },
    firstAutoLogin: (state) => {
      state.firstAuto = false;
      state.appLoadingProfile = false;
    },
    getFavourites: (state, action) => {
      state.favourites = action.payload;
    },
    addFavourite: (state, action) => {
      state.favourites = action.payload;
    },
    deleteFavourite: (state, action) => {
      state.favourites = action.payload;
    },
    deleteAllFavourites: (state, action) => {
      state.favourites = action.payload;
    },
  },
});

export const {
  getProfile,
  loginUser,
  logOut,
  firstAutoLogin,
  getFavourites,
  addFavourite,
  deleteFavourite,
  deleteAllFavourites,
} = profileSlice.actions;

export default profileSlice.reducer;
