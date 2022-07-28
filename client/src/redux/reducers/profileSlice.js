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
      // console.log(action.payload);
      state.favourites = action.payload.books;
      state.appLoadingProfile = false;
    },
    logOut: (state) => {
      state.userProfile = {};
      state.favourites = [];
      localStorage.removeItem("ALTKN");
    },
    firstAutoLogin: (state) => {
      state.firstAuto = false;
      state.appLoadingProfile = false;
    },
    addFavourite: (state, action) => {
      state.favourites = action.payload;
    },
    deleteFavourite: (state, action) => {
      state.favourites = action.payload;
    },
    getItemCart: (state, action) => {
      state.cart = action.payload;
    },
    addItemCart: (state, action) => {
      state.cart = action.payload;
    },
    removeItemCart: (state, action) => {
      state.cart = action.payload;
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
  getItemCart,
  addItemCart,
  removeItemCart,
} = profileSlice.actions;

export default profileSlice.reducer;
