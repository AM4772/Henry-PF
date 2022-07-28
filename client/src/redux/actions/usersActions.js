import axios from "axios";
import Swal from "sweetalert2";
import {
  firstAutoLogin,
  loginUser,
  addFavourite,
  deleteFavourite,
} from "../reducers/profileSlice";
import {
  getUsers,
  getUserDetail,
  getSearchUser,
  setEmails,
  setUsernames,
} from "../reducers/usersSlice";

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
        icon: "success",
        title: "Your account has been created, check your email",
        text: `${response.message}`,
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        return true;
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, we were unable to register you, please try again later",
      }).then(() => {
        return false;
      });
    }
  };
}

export function asyncLogin(body) {
  return async function (dispatch) {
    try {
      const response = (await axios.post("/login", body)).data;
      Swal.fire({
        icon: "success",
        text: "You have logged in successfully",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        dispatch(loginUser(response));
        localStorage.setItem("ALTKN", response.token);
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
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

export function asyncSetEmails() {
  return async function (dispatch) {
    try {
      const response = (await axios("/emails")).data;
      dispatch(setEmails(response));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
    }
  };
}

export function asyncSetUsernames() {
  return async function (dispatch) {
    try {
      const response = (await axios("/usernames")).data;
      dispatch(setUsernames(response));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
    }
  };
}

export function asyncAddFavourite(userID, bookID) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.post(`/users/${userID}/favourites`, { ID: bookID })
      ).data.data;
      dispatch(addFavourite(response));
    } catch (error) {
      console.error(error);
    }
  };
}
export function asyncDeleteFavourite(userID, bookID) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.delete(`/users/${userID}/favourites`, {
          data: {
            ID: parseInt(bookID),
          },
        })
      ).data.data;
      dispatch(deleteFavourite(response));
    } catch (error) {
      console.error(error);
    }
  };
}
