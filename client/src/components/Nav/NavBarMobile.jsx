import React, { useState } from "react";
import NavLinks from "./NavLinks.jsx";
import s from "./Nav.module.sass";

export default function NavBarMobile() {
  const [open, setOpen] = useState(false);
  const [home, setHome] = useState(
    /.+(?=\/home$).+/.test(window.location.href)
  );
  return (
    <div>
      {/* <nav className={`${s.navMobile} ${open ? s.openHam : null}`}>
        <NavLinks open={setOpen} home={setHome} />
      </nav>
      <button className={s.hamburguer} onClick={() => setOpen(!open)}>
        ☰
      </button>
      <div
        className={`${s.mobileContSearch} ${
          /.+(?=\/home$).+/.test(window.location.href) ? null : s.searchHome
        }`}
      >
        <SearchBar className={s.searchMobile} />
      </div> */}
    </div>
  );
}
