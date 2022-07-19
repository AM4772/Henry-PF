import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.sass";

export default function NavLinks(props) {
  //   function homeButton() {
  //     open(false);
  //     home(true);
  //   }
  return (
    <ul>
      <NavLink
        // onClick={() => (open ? homeButton() : null)}
        activeClassName={s.active}
        className={s.navlink}
        exact
        to={"/"}
      >
        <li>LOGO</li>
      </NavLink>
    </ul>
  );
}
