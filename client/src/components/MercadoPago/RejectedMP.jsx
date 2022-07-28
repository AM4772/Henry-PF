import React from "react";
import s from "./MercadoPago.module.sass";

function RejectedMP() {
  return (
    <div className={s.container}>
      <div className={s.cont}>
        <div className={s.contRed}>
          <h1>Payment rejected</h1>
          <span className={s.pID}>
            Payment ID: <span>2397216847213w1da</span>
          </span>
          <span>Rejected: ¿Why?</span>
        </div>
        <div className={s.failure}>
          <div className={s.circleborder}></div>
          <div className={s.circle}>
            <div className={s.error}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RejectedMP;
