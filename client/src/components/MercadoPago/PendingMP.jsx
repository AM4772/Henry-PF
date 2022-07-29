import React from "react";
import s from "./MercadoPago.module.sass";

function PendingMP(props) {
  return (
    <div className={s.container}>
      <div className={s.cont}>
        <div className={s.contYellow}>
          <h1>Payment pending</h1>
          <span className={s.pIDP}>
            Payment ID: <span>2397216847213w1da</span>
          </span>
          <span>You need to make the payment to receive your purchase.</span>
        </div>
      </div>
    </div>
  );
}

export default PendingMP;
