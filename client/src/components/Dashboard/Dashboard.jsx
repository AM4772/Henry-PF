import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import s from "./Dashboard.module.sass";
import UsersBoard from "../DashboardUsers/DashboardUsers";
import { asyncGetUsers } from "../../redux/actions/usersActions";
import Payments from "../Payments/Payments";

function Dashboard() {
	const { users } = useSelector((state) => state.users);
	const usersMini = users.slice(users.length - 5, users.length);
	const dispatch = useDispatch();
	const { currentSection } = useSelector((state) => state.dashboard);

	useEffect(() => {
		dispatch(asyncGetUsers());
	}, [dispatch]);

	return (
		<div className={s.container}>
			<>
				<div className={s.dashboard}>
					<Sidebar className={s.Sidebar} />
					<div>
						{currentSection === 1 ? (
							<UsersBoard />
						) : currentSection === 2 ? (
							<div>Books</div>
						) : currentSection === 3 ? (
							<Payments />
						) : currentSection === 4 ? (
							<div>Analytics</div>
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
															<td>{u.email}</td>
															<td></td>
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
