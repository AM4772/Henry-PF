import React from "react";
import members from "./Data.js";
import UserCard from "../UserCard/UserCard";
import s from "./Members.module.sass";

function Members() {
	return (
		<>
			<div className={s.card_container}>
				{members.map((e) => {
					return (
						<UserCard
							key={e.name}
							name={e.name}
							rol={e.rol}
							image={e.image}
							mail={e.mail}
							linkedin={e.linkedin}
							github={e.github}
						/>
					);
				})}
			</div>
		</>
	);
}

export default Members;
