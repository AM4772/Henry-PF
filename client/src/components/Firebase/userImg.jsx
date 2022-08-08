import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetImage } from "../../redux/actions/usersActions";
import { uploadFile } from "../Firebase/config";

import s from "./userImg.module.sass";

function UserImg({ ID }) {
	const [file, setFile] = useState(null);
	const [img, setImg] = useState();
	const dispatch = useDispatch();
	const { userProfile } = useSelector((state) => state.profile);
	console.log("soy file", file);

	async function handleSubmit(e) {
		e.preventDefault();
		try {
			const result = await uploadFile(file, ID);
			console.log(result);
			setImg(result);
			dispatch(asyncSetImage(result));
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		console.log("hola soy img", img);
	}, [img]);
	return (
		<>
			<div className={s.imgContainer}>
				{img ? (
					<img src={img} alt="ProfileImg" />
				) : (
					<div className={s.testIMG}>
						<h1 className={s.noImg}>
							{userProfile.name && userProfile.surname
								? userProfile.name.charAt(0).toUpperCase() +
								  userProfile.surname.charAt(0).toUpperCase()
								: null}
						</h1>
					</div>
				)}
				<form onSubmit={handleSubmit} className={s.formContainer}>
					<input
						type="file"
						name=""
						id=""
						onChange={(e) => setFile(e.target.files[0])}
					/>
					<button>Upload</button>
				</form>
			</div>
		</>
	);
}

export default UserImg;
