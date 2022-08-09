import axios from "axios";
import Swal from "sweetalert2";
import { getReviews, editReview } from "../reducers/reviewSlice";
import { setCloseButtonReview } from "../reducers/booksSlice";

const heroku = `https://db-proyecto-final.herokuapp.com/`;
axios.defaults.baseURL = heroku;

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

export function asyncGetReviews() {
  return async function (dispatch) {
    try {
      const response = (await axios.get("/reviews")).data;
      dispatch(getReviews(response));
    } catch (error) {
      dispatch(getReviews([null]));
    }
  };
}

export function asyncAddReview(body) {
  return async function (dispatch) {
    try {
      await axios.post("/reviews", body);
      Swal.fire({
        icon: "success",
        text: "You have correctly added the review to this book",
        title: "Added!",
        showConfirmButton: false,
        timer: 2000,
      });
      setTimeout(() => {
        dispatch(setCloseButtonReview());
      }, 2000);
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data.message}`,
      });
      console.error(error);
    }
  };
}

export function asyncEditReview(ID, body) {
  return async function (dispatch) {
    try {
      const response = (await axios.put(`/reviews/${ID}`, body)).data;
      dispatch(editReview(response.data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function asyncdeleteReview(ID) {
  return async function (dispatch) {
    try {
      await axios.delete(`/reviews/${ID}`);
      return `Review ${ID} has been deleted`;
    } catch (error) {
      console.log(error);
    }
  };
}
