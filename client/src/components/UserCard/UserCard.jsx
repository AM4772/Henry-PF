import React from "react";
import s from "./UserCard.module.sass";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { Link } from "react-router-dom";

function UserCard(props) {
	const members = props;
	const img =
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSCgy67nElhPhHHsrvT_IKgnUrgg-m81ABz8OCTSGNRxo-8DJC95Yj5vZCKZjVwzZr6U&usqp=CAU";
	return (
		<div className={s.card__container}>
			<div className={s.esta}>
				<img src={img} alt="Profile Pic" />
			</div>
			<div className={s.user}>
				<div className={s.info}>
					<h2>{members.name}</h2>
					<h3>{members.rol}</h3>
					<h3>{members.mail}</h3>
				</div>
				<div className={s.media}>
					<Link to={{ pathname: members.linkedin }} target="_blank">
						<FaLinkedin />
					</Link>
					<Link to={{ pathname: members.github }} target="_blank">
						<FaGithub />
					</Link>
				</div>
			</div>
		</div>
	);
}

export default UserCard;
