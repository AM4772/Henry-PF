import axios from "axios";
import Swal from "sweetalert2";
import {
  firstAutoLogin,
  loginUser,
  addFavourite,
  deleteFavourite,
  addItemCart,
  removeItemCart,
  getItemsCart,
  enableAndSuspendUser,
  enableUser,
  setConfirmMail,
  setResetID,
  clearResetID,
} from "../reducers/profileSlice";
import {
  getUsers,
  getUserDetail,
  getSearchUser,
  setEmails,
  setUsernames,
  clearUserDetail,
} from "../reducers/usersSlice";

// const localhost = 'http://localhost:3001';
const heroku = `https://db-proyecto-final.herokuapp.com`;
axios.defaults.baseURL = heroku;

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
      await axios.post("/users", info);
      return await Swal.fire({
        icon: "success",
        title: "Your account has been created, check your email",
      }).then(() => {
        return true;
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Sorry, we were unable to register you, please try again later",
      }).then(() => {
        return undefined;
      });
    }
  };
}

export function asyncEnable(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios.post(`/login/enable/${ID}`)).data;
      dispatch(enableAndSuspendUser(response));
    } catch (error) {
      dispatch(enableUser({ enabled: false }));
    }
  };
}

export function asyncLogin(body, remember) {
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
        var today = Date.now();
        if (remember) localStorage.setItem("ALTKN", response.token);
        else
          document.cookie = `ALTKNcookie=${response.token}; max-age=86400; path=/;`;
        if (!response.enabled) {
          if (response.dateSuspended) {
            if (
              !(parseInt(today) < parseInt(response.dateSuspended) + 86400000)
            ) {
              dispatch(asyncEnable(response.ID));
            }
          }
        }
      });
    } catch (error) {
      var index = document.cookie.lastIndexOf("ALTKNcookie");
      var cookie = document.cookie.slice(index).split("=");
      document.cookie = `ALTKNcookie=${cookie[1]}; max-age=-10; path=/;`;
      localStorage.removeItem("ALTKN");
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
      var today = Date.now();
      dispatch(loginUser(response));
      if (!response.enabled) {
        if (response.dateSuspended) {
          if (
            !(parseInt(today) < parseInt(response.dateSuspended) + 86400000)
          ) {
            dispatch(asyncEnable(response.ID));
          }
        }
      }
    } catch (error) {
      var index = document.cookie.lastIndexOf("ALTKNcookie");
      var cookie = document.cookie.slice(index).split("=");
      document.cookie = `ALTKNcookie=${cookie[1]}; max-age=-10; path=/;`;
      localStorage.removeItem("ALTKN");
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
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
    }
  };
}

