import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import s from "./UserMenu.module.sass";
import { FaShoppingCart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetItemsCart } from "../../redux/actions/usersActions";
import { logOut } from "../../redux/reducers/profileSlice";
import { changeSection } from "../../redux/reducers/dashboardSlice";

function UserMenu() {
	const location = useLocation();
	const dispatch = useDispatch();
	const history = useHistory();
	const { stack } = useSelector((state) => state.history);

	const { cart, userProfile } = useSelector((state) => state.profile);
	const profileList = useRef();
	const [logged, setLogged] = useState(false);
	const [open, setOpen] = useState(false);
	function closeList(e) {
		if (
			profileList.current &&
			open &&
			!profileList.current.contains(e.target)
		) {
			setOpen(false);
		}
	}
	function dashboard() {
		dispatch(changeSection(0));
		setOpen(false);
	}
	function goBack() {
		var lastPath = [];
		for (let i = 0; i < stack.length; i++) {
			if (
				stack[i] !== "/register" &&
				stack[i] !== "/profile" &&
				stack[i] !== "/favourites" &&
				stack[i] !== "/cart" &&
				stack[i] !== "/dashboard" &&
				stack[i] !== "/dashboard/payments" &&
				stack[i] !== "/dashboard/users"
				// && stack[i] !== stack[0]
			) {
				lastPath.push(stack[i]);
			}
		}
		if (lastPath.length > 0) {
			history.push(lastPath[0]);
		} else {
			history.push("/");
		}
	}
	document.addEventListener("mousedown", closeList);
	useEffect(() => {
		if (!cart.length && userProfile.ID) {
			dispatch(asyncGetItemsCart(parseInt(userProfile.ID)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile]);
	useEffect(() => {
		if (userProfile.email) {
			setLogged(true);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile]);
	function handleLogOut() {
		dispatch(logOut());
		setLogged(false);
		setOpen(!open);
		goBack();
	}
	return (
		<div className={s.container}>
			{logged ? (
				<>
					<div className={s.userLinks}>
						<span className={s.links} onClick={() => setOpen(!open)}>
							<div className={s.imageCont}>
								{userProfile.image ? (
									<img
										src={userProfile.image}
										alt={userProfile.username}
										title={userProfile.username}
									/>
								) : (
									<div className={s.noIMG}>
										{userProfile.name
											? userProfile.name.charAt(0).toUpperCase() +
											  userProfile.surname.charAt(0).toUpperCase()
											: null}
									</div>
								)}
							</div>
						</span>
						<hr className={s.divisor} />
						<Link to="/cart">
							<span className={s.links}>
								<FaShoppingCart className={s.icon} />
								{cart.length ? (
									<p id={s.cartNumber}>
										{cart.length < 10 && cart.length >= 1 ? cart.length : "9+"}
									</p>
								) : undefined}
							</span>
						</Link>
					</div>
					{open && (
						<div ref={profileList} className={s.profMenu}>
							<ul>
								{userProfile.admin ? (
									<>
										<Link onClick={() => dashboard()} to="/dashboard">
											<li>
												<span>Dashboard</span>
											</li>
										</Link>
										<Link onClick={() => setOpen(!open)} to="/createbook">
											<li>
												<span>Create book</span>
											</li>
										</Link>
									</>
								) : null}
								<Link onClick={() => setOpen(!open)} to="/profile">
									<li>
										<span>Profile</span>
									</li>
								</Link>
								<Link onClick={() => setOpen(!open)} to="/favourites">
									<li>Favourites</li>
								</Link>
								<Link onClick={() => setOpen(!open)} to="/purchases">
									<li>Purchase history</li>
								</Link>
								<li onClick={() => handleLogOut()}>
									<span>Log out</span>
									<span>
										<BiLogOut className={s.ico} />
									</span>
								</li>
							</ul>
						</div>
					)}
				</>
			) : (
				<div className={s.visitLinks}>
					<Link
						className={s.visitText}
						to={{ pathname: `/login`, state: location.pathname }}
					>
						Log in
					</Link>
					<hr className={s.divisor} />
					<Link className={s.visitText} to="/register">
						Register
					</Link>
				</div>
			)}
		</div>
	);
}

export default UserMenu;
