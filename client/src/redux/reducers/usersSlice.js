import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchUser: [],
  allUsers: [],
  users: [],
  appLoadingUsers: true,
  userDetail: {},
  usernames: [],
  emails: [],
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
    getSearchUser: (state, action) => {
      state.searchUser = action.payload;
    },
    getUserDetail: (state, action) => {
      state.userDetail = action.payload;
    },
    clearUserDetail: (state) => {
      state.userDetail = {};
    },
    setEnabledFilter: (state, action) => {
      state.filterUserByEnabled = action.payload;
    },
    setTypeFilter: (state, action) => {
      state.filterUserByType = action.payload;
    },
    applyUserFilters: (state) => {
      state.users = [...state.allUsers];
      if (state.users[0] !== null && state.users.length > 0) {
        if (state.filterUserByEnabled.length > 0) {
          if (state.filterUserByEnabled === "enabled") {
            state.users = state.users.filter((user) => user.enabled !== false);
          } else {
            state.users = state.users.filter((user) => user.enabled === false);
          }
        }
      }
      if (state.users[0] && state.users.length > 0) {
        if (state.filterUserByType.length > 0) {
          state.users = state.users.filter(
            (user) => user.type === state.filterUserByType
          );
        }
      }
    },
    setEmails: (state, action) => {
      state.emails = [...action.payload];
      state.appLoadingUsers = false;
    },
    setUsernames: (state, action) => {
      state.usernames = [...action.payload];
      state.appLoadingUsers = false;
    },
  },
});

export const {
  getUsers,
  getUserDetail,
  clearUserDetail,
  setEnabledFilter,
  setTypeFilter,
  applyUserFilters,
  getSearchUser,
  setEmails,
  setUsernames,
} = usersSlice.actions;

export default usersSlice.reducer;
