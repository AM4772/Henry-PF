import axios from "axios";
import { getReviews, editReview } from "../reducers/reviewSlice";

const heroku = `https://db-proyecto-final.herokuapp.com/`;
axios.defaults.baseURL = heroku;

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
    } catch (error) {
      console.log(error);
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
