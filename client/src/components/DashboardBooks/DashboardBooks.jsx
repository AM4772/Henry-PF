import React from "react";
import { Link } from "react-router-dom";

function DashboardBooks() {
	return (
		<>
			<div>Books</div>
			<Link to="/dashboard/createbook">Add new book</Link>
		</>
	);
}

export default DashboardBooks;
