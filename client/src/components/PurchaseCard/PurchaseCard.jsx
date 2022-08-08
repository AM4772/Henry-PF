import React from "react";
import { NavLink } from "react-router-dom";
import Loading from "../Loading/Loading";
import { FaBookMedical } from "react-icons/fa";
import s from "./PurchaseCard.module.sass";

function PurchaseCard(props) {
  let payment = props;

  return (
    <div className={s.cards}>
      {payment.ID ? (
        <div className={s.container0}>
          <div className={s.container1}>
            <NavLink className={s.navLink} to={`/purchases/${payment.ID}`}>
              <div className={s.containerImage}>
                <div className={s.contImg}>
                  {payment.items.length >= 5 ? (
                    <div className={s.imagePlus}>
                      <span>{payment.items.length - 4}</span>
                      <FaBookMedical />
                    </div>
                  ) : null}
                  {payment.items.map((i, index) => {
                    if (index < 4) {
                      return (
                        <img
                          key={i.ID}
                          className={s.image}
                          title={i.title}
                          alt={i.ID}
                          src={`${i.image}`}
                        />
                      );
                    }
                    return null;
                  })}
                </div>
              </div>
            </NavLink>
            <p className={s.totalItems}>
              Total items: <span>{payment.items.length}</span>
            </p>
            <div className={s.containerBlock2}>
              <div className={s.containerBlock3}>
                <div className={s.containerDate1}>
                  <div className={s.containerDate2}>
                    <p>Bought on</p>
                    <p>{new Date(payment.date).toLocaleDateString("es-ES")}</p>
                  </div>
                </div>
                <div className={s.price}>
                  <p>Total: ${payment.total}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PurchaseCard;
