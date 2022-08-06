import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SearchBarReviews from "./SearchBarReviews";
import ReviewCard from "../ReviewCard/ReviewCard";
import s from "./DashboardReviews.module.sass";
import { asyncGetReviews } from "../../redux/actions/reviewActions";

function DashboardReviews() {
	const dispatch = useDispatch();
	const { reviews } = useSelector((state) => state.reviews);
	console.log(reviews, "Soy reviews");
	useEffect(() => {
		dispatch(asyncGetReviews());
	}, [dispatch]);

	return (
		<div className={s.container}>
			<div className={s.top}>
				<h1>Reviews</h1>
				<span>
					<SearchBarReviews />
				</span>
			</div>
			<div className={s.cardsContainer}>
				{reviews[0] &&
					reviews?.map((e) => {
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
