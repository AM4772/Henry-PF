import axios from "axios";
import { getPaymentID, getPayments } from "../reducers/paymentsSlice";
import { setPaymentDetail } from "../reducers/profileSlice";
const heroku = `https://db-proyecto-final.herokuapp.com`;
axios.defaults.baseURL = heroku;
export function asyncGetPayments() {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`/payments`)).data.data;
      dispatch(getPayments(response));
    } catch (error) {}
  };
}

export function asyncGetPaymentsByID(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios.get(`/payments/${ID}`)).data.data;
      dispatch(getPaymentID(response));
    } catch (error) {}
  };
}

export function asyncUserGetPaymentsByID(ID) {
  return async function (dispatch) {
    try {
      const token = localStorage.getItem("ALTKN");
      const response = (await axios.get(`/payments/${ID}?token=${token}`)).data
        .data;
      dispatch(setPaymentDetail(response));
    } catch (error) {}
  };
}
