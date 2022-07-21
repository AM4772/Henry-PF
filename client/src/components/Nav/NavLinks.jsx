import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.sass";
import logo from "../../assets/Book_Logo.png";

export default function NavLinks({ setInput, open, home }) {
  function homeButton() {
    open(false);
    home(true);
  }
  function handleClick() {
    if (open) {
      homeButton();
    }
    setInput("");
  }
  return (
    <ul>
      <NavLink
        onClick={() => handleClick()}
        activeClassName={s.active}
        className={s.navlink}
        exact
        to={"/"}
      >
        <img id={s.logo} src={logo} alt="BookStore" />
      </NavLink>
    </ul>
  );
}
