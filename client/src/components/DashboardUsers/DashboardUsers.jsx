import React from "react";
import { useSelector } from "react-redux";
import s from "./DashboardUsers.module.sass";
import {
	FaUserCheck,
	FaUserEdit,
	FaUserClock,
	FaUserTimes,
} from "react-icons/fa";

import { TESTING_USERS } from "../../testingObjects";

function DashboardUsers() {
	const { users } = useSelector((state) => state.users);

	return (
		<div className={s.userBoard}>
			<div className={s.top}>
				<h1>Usuarios</h1>
				<span>Searchbar</span>
			</div>
			<div className={s.tableContainer}>
				<table>
					<thead>
						<tr className={s.sticky}>
							<th>ID</th>
							<th>Username</th>
							<th>Name</th>
							<th>Lastname</th>
							<th>Email</th>
							<th>Status</th>
						</tr>
					</thead>
					<tbody>
						{TESTING_USERS.map((u) => {
							return (
								<tr key={u.ID}>
									<td>{u.ID}</td>
									<td>{u.username}</td>
									<td>{u.name}</td>
									<td>{u.surname}</td>
									<td>{u.mail}</td>
									<td>
										<FaUserCheck />
										<FaUserEdit />
										<FaUserClock />
										<FaUserTimes />
									</td>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default DashboardUsers;
