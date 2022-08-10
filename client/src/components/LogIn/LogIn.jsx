import React, { useState, useEffect } from "react";
import Auth0 from "../Auth/Auth0.jsx";
import { Link, NavLink } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { asyncLogin } from "../../redux/actions/usersActions";
import s from "./LogIn.module.sass";

function LogIn({ prev }) {
	const dispatch = useDispatch();
	const history = useHistory();
	const { stack } = useSelector((state) => state.history);
	const { userProfile } = useSelector((state) => state.profile);
	const isValidInitialState = {
		emailOrUsername: "",
		password: "",
	};
	const countInitialState = {
		emailOrUsername: 0,
		password: 0,
	};
	const [count, setCount] = useState(countInitialState);
	const [isValid, setIsvalid] = useState(isValidInitialState);
	const [remember, setRemember] = useState(false);
	const [refresh, setRefresh] = useState(0);
	const [isAllowed, setIsAllowed] = useState(false);
	const [passwordShown, setPasswordShown] = useState(false);
	const [emailOrUsername, setEmailOrUsername] = useState("");
	const [password, setPassword] = useState("");
	// eslint-disable-next-line no-unused-vars
	const [isPending, setIsPending] = useState(false);
	useEffect(() => {
		if (userProfile.email) {
			var lastPath = [];
			for (let i = 0; i < stack.length; i++) {
				if (
					stack[i] !== "/register" &&
					stack[i] !== "/login" &&
					!stack[i].includes("confirm") &&
					!stack[i].includes("forgot")
				) {
					lastPath.push(stack[i]);
				}
			}
			if (lastPath.length > 0) {
				history.push(lastPath[0]);
			} else {
				history.push("/");
			}
		} else {
			setRefresh(refresh + 1);
			// Assign possible errors
			const isValidCopy = { ...isValid };
			// Username
			if (refresh === 0) {
			} // Skip
			else {
				if (!emailOrUsername.length) isValidCopy.emailOrUsername = " ";
				else if (emailOrUsername.length < 3 || emailOrUsername.length > 50)
					isValidCopy.emailOrUsername = "Email or username is invalid";
				else delete isValidCopy.emailOrUsername;
				// Password validation
				if (!password.length) isValidCopy.password = " ";
				else if (password.length < 8 || password.length > 30)
					isValidCopy.password =
						"Password must contain between 8-30 characters";
				else delete isValidCopy.password;
			}
			setIsvalid(isValidCopy);
			// Check if its valid
			let counter = 0;
			for (let err in isValidCopy) {
				if (isValidCopy[err]) counter++;
			}
			if (!counter) setIsAllowed(true);
			else if (counter) setIsAllowed(false);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [emailOrUsername, password, userProfile]);
	const handleSubmit = async (e) => {
		e.preventDefault();
		const values = { username: emailOrUsername, password };
		setIsPending(true);
		dispatch(asyncLogin(values, remember)).then(() => {
			setIsPending(false);
		});
	};
	const handleButton = () => {
		if (!isPending && isAllowed && refresh !== 1)
			return (
				<button className={`buttons ${s.login}`} id={s.active}>
					Log In
				</button>
			);
		else if (isPending)
			return (
				<p className="buttons" id={s.waiting}>
					Logging In...
				</p>
			);
		else
			return (
				<p className="buttons" id={s.waiting}>
					Log In
				</p>
			);
	};
	return (
		<div id={s.toCenter}>
			<div id={s.card}>
				<form onSubmit={handleSubmit}>
					<h1 id={s.register}>Login</h1>
					<div id={s.creationCardDisplay}>
						<div className={s.inline}>
							<label className={s.fillTitle}>Email/Username: </label>
							<input
								type="text"
								className={`${s.input} ${
									isValid.emailOrUsername &&
									isValid.emailOrUsername.length &&
									count.emailOrUsername
										? s.danger
										: s.nejDanger
								}`}
								value={emailOrUsername}
								onChange={(e) =>
									setCount({ ...count, emailOrUsername: 1 }) ||
									setEmailOrUsername(e.target.value)
								}
								placeholder="Email/Username"
							></input>{" "}
							<p
								className={
									isValid.emailOrUsername && isValid.emailOrUsername !== " "
										? s.errorMessage
										: s.noErrorMessage
								}
							>
								{isValid.emailOrUsername}
							</p>
						</div>
						<div className={s.inline}>
							<label className={s.fillTitle}>Password: </label>
							<input
								type={passwordShown ? "text" : "password"}
								className={`${s.input} ${
									isValid.password && isValid.password.length && count.password
										? s.danger
										: s.nejDanger
								}`}
								value={password}
								placeholder="Password"
								onChange={(e) =>
									setCount({ ...count, password: 1 }) ||
									setPassword(e.target.value)
								}
							></input>{" "}
							<FaEye
								className={s.fatEye}
								onClick={() => setPasswordShown(!passwordShown)}
							/>
							<p
								className={
									isValid.password && isValid.password !== " "
										? s.errorMessage
										: s.noErrorMessage
								}
							>
								{isValid.password}
							</p>
						</div>
					</div>
					<div className="centerMeColumn">
						<div id={s.rememberMe}>
							<div onClick={() => setRemember((caca) => !caca)}>
								<input
									type="checkbox"
									checked={remember}
									readOnly={true}
									className={s.checkbox}
								/>
								<label>Remember me</label>
							</div>
							<NavLink to="/register" className={s.caca}>
								Not registered yet?
							</NavLink>
						</div>
						<div className={s.bottomButton}>{handleButton()}</div>
						<div className={s.bottomButton}>
							<Auth0 />
						</div>
						<Link to="/forgot" id={s.forgor}>
							Forgot password?
						</Link>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LogIn;
