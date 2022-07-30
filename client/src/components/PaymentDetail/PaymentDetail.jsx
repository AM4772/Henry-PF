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
  var tot = 0;

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
              <div className={s.userList}>
                <p>Purchase Date:</p>
                <p>{test.purchaseDate}</p>
              </div>
              <div className={s.line}></div>
            </div>
            <div className={s.purchase}>
              {test.purchasedBooks.map((book) => {
                tot += book.price;
                return (
                  <div className={s.info}>
                    <div className={s.contain}>
                      <div>
                        <img src={book.image} alt="" className={s.image} />
                      </div>
                      <div className={s.bookInfo}>
                        <p>Book: {book.title}</p>
                        <p>ID: {book.ID}</p>
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
                        <p className={s.price}>${book.price}</p>
                      </div>
                    </div>
                    <div className={s.line}></div>
                  </div>
                );
              })}
            </div>
            <div className={s.final}>
              <p className={s.titulo}>Total:</p>
              <p className={s.total}>${tot}</p>
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
