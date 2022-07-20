import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./UserMenu.module.sass";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

function UserMenu(props) {
	const [logged, setLogged] = useState(false);
	const [open, setOpen] = useState(false);

	return (
		<div className={s.container}>
			{console.log(logged)}
			{logged ? (
				<>
					<div className={s.userLinks}>
						<span className={s.links} onClick={() => setOpen(!open)}>
							<FaUserCircle className={s.icon} />
						</span>
						<Link to="/">
							<span className={s.links}>
								<FaShoppingCart className={s.icon} />
							</span>
						</Link>
					</div>
					{open && (
						<div className={s.profMenu}>
							<ul>
								<Link to="/profile">
									<li>
										<span>Profile</span>
										<span></span>
									</li>
								</Link>
								<Link to="/favourites">
									<li>Favourites</li>
								</Link>
								<Link to="/purchases">
									<li>Purchase's history</li>
								</Link>
								<li onClick={() => setLogged(!logged)}>
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
					<Link to="/login">
						<span className={s.visitText}>Log in</span>
					</Link>
					<Link to="/register">
						<span className={s.visitText}>Register</span>
					</Link>
				</div>
			)}
			<button onClick={() => (setLogged(!logged), setOpen(!open))}>
				Log toggle
			</button>
		</div>
	);
}

export default UserMenu;
