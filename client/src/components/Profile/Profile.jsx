import React, { useState } from "react";
import s from "./Profile.module.sass";
import { MdOutlinePrivacyTip, MdSettings } from "react-icons/md";
import { FaUserCircle, FaWallet } from "react-icons/fa";
import ProfileEdit from "../ProfileEdit/ProfileEdit";

function Profile(props) {
	const [edit, setEdit] = useState(false);
	return (
		<>
			<div className={s.container}>
				<div className={s.sections}>
					<span>
						{" "}
						<FaUserCircle />
						Usuario{" "}
					</span>
					<span>
						{" "}
						<FaWallet />
						Compras{" "}
					</span>
					<span>
						{" "}
						<MdOutlinePrivacyTip />
						Privacidad{" "}
					</span>
					<span>
						<MdSettings onClick={() => setEdit(!edit)} />
					</span>
				</div>
				{edit ? (
					<div className={s.data}>
						<div className={s.section}>
							<span>Nombre de usuario:</span>
							<hr className={s.divisors} />
							<span>Harry popote</span>
						</div>
						<div className={s.section}>
							<span>Nombre:</span>
							<hr className={s.divisors} />
							<span>Harry</span>
						</div>
						<div className={s.section}>
							<span>Apellido:</span>
							<hr className={s.divisors} />
							<span>Potter</span>
						</div>
						<div className={s.section}>
							<span>Correo electronico:</span>
							<hr className={s.divisors} />
							<span>HarryStone@gmail.com</span>
						</div>
						<div className={s.section}>
							<span>Contraseña:</span>
							<hr className={s.divisors} />
							<span>***********</span>
						</div>
						<div className={s.section}>
							<span>Image:</span>
							<hr className={s.divisors} />
							<span>box de seleccion</span>
						</div>
					</div>
				) : (
					<ProfileEdit />
				)}
			</div>
		</>
	);
}

export default Profile;
