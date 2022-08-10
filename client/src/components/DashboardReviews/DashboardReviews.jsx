import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetReviews } from "../../redux/actions/reviewActions";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";
import SearchBarReviews from "./SearchBarReviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import s from "./DashboardReviews.module.sass";

function DashboardReviews() {
	const dispatch = useDispatch();
	const { reviews } = useSelector((state) => state.reviews);
	const [filterReview, setFilterReview] = useState(reviews);
	const [search, setSearch] = useState("");
	const [sorting, setSortName] = useState({
		ID: false,
		username: false,
		bookTitle: false,
	});
	useEffect(() => {
		dispatch(asyncGetReviews());
	}, [dispatch]);

	useEffect(() => {}, [dispatch, search, reviews]);

	function handleChange(e) {
		e.preventDefault();
		setSearch(e.target.value);
	}

	function filterReviews() {
		let reviewFilter = reviews.filter(
			(r) =>
				r.user.username
					.replace(/^\s+|\s+$/g, "")
					.replace(/\./g, "")
					.replace(/\s+/g, "")
					.toLowerCase()
					.includes(
						search
							.replace(/^\s+|\s+$/g, "")
							.replace(/\./g, "")
							.replace(/\s+/g, "")
							.toLowerCase()
					) ||
				r.book.title
					.replace(/^\s+|\s+$/g, "")
					.replace(/\./g, "")
					.replace(/\s+/g, "")
					.toLowerCase()
					.includes(
						search
							.replace(/^\s+|\s+$/g, "")
							.replace(/\./g, "")
							.replace(/\s+/g, "")
							.toLowerCase()
					) ||
				r.ID.toString().includes(
					search
						.replace(/^\s+|\s+$/g, "")
						.replace(/\./g, "")
						.replace(/\s+/g, "")
						.toLowerCase()
				)
		);
		setFilterReview(reviewFilter.sort((a, b) => a.ID - b.ID));
	}
	useEffect(() => {
		if (reviews.length > 0) filterReviews();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [search, reviews]);
	function sort(from) {
		if (from === "username") {
			if (sorting[from]) {
				setFilterReview([
					...filterReview.sort((a, b) => {
						if (a.user.username < b.user.username) {
							return -1;
						}
						if (a.user.username > b.user.username) {
							return 1;
						}
						return 0;
					}),
				]);
			} else {
				setFilterReview([
					...filterReview.sort((a, b) => {
						if (a.user.username > b.user.username) {
							return -1;
						}
						if (a.user.username < b.user.username) {
							return 1;
						}
						return 0;
					}),
				]);
			}
		} else if (from === "bookTitle") {
			if (sorting[from]) {
				setFilterReview([
					...filterReview.sort((a, b) => {
						if (a.book.title < b.book.title) {
							return -1;
						}
						if (a.book.title > b.book.title) {
							return 1;
						}
						return 0;
					}),
				]);
			} else {
				setFilterReview([
					...filterReview.sort((a, b) => {
						if (a.book.title > b.book.title) {
							return -1;
						}
						if (a.book.title < b.book.title) {
							return 1;
						}
						return 0;
					}),
				]);
			}
		} else {
			if (sorting[from]) {
				setFilterReview([
					...filterReview.sort((a, b) => {
						if (a[from] < b[from]) {
							return -1;
						}
						if (a[from] > b[from]) {
							return 1;
						}
						return 0;
					}),
				]);
			} else {
				setFilterReview([
					...filterReview.sort((a, b) => {
						if (a[from] > b[from]) {
							return -1;
						}
						if (a[from] < b[from]) {
							return 1;
						}
						return 0;
					}),
				]);
			}
		}
		setSortName({ ...sorting, [from]: !sorting[from] });
	}
	useEffect(() => {}, [filterReview]);
	function reload() {
		dispatch(asyncGetReviews());
	}
	return (
		<div className={s.container}>
			<div className={s.top}>
				<h1>Reviews</h1>
				<div className={s.sort} onClick={() => sort("ID")}>
					ID{sorting.ID ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
				</div>
				<div className={s.sort} onClick={() => sort("username")}>
					Username
					{sorting.username ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
				</div>
				<div className={s.sort} onClick={() => sort("bookTitle")}>
					Book Title
					{sorting.bookTitle ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
				</div>
				<span className={s.searchbar}>
					<AiOutlineReload onClick={() => reload()} />
					<SearchBarReviews onChange={(e) => handleChange(e)} />
				</span>
			</div>
			<div className={s.cardsContainer}>
				{filterReview[0] &&
					filterReview?.map((e) => {
						return (
							<ReviewCard
								key={e.ID}
								id={e.ID}
								title={e.title}
								review={e.review}
								rating={e.rating}
								reports={e.reports}
								username={e.user.username}
								userID={e.user.ID}
								bookTitle={e.book.title}
								bookID={e.book.ID}
								img={e.book.image}
							/>
						);
					})}
			</div>
		</div>
	);
}

export default DashboardReviews;
