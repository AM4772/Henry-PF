import { createSlice } from "@reduxjs/toolkit";
import Swal from "sweetalert2";

const initialState = {
  userProfile: {},
  favourites: [],
  cart: [],
  appLoadingProfile: true,
  firstAuto: true,
};

const satisfaction = Swal.mixin({
  background: "#DED7CF",
  backdrop: false,
  toast: true,
  heightAuto: false,
  position: "bottom-end",
  showConfirmButton: false,
  iconColor: "#1E110B",
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    enableAndSuspendUser: (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        enabled: action.payload.enabled,
        suspendedTimes: action.payload.suspendedTimes,
      };
      state.appLoadingProfile = false;
    },
    enableUser: (state, action) => {
      state.userProfile = {
        ...state.userProfile,
        enabled: action.payload.enabled,
      };
      state.appLoadingProfile = false;
    },
    loginUser: (state, action) => {
      state.userProfile = {
        ID: action.payload.ID,
        name: action.payload.name,
        surname: action.payload.surname,
        username: action.payload.username,
        email: action.payload.email,
        admin: action.payload.admin,
        enabled: action.payload.enabled,
        suspendedTimes: action.payload.suspendedTimes,
        payments: action.payload.payments,
      };
      state.favourites = action.payload.books;
      state.appLoadingProfile = false;
    },

    logOut: (state) => {
      state.userProfile = {};
      state.favourites = [];
      state.cart = [];
      var index = document.cookie.lastIndexOf("ALTKNcookie");
      var cookie = document.cookie.slice(index).split("=");
      document.cookie = `ALTKNcookie=${cookie[1]}; max-age=-10; path=/;`;
      localStorage.removeItem("ALTKN");
      satisfaction.fire({
        icon: "info",
        title: "Logged out!",
        html: "You have successfully <b>logged out</b>",
      });
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
    getItemsCart: (state, action) => {
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
  getItemsCart,
  addItemCart,
  enableUser,
  removeItemCart,
  enableAndSuspendUser,
} = profileSlice.actions;

export default profileSlice.reducer;
