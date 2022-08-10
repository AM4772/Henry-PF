import React, { useEffect } from "react";
import s from "./PurchaseDetail.module.sass";
import Loading from "../Loading/Loading";
import { useHistory, useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncUserGetPaymentsByID } from "../../redux/actions/paymentsActions";
import { clearPaymentDetail } from "../../redux/reducers/profileSlice";

function PurchaseDetail() {
  const history = useHistory();
  const { userProfile, appLoadingProfile, paymentDetail } = useSelector(
    (state) => state.profile
  );
  const { stack } = useSelector((state) => state.history);
  const { ID } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(clearPaymentDetail());
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!appLoadingProfile) {
      if (!userProfile.ID) {
        history.push("/");
      } else {
        dispatch(asyncUserGetPaymentsByID(ID));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile, appLoadingProfile]);
  useEffect(() => {
    if (paymentDetail.userID) {
      if (userProfile.ID) {
        if (paymentDetail.userID !== userProfile.ID) {
          history.push("/");
        }
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentDetail, userProfile]);
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
      {paymentDetail.mpID ? (
        <div className={s.container}>
          <div className={s.backButton}>
            <button className={s.buttonBack} onClick={goBack}>
              Back
            </button>
          </div>
          <div className={s.card}>
            <div>
              <h4>
                Purchase ID: <b>{paymentDetail.mpID}</b>
              </h4>
              <div className={s.userList}>
                <p>Purchase Date:</p>
                <p>
                  {new Date(paymentDetail.createdAt).toLocaleDateString(
                    "es-ES"
                  )}
                </p>
              </div>
              <div className={s.line}></div>
            </div>
            <div className={s.purchase}>
              {paymentDetail.items.map((book, i) => {
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
                        <p className={s.price}>${book.price}</p>
                      </div>
                    </div>
                    <div className={s.line}></div>
                  </div>
                );
              })}
            </div>
            <div className={s.final}>
              <p className={s.titulo}>Total: </p>
              <p className={s.total}> ${paymentDetail.total}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PurchaseDetail;
