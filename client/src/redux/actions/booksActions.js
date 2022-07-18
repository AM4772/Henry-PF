import axios from "axios";
import { getBooks, getBookDetail } from "../reducers/booksSlice";

axios.defaults.baseURL = `http://localhost:3001`;

export function asyncGetBooks() {
  return async function (dispatch) {
    try {
      const response = (await axios("/books")).data;
      dispatch(getBooks(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncGetBookDetail(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios("/books/" + ID)).data;
      dispatch(getBookDetail(response));
    } catch (error) {
      console.error(error);
    }
  };
}
