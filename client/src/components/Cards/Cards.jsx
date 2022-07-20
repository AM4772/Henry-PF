import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Cards.module.sass";
import { TESTING_USERS } from "../../testingObjects";
import BookCard from "../BookCard/BookCard";
import UserCard from "../UserCard/UserCard";
import { asyncGetBooks } from "../../redux/actions/booksActions";
import { asyncGetUsers } from "../../redux/actions/usersActions";

function Cards(props) {
	const { books, filterCard } = useSelector((state) => state.books);
	const { users } = useSelector((state) => state.users);

	const { currentPage, cardsPerPage } = useSelector(
		(state) => state.pagination
	);
	const dispatch = useDispatch();

	const indexOfLastCards = currentPage * cardsPerPage;
	const indexOfFirstCards = indexOfLastCards - cardsPerPage;
	const currentBooks = books.slice(indexOfFirstCards, indexOfLastCards);

	useEffect(() => {
		if (filterCard === "books") {
			if (books.length <= 0) {
				dispatch(asyncGetBooks());
			}
		} else {
			if (users.length <= 0) {
				dispatch(asyncGetUsers());
			}
		}
	}, [books, currentPage, users]);

	return (
		<>
			{currentBooks ? (
				<div className={s.card_container}>
					{currentBooks.map((b) => {
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
					{users.map((u) => {
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
