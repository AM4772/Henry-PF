import React from "react";
import { useState } from "react";
/* import { useSelector } from "react-redux"; */
import Sidebar from "../Sidebar/Sidebar";
import s from "./Dashboard.module.sass";

function Dashboard() {
	/* const { Section } = useSelector((state) => state.dashSection); */

	const [section] = useState("main");
	return (
		<div className={s.container}>
			<>
				<div className={s.dashboard}>
					<Sidebar />
					<div>
						{section === "users" ? (
							<div>HELLO WORLD</div>
						) : (
							<div>CHAO WORLD</div>
						)}
					</div>
				</div>
			</>
		</div>
	);
}

export default Dashboard;
