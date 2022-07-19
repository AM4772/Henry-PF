import React from "react";
import { Link } from "react-router-dom";
import s from "./UserMenu.module.sass";

function UserMenu(props) {
	/*   const {isLogged} = AlgunEstado */
	const isLogged = true;

	return (
		<div>
			{isLogged ? (
				<div className={s.userLinks}>
					<Link to="/user/:ID">
						<span className={s.links}>Harry{/*User icon*/}</span>
					</Link>
					<Link to="/">
						<span className={s.links}>{/*Cart icon*/}Carrito</span>
					</Link>
				</div>
			) : (
				<div className={s.visitLinks}>
					<Link to="/login">
						<span className={s.visitText}>Ingresar</span>
					</Link>
					<Link to="/">
						<span className={s.visitText}>Registrarse</span>
					</Link>
				</div>
			)}
		</div>
	);
}

export default UserMenu;
