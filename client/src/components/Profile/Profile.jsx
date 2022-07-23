import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./Profile.module.sass";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaUserCircle, FaWallet, FaUserEdit } from "react-icons/fa";
import ProfileEdit from "../ProfileEdit/ProfileEdit";

function Profile(props) {
	const [edit, setEdit] = useState(true);
	const { userProfile } = useSelector((state) => state.profile);
	const history = useHistory();
	useEffect(() => {
		if (!userProfile.name) history.push("/login");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userProfile]);
	return (
		<div className={s.body}>
			<div className={s.container}>
				<div className={s.sections}>
					<span>
						{" "}
						<FaUserCircle /> Usuario
					</span>
					<hr className={s.vDivisor} />
					<span>
						{" "}
						<FaWallet /> Compras
					</span>
					<hr className={s.vDivisor} />
					<span>
						{" "}
						<MdOutlinePrivacyTip /> Privacidad
					</span>
					<hr className={s.vDivisor} />
					<span>
						<FaUserEdit onClick={() => setEdit(!edit)} />
					</span>
				</div>
				{edit ? (
					<div className={s.data}>
						<div className={s.sectionImg}>
							<div
								className={s.testIMG}
								/* style={{
									background: "#" + Math.floor(Math.random() * 999),
								}} */
							>
								<h1 className={s.noImg}>
									{userProfile.name && userProfile.lastName
										? userProfile.name.charAt(0).toUpperCase() +
										  userProfile.lastName.charAt(0).toUpperCase()
										: null}
								</h1>
							</div>
						</div>
						<div className={s.section}>
							<span>Username</span>
							<hr className={s.divisors} />
							<span>Harry popote</span>
						</div>
						<div className={s.section}>
							<span>Name</span>
							<hr className={s.divisors} />
							<span>
								{userProfile.name} {userProfile.lastName}
							</span>
						</div>
						<div className={s.section}>
							<span>e-mail</span>
							<hr className={s.divisors} />
							<span>{userProfile.email}</span>
						</div>
					</div>
				) : (
					<ProfileEdit />
				)}
			</div>
		</div>
	);
}

export default Profile;
