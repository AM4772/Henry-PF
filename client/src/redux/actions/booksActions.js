import axios from 'axios';
import Swal from 'sweetalert2';
import {
  getBooks,
  getBookDetail,
  getAuthors,
  getCategories,
  getSearch,
  getHomeBooks,
} from '../reducers/booksSlice';
// const localhost = 'http://localhost:3001';
const heroku = `https://db-proyecto-final.herokuapp.com`;
axios.defaults.baseURL = heroku;

export function asyncGetBooks(query) {
  return async function (dispatch) {
    try {
      if (!query) {
        const response = (await axios('/books')).data;
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
      const response = (await axios('/books')).data;
      dispatch(getSearch(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncGetBookDetail(ID) {
  return async function (dispatch) {
    try {
      const response = (await axios('/books/' + ID)).data;
      dispatch(getBookDetail(response));
      return true;
    } catch (error) {
      return undefined;
    }
  };
}

export function asyncGetAuthors() {
  return async function (dispatch) {
    try {
      const response = (await axios.get('/authors')).data;
      dispatch(getAuthors(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncGetCategories() {
  return async function (dispatch) {
    try {
      const response = (await axios.get('/categories')).data;
      dispatch(getCategories(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncGetHomeBooks() {
  return async function (dispatch) {
    try {
      const response = (await axios.get('/books/homeBooks')).data;
      return dispatch(getHomeBooks(response));
    } catch (error) {
      console.error(error);
    }
  };
}

export function asyncCreateBook(book) {
  return async function (dispatch) {
    try {
      const response = (await axios.post('/books', book)).data;
      Swal.fire({
        icon: 'success',
        text: response.data,
        title: response.message,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        dispatch(asyncGetSearch());
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data}`,
      });
    }
  };
}

export function asyncEditBook(ID, book) {
  return async function (dispatch) {
    try {
      const response = (await axios.put(`/books/${ID}`, book)).data;
      Swal.fire({
        icon: 'success',
        text: response.data,
        title: response.message,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        window.location.reload(false);
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `${error.response.data}`,
      });
    }
  };
}

export function asyncDeleteBook(book, title) {
  return async function (dispatch) {
    return await Swal.fire({
      title: 'Are you sure you want to delet this book?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete book!',
    }).then(async result => {
      try {
        if (result.isConfirmed) {
          await axios.delete(`/books/${book}`);
          return await Swal.fire(
            'Deleted!',
            `<b>${title.toUpperCase()}</b> has been deleted.`,
            'success'
          ).then(() => {
            return true;
          });
        }
      } catch (error) {
        return await Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `${error.response.data}`,
        }).then(() => {
          return undefined;
        });
      }
    });
  };
}
