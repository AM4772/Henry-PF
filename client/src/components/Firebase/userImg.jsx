import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncSetImage } from "../../redux/actions/usersActions";
import { uploadFile } from "../Firebase/config";

import s from "./userImg.module.sass";

function UserImg({ ID }) {
	const [img, setImg] = useState();
	const dispatch = useDispatch();
	const { userProfile } = useSelector((state) => state.profile);

	async function onChange(e) {
		e.preventDefault();
		try {
			const result = await uploadFile(e.target.files[0], ID);

			setImg(result);
			dispatch(asyncSetImage(ID, { ...userProfile, profilePic: result }));
			console.log("soy data", ID, result);
		} catch (error) {
			console.log(error);
		}
	}
	useEffect(() => {
		console.log("hola soy img", img);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile]);
	return (
		<>
			<div className={s.imgContainer}>
				{userProfile.profilePic ? (
					<div className={s.testIMG}>
						<input
							type="file"
							name=""
							id=""
							onChange={(e) => onChange(e)}
							className={s.formContainer}
						/>

						<img src={userProfile.profilePic} alt="ProfileImg" />
					</div>
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
			</div>
		</>
	);
}

export default UserImg;
