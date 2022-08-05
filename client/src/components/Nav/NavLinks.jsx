import React from "react";
import { NavLink } from "react-router-dom";
import s from "./Nav.module.sass";
import logo from "../../assets/Book_Logo.png";

export default function NavLinks({ setInput, open, setOpen }) {
  function handleClick() {
    if (open) {
      setOpen(false);
    }
    setInput("");
  }
  return (
    <ul className={s.logoCont}>
      <NavLink
        onClick={() => handleClick()}
        className={s.navlink}
        exact
        to={"/"}
      >
        <img id={s.logo} src={logo} alt="BookStore" />
      </NavLink>
      <NavLink
        onClick={() => handleClick()}
        className={s.navlink}
        exact
        to={"/"}
      >
        <div className={s.bs}>
          <span>Book</span>
          <span>Store</span>
        </div>
      </NavLink>
    </ul>
  );
}
