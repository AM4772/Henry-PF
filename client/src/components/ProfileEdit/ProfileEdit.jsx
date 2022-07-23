import React, { useState, useEffect } from "react";
import { FaQuestionCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import s from "./ProfileEdit.module.sass";

function ProfileEdit() {
	const { userProfile } = useSelector((state) => state.profile);
	const [errors, setErrors] = useState({
		username: "",
		name: "",
		lastName: "",
		email: "",
		password: "",
		newPassword: "",
	});

	let nameCapitalize = [];
	let lastNameCapitalize = [];
	let regex = {
		username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
		nameAndLast: /^([a-z]+([ ]?[a-z]?[a-z]+)*)$/,
		email:
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
	};

	function validate() {
		setErrors({
			username: "",
			name: "",
			lastName: "",
			email: "",
			password: "",
			newPassword: "",
		});
		if (input.username === "" || !regex.username.test(input.username)) {
			setErrors({
				...errors,
				username:
					input.username === ""
						? " "
						: "Username cannot contain symbols or whitespaces",
			});
		}
		if (
			input.name === "" ||
			!regex.nameAndLast.test(input.name.toLowerCase())
		) {
			setErrors({
				...errors,
				name: input.name === "" ? " " : "Name cannot contain symbols",
			});
		}
		if (
			input.lastName === "" ||
			!regex.nameAndLast.test(input.lastName.toLowerCase())
		) {
			setErrors({
				...errors,
				lastName:
					input.lastName === "" ? " " : "Lastname cannot contain symbols",
			});
		}
		if (input.email === "" || !regex.email.test(input.email)) {
			setErrors({
				...errors,
				email: input.email === "" ? " " : "Email invalid",
			});
		}
		if (input.password !== "") {
			if (input.newPassword === "") {
				setErrors({
					...errors,
					newPassword: " ",
				});
			}
		}
		if (input.newPassword !== "") {
			if (input.password === "") {
				setErrors({
					...errors,
					password: "You must first enter your password",
				});
			}
		}
		if (
			errors.username === "" &&
			errors.name === "" &&
			errors.lastName === "" &&
			errors.email === "" &&
			errors.password === "" &&
			errors.newPassword === ""
		) {
			return true;
		} else return false;
	}
	function validatePassword() {
		if (input.password !== "") {
			setInput({
				...input,
				editPassword: true,
			});
		}
	}

	if (userProfile.name) {
		let nameSplitted = userProfile.name.split(" ");
		nameCapitalize = nameSplitted.map(
			(n) => n.charAt(0).toUpperCase() + n.slice(1)
		);
	}
	if (userProfile.lastName) {
		let lastNameSplitted = userProfile.lastName.split(" ");
		lastNameCapitalize = lastNameSplitted.map(
			(n) => n.charAt(0).toUpperCase() + n.slice(1)
		);
	}
	const [input, setInput] = useState({
		username: userProfile.username,
		name: nameCapitalize.join(" "),
		lastName: lastNameCapitalize.join(" "),
		email: userProfile.email,
		//=========
		// Chequear el tema de la verif de password,
		password: "",
		newPassword: "",
		editPassword: false,
	});
	const [passwordShown, setPasswordShown] = useState(false);

	function handleChange(e) {
		e.preventDefault();
		setInput({
			...input,
			[e.target.name]: e.target.value,
		});
	}
	function togglePassword(e) {
		setPasswordShown(!passwordShown);
	}
	function handleSubmit(e) {
		e.preventDefault();
		if (validate()) {
			validatePassword();
			console.log(input);
			/* dispatch(asyncUserEdit(input)) */
		}
	}

	useEffect(() => {
		validate();
	}, [input]);

	return (
		<>
			<div className={s.data}>
				<form onSubmit={(e) => handleSubmit(e)}>
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
							lastName: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input
							type="text"
							name="lastName"
							value={input.lastName}
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
					<div className={s.section}>
						<button className="buttons">Save changes</button>
					</div>
				</form>
			</div>
		</>
	);
}

export default ProfileEdit;
