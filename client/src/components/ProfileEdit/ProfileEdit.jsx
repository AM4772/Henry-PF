import React, { useState, useEffect } from "react";
import { FaQuestionCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import s from "./ProfileEdit.module.sass";

function ProfileEdit() {
	const { userProfile } = useSelector((state) => state.profile);

	const [input, setInput] = useState({
		username: userProfile.username,
		name: userProfile.name,
		surname: userProfile.surname,
		email: userProfile.email,
		//=========
		// Chequear el tema de la verif de password,
		password: userProfile.password,
		newPassword: "",
	});
	const [passwordShown, setPasswordShown] = useState(false);

	function handleChange(e) {
		e.preventDefault();
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
		console.log(input.name);
	}
	function togglePassword(e) {
		setPasswordShown(!passwordShown);
	}
	return (
		<>
			<div className={s.data}>
				<form>
					<div className={s.section}>
						<span>
							Username: <FaQuestionCircle />
							{/* La idea seria que con un hover en el ?*/}
						</span>
						<hr className={s.divisors} />
						<input
							type="text"
							name="username"
							value={input.username}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className={s.section}>
						<span>
							Name: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input
							type="text"
							name="name"
							value={input.name}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className={s.section}>
						<span>
							Surname: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input
							type="text"
							name="surname"
							value={input.surname}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className={s.section}>
						<span>
							E-mail: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input
							type="text"
							name="email"
							value={input.email}
							onChange={(e) => handleChange(e)}
						/>
					</div>
					<div className={s.section}>
						<span>
							Current password: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input
							type={passwordShown ? "text" : "password"}
							name="password"
							value={input.password}
							onChange={(e) => handleChange(e)}
						/>
						{passwordShown ? (
							<FaEye onClick={togglePassword} />
						) : (
							<FaEyeSlash onClick={togglePassword} />
						)}
					</div>
					<div className={s.section}>
						<span>
							New password: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input
							type={passwordShown ? "text" : "password"}
							name="newPassword"
							value={input.newPassword}
							onChange={(e) => handleChange(e)}
						/>
						{passwordShown ? (
							<FaEye onClick={togglePassword} />
						) : (
							<FaEyeSlash onClick={togglePassword} />
						)}
					</div>
				</form>
			</div>
		</>
	);
}

export default ProfileEdit;
