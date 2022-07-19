import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./UserMenu.module.sass";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";

function UserMenu(props) {
	/*   const {isLogged} = AlgunEstado */
	const isLogged = true;

	const [open, setOpen] = useState(false);

	return (
		<div>
			{isLogged ? (
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
						<div>
							<ul>
								<li>Perfil</li>
								<li>Favoritos</li>
								<li>Historial de Compras</li>
							</ul>
						</div>
					)}
				</>
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
