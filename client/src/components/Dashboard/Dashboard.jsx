import React from "react";
import { useState } from "react";
/* import { useSelector } from "react-redux"; */
import Sidebar from "../Sidebar/Sidebar";
import s from "./Dashboard.module.sass";
import UsersBoard from "../DashboardUsers/DashboardUsers";
import { TESTING_USERS } from "../../testingObjects";
import {
	FaUserCheck,
	FaUserEdit,
	FaUserClock,
	FaUserTimes,
} from "react-icons/fa";

function Dashboard() {
	/* const { Section } = useSelector((state) => state.dashSection); */
	const usersMini = TESTING_USERS.slice(
		TESTING_USERS.length - 5,
		TESTING_USERS.length
	);
	console.log(usersMini);
	console.log(TESTING_USERS.length - 5);

	const [section] = useState("users");
	return (
		<div className={s.container}>
			<>
				<div className={s.dashboard}>
					<Sidebar className={s.Sidebar} />
					<div>
						{section === "users" ? (
							<UsersBoard />
						) : (
							<div className={s.mainContainer}>
								<div className={s.topSection}>Top side</div>
								<div className={s.botSection}>
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
												{usersMini.map((u) => {
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
							</div>
						)}
					</div>
				</div>
			</>
		</div>
	);
}

export default Dashboard;
