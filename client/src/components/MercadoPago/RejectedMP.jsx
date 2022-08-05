import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { asyncGetMP } from "../../redux/actions/checkoutActions";
import { clearPayment } from "../../redux/reducers/checkoutSlice";
import s from "./MercadoPago.module.sass";

function RejectedMP() {
  const dispatch = useDispatch();
  const { mpID, order } = useSelector((state) => state.checkout);
  const { stack } = useSelector((state) => state.history);
  const history = useHistory();
  useEffect(() => {
    if (mpID) {
      dispatch(asyncGetMP(mpID));
    } else {
      history.push("/");
    }
    return () => {
      dispatch(clearPayment());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/favourites" &&
        !stack[i].includes("checkout")
      ) {
        lastPath.push(stack[i]);
      }
    }
    if (lastPath.length > 0) {
      history.push(lastPath[0]);
    } else {
      history.push("/");
    }
  }
  return (
    <div className={s.container}>
      <div className={s.cont}>
        <div className={s.contRed}>
          <h1>Payment rejected</h1>
          <span className={s.pID}>
            Payment ID: <span>{order.ID}</span>
          </span>
          <span>
            {order.status}: {order.status_detail}
          </span>
          <div className={s.keep} onClick={goBack}>
            Keep buying
          </div>
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
