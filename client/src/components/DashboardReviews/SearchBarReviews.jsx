import React from "react";
import s from "./DashboardReviews.module.sass";

function SearchBarReviews({ value, onChange }) {
	return (
		<div className={s.searchDiv}>
			<input
				className={s.searchInput}
				type="text"
				value={value}
				placeholder="Search review..."
				onChange={(e) => onChange(e)}
			/>
		</div>
	);
}

export default SearchBarReviews;
