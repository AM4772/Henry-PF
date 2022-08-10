import axios from "axios";
import Swal from "sweetalert2";
const heroku = `https://db-proyecto-final.herokuapp.com`;
axios.defaults.baseURL = heroku;

export function asyncSendContactEmail(body) {
  return async function (dispatch) {
    try {
      const response = (await axios.post("/emails/contact", body)).data;
      return Swal.fire({
        icon: "success",
        text: "Email sent!",
        title: `${response.message}`,
        showConfirmButton: false,
        timer: 2000,
      }).then(() => {
        return true;
      });
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: `${error.response.data}`,
      });
    }
  };
}
