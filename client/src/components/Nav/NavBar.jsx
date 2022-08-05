import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import NavLinks from "./NavLinks.jsx";
import UserMenu from "../UserMenu/UserMenu";
import s from "./Nav.module.sass";

export default function NavBar() {
  const [input, setInput] = useState("");
  return (
    <nav className={s.nav}>
      <div className={s.divcont}>
        <NavLinks setInput={setInput} open={false} />
        {/* <div
        className={`${s.contSearch} ${
          /.+(?=\/home$).+/.test(window.location.href) ? null : s.searchHome
        }`}
      >
    </div> */}
        <SearchBar input={input} setInput={setInput} />
        <UserMenu />
      </div>
    </nav>
  );
}
