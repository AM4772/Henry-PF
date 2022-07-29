import React from "react";
import { useState } from "react";
import s from "./PaymentDetail.module.sass";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
import { TESTING_PAYMENTS } from "../../TESTING_PAYMENTS";

function PaymentDetail() {
  const test = TESTING_PAYMENTS[0];
  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  return (
    <div className={s.paymentDetail}>
      {test.ID ? (
        <div className={s.container}>
          <div className={s.backButton}>
            <button className={s.buttonBack} onClick={goBack}>
              Back
            </button>
          </div>
          <div className={s.card}>
            <div>
              <h1>Purchase ID: {test.ID}</h1>
              <div className={s.userList}>
                <p>Buyer username:</p>
                <p>{test.userInfo.username}</p>
              </div>
              <div className={s.userList}>
                <p>Buyer ID:</p>
                <p>{test.userInfo.userID}</p>
              </div>
            </div>
            {test.purchasedBooks.map((book) => {
              return (
                <div className={s.contain}>
                  <div>
                    <img src={book.image} alt="" className={s.image} />
                  </div>
                  <div className={s.bookInfo}>
                    <p>Book: {book.title}</p>
                    <p>ID: {book.ID}</p>
                    <p>${book.price}</p>
                    <div className={s.list}>
                      <p>Authors:</p>
                      {book.authors.map((au) => {
                        return <div className={s.item}>{au}</div>;
                      })}
                    </div>
                    <div className={s.list}>
                      <p>Categories:</p>
                      {book.categories.map((cat) => {
                        return <div className={s.item}>{cat}</div>;
                      })}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default PaymentDetail;
