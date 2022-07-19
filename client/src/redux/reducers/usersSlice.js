import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  searchUser: [],
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
      if (state.filterUserByEnabled.length > 0) {
        if (state.filterUserByEnabled === "enabled") {
          state.users = state.users.filter((user) => user.enabled !== false);
        } else {
          state.users = state.users.filter((user) => user.enabled === false);
        }
      }
      if (state.filterUserByType.length > 0) {
        state.users = state.users.filter(
          (user) => user.type === state.filterUserByType
        );
      }
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
} = usersSlice.actions;

export default usersSlice.reducer;
