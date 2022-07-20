import React, { useState } from "react";
import { Link } from "react-router-dom";
import s from "./UserMenu.module.sass";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";

function UserMenu(props) {
	const [logged, setLogged] = useState(true);
	const [open, setOpen] = useState(true);

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
										<span>Perfil</span>
										<span></span>
									</li>
								</Link>
								<Link>
									<li>Favoritos</li>
								</Link>
								<Link>
									<li>Historial de Compras</li>
								</Link>
								<li onClick={() => setLogged(!logged)}>
									<span>Desconectar</span>
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
						<span className={s.visitText}>Ingresar</span>
					</Link>
					<Link to="/register">
						<span className={s.visitText}>Registrarse</span>
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
