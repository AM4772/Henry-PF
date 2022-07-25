// import axios from "axios";
import { store } from "../store.js";
import { updateCurrentPage } from "../reducers/paginationSlice.js";

// axios.defaults.baseURL = `http://localhost:3001`;

// export function getPage() {
//   return async function (dispatch) {
//     try {
//       const response = (await axios("/books")).data;
//       dispatch(getBooks(response));
//     } catch (error) {
//       console.error(error);
//     }
//   };
// }

export function setCurrentPage(payload) {
  const currentPage = store.getState().pagination.currentPage;
  return function (dispatch) {
    if (payload === "next") dispatch(updateCurrentPage(currentPage + 1));
    else if (payload === "prev") dispatch(updateCurrentPage(currentPage - 1));
    else dispatch(updateCurrentPage(parseInt(payload)));
  };
}
