import React from "react";
import s from "./Loading.module.sass";
import logo from "../../assets/Book_Logo.png";

function Loading(props) {
  return (
    <div className={s.loadingCont}>
      <div className={s.circleLoad}>
        <div className={s.cosito}></div>
        <img className={s.logoAnim} src={logo} alt="Book Store" />
      </div>
    </div>
  );
}
export default Loading;
