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
							Username: <FaQuestionCircle />
							{/* La idea seria que con un hover en el ?*/}
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Name: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Surname: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							E-mail: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="text" />
					</div>
					<div className={s.section}>
						<span>
							Current password: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="password" />
					</div>
					<div className={s.section}>
						<span>
							New password: <FaQuestionCircle />
						</span>
						<hr className={s.divisors} />
						<input type="password" />
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
