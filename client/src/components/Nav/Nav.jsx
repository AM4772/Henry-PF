import React from "react";
import NavBar from "./NavBar";
import NavBarMobile from "./NavBarMobile";

export default function Nav() {
  return (
    <div>
      <NavBarMobile />
      <NavBar />
    </div>
  );
}
