import axios from "axios";
import { getUsers, getUserDetail } from "../reducers/usersSlice";

axios.defaults.baseURL = `http://localhost:3001`;

export function asyncGetUsers() {
  return async function (dispatch) {
    try {
      const response = (await axios("/users")).data;
      dispatch(getUsers(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncGetUserDetail(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios("/users/" + ID)).data;
      dispatch(getUserDetail(response));
    } catch (error) {
      console.error(error);
    }
  };
}
