import axios from "axios";
import { getReviews } from "../reducers/reviewSlice";

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
