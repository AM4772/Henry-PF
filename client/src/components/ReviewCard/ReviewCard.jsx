import React from "react";
import s from "./ReviewCard.module.sass";
import { MdOutlineReport, MdDelete, MdStar } from "react-icons/md";
import { Link } from "react-router-dom";
function ReviewCard(props) {
	const review = props;
	/* const img = [uno, dos, tres, cuatro, cinco]; */

	const stars = [
		<div className={s.stars}>
			<MdStar />
			<MdStar className={s.empty} />
			<MdStar className={s.empty} />
			<MdStar className={s.empty} />
			<MdStar className={s.empty} />
		</div>,
		<div className={s.stars}>
			<MdStar />
			<MdStar />
			<MdStar className={s.empty} />
			<MdStar className={s.empty} />
			<MdStar className={s.empty} />
		</div>,
		<div className={s.stars}>
			<MdStar />
			<MdStar />
			<MdStar />
			<MdStar className={s.empty} />
			<MdStar className={s.empty} />
		</div>,
		<div className={s.stars}>
			<MdStar />
			<MdStar />
			<MdStar />
			<MdStar />
			<MdStar className={s.empty} />
		</div>,
		<div className={s.stars}>
			<MdStar />
			<MdStar />
			<MdStar />
			<MdStar />
			<MdStar />
		</div>,
	];
	return (
		<div className={s.container}>
			<Link to={`/book/${review.bookID}`}>
				<div className={s.frontpage}>
					<img src={review.img} alt="bookImg" className={s.fpImage} />
				</div>
			</Link>
			<div className={s.info}>
				<div className={s.top}>
					<Link to={`/book/${review.bookID}`}>
						<h2>{review.bookTitle}</h2>
						<span>#{review.bookID}</span>
					</Link>
					<div className={s.iconTop}>
						{stars[review.rating - 1]}
						<MdDelete title="Delete review" className={s.delete} />
					</div>
				</div>
				<Link to={`/user/${review.userID}`}>
					<h3>
						{review.username} <span>{"#" + review.userID}</span>
					</h3>
				</Link>
				<div className={s.reviewBox}>
					<h4>
						{review.title} <span>{"#" + review.id}</span>
					</h4>
					<span>{review.review}</span>
				</div>
				<div className={s.icon}>
					<MdOutlineReport />
					<span>{review.reports}</span>
				</div>
			</div>
		</div>
	);
}

export default ReviewCard;
