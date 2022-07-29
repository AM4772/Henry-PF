import React, { useEffect, useState } from "react";
import s from "./Sidebar.module.sass";
import logo from "../../assets/Book_Logo.png";
import Data from "./SideBarData.js";
import { changeSection } from "../../redux/reducers/paginationSlice.js";
import { useDispatch } from "react-redux";
function Sidebar() {
	const [active, setActive] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(changeSection(active));
	}, [dispatch, active]);
	return (
		<div className={s.sidebar}>
			<div className={s.logo}>
				<img src={logo} alt="LogoImg" />
				<div>
					<span>Book</span>
					<span>Store</span>
				</div>
			</div>
			<div className={s.menu}>
				{Data.map((item, index) => {
					return (
						<div
							className={active === index ? s.active : s.menuItem}
							key={index}
							onClick={() => setActive(index)}
						>
							<item.icon />
							<span>{item.heading}</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}

export default Sidebar;
