import axios from "axios";
import Swal from 'sweetalert2';
import { firstAutoLogin, loginUser } from "../reducers/profileSlice";
import { getUsers, getUserDetail, getSearchUser } from "../reducers/usersSlice";

axios.defaults.baseURL = `https://db-proyecto-final.herokuapp.com`;

export function asyncGetUsers(username) {
  return async function (dispatch) {
    try {
      if (!username) {
        const response = (await axios("/users")).data;
        dispatch(getUsers(response));
      } else {
        const response = (await axios(`/users?username=${username}`)).data;
        dispatch(getUsers(response));
      }
    } catch (error) {
      dispatch(getUsers([null]));
    }
  };
}

export function asyncGetSearchUser() {
  return async function (dispatch) {
    try {
      const response = (await axios("/users")).data;
      dispatch(getSearchUser(response));
    } catch (error) {
      dispatch(getSearchUser([]));
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

export function asyncRegisterUser(info) {
  return async function (dispatch) {
    try {
      const response = (await axios.post("/users", info)).data;
      Swal.fire({
        icon: 'success',
        title: 'Your account has been created',
        text: `${response.message}`,
      })
      return true
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
      return false
    }
  };
}

export function asyncLogin(body) {
  return async function (dispatch) {
    try {
      const response = (await axios.post("/login", body)).data;
      Swal.fire({
        icon: 'success',
        title: 'You have logged in successfully',
        text: `${response.message}`,
      })
      dispatch(loginUser(response));
      localStorage.setItem("ALTKN", response.token);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data.message}`,
      })
    }
  };
}

export function asyncAutoLogin(token) {
  return async function (dispatch) {
    try {
      const response = (await axios.post("/login/autoLogin", { token })).data;
      dispatch(loginUser(response));
    } catch (error) {
      dispatch(firstAutoLogin());
    }
  };
}
