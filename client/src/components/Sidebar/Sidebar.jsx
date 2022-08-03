import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import s from "./Sidebar.module.sass";
import logo from "../../assets/Book_Logo.png";
import Data from "./SideBarData.js";
import { changeSection } from "../../redux/reducers/dashboardSlice.js";
function Sidebar() {
	const dispatch = useDispatch();
	const { currentSection } = useSelector((state) => state.dashboard);
	const [active, setActive] = useState(currentSection);

	function handleClick(e) {
		dispatch(changeSection(e));
		setActive(e);
	}
	useEffect(() => {
		setActive(currentSection);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentSection]);
	return (
		<div className={s.sidebar}>
			<Link to="/" className={s.logo}>
				<img src={logo} alt="LogoImg" />
				<div>
					<span>Book</span>
					<span>Store</span>
				</div>
			</Link>
			<div className={s.menu}>
				{Data.map((item, index) => {
					return (
						<div
							className={active === index ? s.active : s.menuItem}
							key={index}
							onClick={() => handleClick(index)}
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
