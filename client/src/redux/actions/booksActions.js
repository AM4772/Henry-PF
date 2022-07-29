import axios from "axios";
import Swal from "sweetalert2";
import {
  getBooks,
  getBookDetail,
  getAuthors,
  getCategories,
  getSearch,
  getHomeBooks,
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

export function asyncGetHomeBooks() {
  return async function (dispatch) {
    try {
      const response = (await axios.get("/books/homeBooks")).data;
      dispatch(getHomeBooks(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncCreateBook(book) {
  return async function (dispatch) {
    try {
      console.log(book)
      const response = (await axios.post("/books", book)).data;
      console.log(response)
      Swal.fire({
        icon: "success",
        text: response.data,
        title: response.message,
        showConfirmButton: false,
        timer: 2000,
      })
      // dispatch(createBook(response));
    } catch (error) {
      console.error(error);
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
    }
  };
}