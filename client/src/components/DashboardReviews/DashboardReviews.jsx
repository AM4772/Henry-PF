import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import SearchBarReviews from "./SearchBarReviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import s from "./DashboardReviews.module.sass";
import { TESTING_REVIEWS } from "../../testingObjects";

function DashboardReviews() {
	const reviews = TESTING_REVIEWS;

	const { allReviews } = useSelector((state) => state.reviews);
	console.log("soy reviews", allReviews);

	useEffect(() => {}, [allReviews]);
	return (
		<div className={s.container}>
			<div className={s.top}>
				<h1>Reviews</h1>
				<span>
					<SearchBarReviews />
				</span>
			</div>
			<div className={s.cardsContainer}>
				{reviews?.map((e) => {
					return (
						<ReviewCard
							key={e.reviewID}
							id={e.reviewID}
							title={e.reviewTitle}
							review={e.review}
							rating={e.rating}
							username={e.username}
							userID={e.userID}
							bookTitle={e.bookTitle}
							bookID={e.bookID}
							img={e.bookImg}
							reports={e.reports}
						/>
					);
				})}
			</div>
		</div>
	);
}

export default DashboardReviews;
