import React, { useEffect } from "react";
// import { useState } from "react";
import s from "./PaymentDetail.module.sass";
import Loading from "../Loading/Loading";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetPaymentsByID } from "../../redux/actions/paymentsActions";

function PaymentDetail() {
  const history = useHistory();
  const { userProfile, appLoadingProfile } = useSelector(
    (state) => state.profile
  );
  const { payment } = useSelector((state) => state.payments);
  const { stack } = useSelector((state) => state.history);
  const { ID } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!appLoadingProfile) {
      if (!userProfile.admin) {
        history.push("/");
      } else {
        dispatch(asyncGetPaymentsByID(ID));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, appLoadingProfile]);
  useEffect(() => {}, [payment]);
  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/favourites" &&
        stack[i] !== "/createbook" &&
        stack[i] !== stack[0]
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
    <div className={s.paymentDetail}>
      {payment.mpID ? (
        <div className={s.container}>
          <div className={s.backButton}>
            <button className={s.buttonBack} onClick={goBack}>
              Back
            </button>
          </div>
          <div className={s.card}>
            <div>
              <h4>
                Purchase ID: <b>{payment.mpID}</b>
              </h4>
              <div className={s.userList}>
                <p>Buyer username:</p>
                <p>
                  <Link to={`/user/${payment.user.ID}`}>
                    {payment.user.username}
                  </Link>
                </p>
              </div>
              <div className={s.userList}>
                <p>Buyer ID:</p>
                <p>
                  <Link to={`/user/${payment.user.ID}`}>{payment.user.ID}</Link>
                </p>
              </div>
              <div className={s.userList}>
                <p>Purchase Date:</p>
                <p>{new Date(payment.createdAt).toLocaleDateString("es-ES")}</p>
              </div>
              <div className={s.line}></div>
            </div>
            <div className={s.purchase}>
              {payment.items.map((book, i) => {
                return (
                  <div key={i} className={s.info}>
                    <div className={s.contain}>
                      <div>
                        <Link to={`/book/${book.ID}`}>
                          <img
                            src={book.image}
                            alt={book.title}
                            title={book.title}
                            className={s.image}
                          />
                        </Link>
                      </div>
                      <div className={s.bookInfo}>
                        <Link to={`/book/${book.ID}`}>
                          <p className={s.bookTitle}>
                            Book:
                            <b> {book.title}</b>
                          </p>
                          <p>ID: {book.ID}</p>
                        </Link>
                        <p className={s.price}>
                          ${parseFloat(book.price).toFixed(2)}
                        </p>
                      </div>
                    </div>
                    <div className={s.line}></div>
                  </div>
                );
              })}
            </div>
            <div className={s.final}>
              <p className={s.titulo}>Total: </p>
              <p className={s.total}>${parseFloat(payment.total).toFixed(2)}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PaymentDetail;
