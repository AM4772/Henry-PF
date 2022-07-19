import React, { useState } from "react";
import s from "./Cards.module.sass";
import { TESTING_BOOKS, TESTING_USERS } from "../../testingObjects";
import BookCard from "../BookCard/BookCard";
import UserCard from "../UserCard/UserCard";

function Cards(props) {
	const books = true;

	return (
		<>
			{books ? (
				<div className={s.card_container}>
					{TESTING_BOOKS.map((b) => {
						return (
							<BookCard
								key={b.ID}
								image={b.image}
								title={b.title}
								authors={b.authors}
								price={b.price}
							/>
						);
					})}
				</div>
			) : (
				<div className={s.card_container}>
					{TESTING_USERS.map((u) => {
						return (
							<UserCard
								key={u.ID}
								image={u.image}
								name={u.name}
								username={u.username}
								mail={u.mail}
							/>
						);
					})}
				</div>
			)}
		</>
	);
}

export default Cards;