const satisfaction = Swal.mixin({
  background: "#DED7CF",
  toast: true,
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

export function asyncAddFavourite(userID, bookID) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.post(`/users/${userID}/favourites`, { ID: bookID })
      ).data.data;
      satisfaction.fire({
        icon: "success",
        title: "Added!",
        html: "You have <b>added</b> this book to your favourites",
      });
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
      satisfaction.fire({
        icon: "error",
        title: "Removed!",
        html: "You have <b>removed</b> this book from your favourites",
      });
      dispatch(deleteFavourite(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncGetItemsCart(userID) {
  return async function (dispatch) {
    try {
      const response = (await axios(`/users/${userID}/cart`)).data;
      dispatch(getItemsCart(response));
      return true;
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncAddItemCart(userID, bookID) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.post(`/users/${userID}/cart`, { ID: bookID })
      ).data.data;
      satisfaction.fire({
        icon: "success",
        title: "Added!",
        html: "You have <b>added</b> this item to your cart",
      });
      dispatch(addItemCart(response));
    } catch (error) {
      satisfaction.fire({
        icon: "error",
        title: "Oops...",
        html: "Sorry, we were unable to <b>add</b> the book to your cart",
      });
      console.error(error);
    }
  };
}

export function asyncRemoveItemCart(userID, bookID) {
  return async function (dispatch) {
    try {
      const response = (
        await axios.delete(`/users/${userID}/cart`, {
          data: {
            ID: parseInt(bookID),
          },
        })
      ).data.data;
      satisfaction.fire({
        icon: "error",
        title: "Removed!",
        html: "You have <b>removed</b> this book from your cart",
      });
      dispatch(removeItemCart(response));
    } catch (error) {
      satisfaction.fire({
        icon: "error",
        title: "Oops...",
        html: "Sorry, we were unable to <b>remove</b> the book from your cart",
      });
      console.error(error);
    }
  };
}

export function asyncModifyUser(ID, body) {
  return async function (dispatch) {
    try {
      console.log(body);
      const response = (await axios.put(`/users/${ID}`, body)).data;
      dispatch(loginUser(response.data));
      localStorage.setItem("ALTKN", response.data.token);
      return true;
      // return satisfaction
      //   .fire({
      //     icon: "success",
      //     title: "Modified!",
      //     html: `You have <b>modified</b> the user ${ID}`,
      //   })
      //   .then(() => {
      //     return true;
      //   }
      //   );
    } catch (error) {
      console.error(error);
      return satisfaction
        .fire({
          icon: "error",
          title: "Oops...",
          html: `There was an error`,
        })
        .then(() => {
          return undefined;
        });
    }
  };
}

export function asyncRegisterAuth0(body) {
  return async function (dispatch) {
    try {
      const response = (await axios.post("/users/auth0", body)).data;
      if (response.data) {
        localStorage.setItem("ALTKN", response.data.token);
        dispatch(loginUser(response.data));
      } else {
        dispatch(asyncLoginAuth0(body));
      }
    } catch (error) {
      console.log(error.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
    }
  };
}

export function asyncLoginAuth0(body) {
  return async function (dispatch) {
    try {
      const response = (await axios.post("/users/auth0/login", body)).data;
      localStorage.setItem("ALTKN", response.data.token);
      dispatch(loginUser(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function asyncDisableUser(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios.put(`/users/${ID}?suspended=true`)).data;
      dispatch(getUserDetail(response));
      // satisfaction.fire({
      //   icon: "success",
      //   title: "Success!",
      //   html: `You have <b>successfully</b> the user ${ID} has been disabled successfully`,
      // });
    } catch (error) {
      console.error(error);
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}

export function asyncEnableUser(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios.put(`/users/${ID}?enabled=true`)).data;
      dispatch(getUserDetail(response));
      // satisfaction.fire({
      //   icon: "error",
      //   title: "Success!",
      //   html: `You have <b>successfully</b> the user ${ID} has been enabled successfully`,
      // });
    } catch (error) {
      console.error(error);
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}

export function asyncSetAdmin(ID, name) {
  return async function (dispatch) {
    try {
      await axios.put(`/users/${ID}?admin=true`);
      dispatch(clearUserDetail());
      // satisfaction.fire({
      //   icon: "success",
      //   title: "Success!",
      //   html: `The type of the user <b> ${name} </b> has changed`,
      // });
    } catch (error) {
      console.error(error);
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}

export function asyncConfirmEmail(token) {
  return async function (dispatch) {
    try {
      await axios.get(`/confirm?token=${token}`);
      dispatch(setConfirmMail(true));
      satisfaction.fire({
        icon: "success",
        title: "Success!",
        html: `Your email has been confirmed`,
      });
    } catch (error) {
      dispatch(setConfirmMail(false));
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}

export function asyncSetImage(ID, result) {
  return async function (dispatch) {
    try {
      const response = (await axios.put(`/users/${ID}`, result)).data;
      dispatch(loginUser(response.data));
      satisfaction.fire({
        icon: "success",
        title: "Success!",
        html: `Image has edited set sucessfully`,
      });
    } catch (error) {
      console.log(error);
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}

export function asyncResetCode(user) {
  return async function (dispatch) {
    try {
      const response = (await axios.post(`/emails/reset`, { user })).data;
      satisfaction.fire({
        icon: "success",
        title: "Success!",
        html: `The code has been reset successfully`,
      });
      return dispatch(setResetID(response.data.ID));
    } catch (error) {
      console.log(error);
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}

export function asyncConfirmCode(ID, resetCode) {
  return async function (dispatch) {
    try {
      await axios.post(`/confirm/reset`, { ID, resetCode });
      return satisfaction
        .fire({
          icon: "success",
          title: "Success!",
          html: `The code has been confirmed`,
        })
        .then(() => {
          return true;
        });
    } catch (error) {
      console.log(error);
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}

export function asyncNewPassword(ID, password, rPassword) {
  return async function (dispatch) {
    try {
      await axios.post(`/confirm/newPassword`, {
        ID,
        password,
        rPassword,
      });
      satisfaction.fire({
        icon: "success",
        title: "Success!",
        html: `New password has been set successfully`,
      });
      return dispatch(clearResetID());
    } catch (error) {
      console.log(error);
      satisfaction.fire({
        icon: "error",
        title: "Oops!",
        html: `There was an error`,
      });
    }
  };
}
