import React, { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import s from "./ProfileEdit.module.sass";

function ProfileEdit() {
	const [edit, setEdit] = useState(true);
	return (
		<>
			<div className={s.data}>
				<form>
					<div className={s.section}>
						<span>
							Nombre de usuario: <FaQuestionCircle />
							{/* La idea seria que con un hover en el ?*/}
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Nombre: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Apellido: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Correo electronico: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Contraseña: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Image: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
				</form>
			</div>
		</>
	);
}

export default ProfileEdit;
