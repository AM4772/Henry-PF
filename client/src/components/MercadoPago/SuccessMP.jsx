import React from "react";
import s from "./MercadoPago.module.sass";

function SuccessMP() {
  return (
    <div className={s.container}>
      <div className={s.cont}>
        <div className={s.contGreen}>
          <h1>Payment successfully</h1>
          <span className={s.pID}>
            Payment ID: <span>2397216847213w1da</span>
          </span>
          <span>Total items: 2</span>
          <span>
            Total: <span className={s.price}> $20.54</span>
          </span>
        </div>
        <div className={s.successCheckmark}>
          <div className={s.checkIcon}>
            <span className={`${s.iconLine} ${s.lineTip}`}></span>
            <span className={`${s.iconLine} ${s.lineLong}`}></span>
            <div className={s.iconCircle}></div>
            <div className={s.iconFix}></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SuccessMP;
