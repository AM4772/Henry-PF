import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allUsers: [],
  users: [],
  userDetail: {},
  orderUsersBy: "",
  filterUserByEnabled: "",
  filterUserByType: "",
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUsers: (state, action) => {
      state.users = action.payload;
      state.allUsers = [...action.payload];
    },
    getUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    clearUserDetail: (state) => {
      state.userDetail = {};
    },
  },
});

export const { getUsers, getUserDetail, clearUserDetail } = usersSlice.actions;

export default usersSlice.reducer;
