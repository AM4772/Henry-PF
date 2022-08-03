import React from "react";
// import { useState } from "react";
import s from "./PurchaseDetail.module.sass";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { TESTING_PAYMENTS } from "../../TESTING_PAYMENTS";

function PurchaseDetail() {
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
              <h4>
                Purchase ID:{"    "} <b>{test.ID}</b>
              </h4>
              <div className={s.userList}>
                <p>Purchase Date:</p>
                <p>{test.purchaseDate}</p>
              </div>
              <div className={s.line}></div>
            </div>
            <div className={s.purchase}>
              {test.purchasedBooks.map((book, i) => {
                tot += book.price;
                return (
                  <div key={i} className={s.info}>
                    <div className={s.contain}>
                      <div>
                        <Link to={`/book/${book.ID}`}>
                          <img src={book.image} alt="" className={s.image} />
                        </Link>
                      </div>
                      <div className={s.bookInfo}>
                        <p>
                          Book:<b> {book.title.toUpperCase()}</b>
                        </p>
                        <p>ID: {book.ID}</p>
                        <div className={s.list}>
                          <p>Authors:</p>
                          {book.authors.map((au, i) => {
                            return (
                              <div key={i} className={s.item}>
                                <b> {au}</b>
                              </div>
                            );
                          })}
                        </div>
                        <div className={s.list}>
                          <p>Categories:</p>
                          {book.categories.map((cat, i) => {
                            return (
                              <div key={i} className={s.item}>
                                {cat}
                              </div>
                            );
                          })}
                        </div>
                        <p className={s.price}>
                          $
                          {new Intl.NumberFormat("es-ES", {
                            maximumFractionDigits: 2,
                            minimumFractionDigits: 2,
                          }).format(book.price)}
                        </p>
                      </div>
                    </div>
                    <div className={s.line}></div>
                  </div>
                );
              })}
            </div>
            <div className={s.final}>
              <p className={s.titulo}>Total:</p>
              <p className={s.total}>
                ${" "}
                {new Intl.NumberFormat("es-ES", {
                  maximumFractionDigits: 2,
                  minimumFractionDigits: 2,
                }).format(tot)}
              </p>
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
