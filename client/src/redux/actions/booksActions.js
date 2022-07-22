import axios from "axios";
import {
  getBooks,
  getBookDetail,
  getAuthors,
  getCategories,
  getSearch,
} from "../reducers/booksSlice";

axios.defaults.baseURL = `https://db-proyecto-final.herokuapp.com`;

export function asyncGetBooks(query) {
  return async function (dispatch) {
    try {
      if (!query) {
        const response = (await axios("/books")).data;
        dispatch(getBooks(response));
      } else {
        const response = (await axios(`/books?title=${query}`)).data;
        dispatch(getBooks(response));
      }
    } catch (error) {
      dispatch(getBooks([null]));
    }
  };
}

export function asyncGetSearch() {
  return async function (dispatch) {
    try {
      const response = (await axios("/books")).data;
      dispatch(getSearch(response));
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

export function asyncGetAuthors() {
  return async function (dispatch) {
    try {
      const response = (await axios.get("/authors")).data;
      dispatch(getAuthors(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncGetCategories() {
  return async function (dispatch) {
    try {
      const response = (await axios.get("/categories")).data;
      dispatch(getCategories(response));
    } catch (error) {
      console.error(error);
    }
  };
}
