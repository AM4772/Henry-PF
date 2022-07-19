import React from "react";
import s from "./UserCard.module.sass";

function UserCard(props) {
	const img =
		"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYSCgy67nElhPhHHsrvT_IKgnUrgg-m81ABz8OCTSGNRxo-8DJC95Yj5vZCKZjVwzZr6U&usqp=CAU";
	return (
		<div className={s.card__container}>
			<div>
				<img src={img} alt="Profile Pic" />
			</div>
			<div className={s.user__date}>
				<h1>Username</h1>
				<h3>Nombre y Apellido</h3>
				<h4>Correo electronico</h4>
			</div>
		</div>
	);
}

export default UserCard;
