import React, { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import NavLinks from "./NavLinks.jsx";
import UserMenu from "../UserMenu/UserMenu";
import s from "./Nav.module.sass";

export default function NavBar() {
  const [input, setInput] = useState("");
  const [, setOpen] = useState(false);
  const [, setHome] = useState(/.+(?=\/home$).+/.test(window.location.href));
  return (
    <nav className={s.nav}>
      <div className={s.divcont}>
        <NavLinks setInput={setInput} open={setOpen} home={setHome} />
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
