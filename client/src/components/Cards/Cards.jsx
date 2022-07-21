import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import s from "./Cards.module.sass";
import BookCard from "../BookCard/BookCard";
import UserCard from "../UserCard/UserCard";
import Loading from "../Loading/Loading";

function Cards() {
	const { books, filterCard } = useSelector((state) => state.books);
	const { users } = useSelector((state) => state.users);

	const { currentPage, cardsPerPage } = useSelector(
		(state) => state.pagination
	);
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(true);

	const indexOfLastCards = currentPage * cardsPerPage;
	const indexOfFirstCards = indexOfLastCards - cardsPerPage;
	const currentBooks = books.slice(indexOfFirstCards, indexOfLastCards);
	const currentUsers = users.slice(indexOfFirstCards, indexOfLastCards);

	if (filterCard === "books") {
		setTimeout(() => {
			if (!currentBooks[0]) {
				setLoading(false);
			}
		}, 5000);
	}
	if (filterCard === "users") {
		setTimeout(() => {
			if (!currentUsers[0]) {
				setLoading(false);
			}
		}, 5000);
	}
	useEffect(() => {}, [books, currentPage, users, filterCard, loading]);

	return (
		<>
			{filterCard === "books" ? (
				<div className={s.card_container}>
					{currentBooks[0] ? (
						currentBooks.map((b) => {
							return (
								<BookCard
									key={b.ID}
									ID={b.ID}
									image={b.image}
									title={b.title}
									authors={b.authors}
									price={b.price}
								/>
							);
						})
					) : loading ? (
						<Loading />
					) : (
						<div className={s.notFound}>
							<h1>Books not found</h1>
						</div>
					)}
				</div>
			) : (
				<div className={s.card_container}>
					{currentUsers[0] ? (
						currentUsers.map((u) => {
							return (
								<UserCard
									key={u.ID}
									image={u.image}
									name={u.name}
									username={u.username}
									mail={u.mail}
								/>
							);
						})
					) : loading ? (
						<Loading />
					) : (
						<div className={s.notFound}>
							<h1>Users not found</h1>
						</div>
					)}
				</div>
			)}
		</>
	);
}

export default Cards;
