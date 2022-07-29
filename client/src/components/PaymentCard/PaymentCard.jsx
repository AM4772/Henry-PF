import React from "react";
// import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";
import s from "./PaymentCard.module.sass";

function PaymentCard(props) {
  let payment = props;
  // const dispatch = useDispatch();
  // const { userProfile } = useSelector((state) => state.profile);

  return (
    <div>
      {payment.username ? (
        <NavLink className={s.navLink} to={`/payment/${payment.ID}`}>
          <td>{payment.ID}</td>
          <td>{payment.totalItems}</td>
          <td>{payment.userID}</td>
          <td>{payment.username}</td>
          <td>{new Date(payment.buyDate).toLocaleDateString("es-ES")}</td>
          <td>
            $
            {new Intl.NumberFormat("es-ES", {
              maximumFractionDigits: 2,
              minimumFractionDigits: 2,
            }).format(payment.price)}
          </td>
        </NavLink>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PaymentCard;
