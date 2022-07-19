import React from "react";
import s from "./BookCard.module.sass";
import Loading from "../Loading/Loading";

// TESTING ================
import { TESTING_BOOKS } from "../../testingObjects";
// ==============================

function BookCard(props) {
  let book = TESTING_BOOKS[0];
  var upperTitle = book.title?.toUpperCase();
  return (
    <div>
      {book.title ? (
        <div className={s.container0}>
          <div className={s.container1}>
            <div className={s.containerImage}>
              <img className={s.image} alt={book.title} src={`${book.image}`} />
            </div>
            <div className={s.containerBookName}>
              <p id={s.bookTitle}>{upperTitle}</p>
              <p id={s.author}>{book.authors}</p>
            </div>
            <div className={s.price}>
              <p>${new Intl.NumberFormat("es-ES").format(book.price)}</p>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default BookCard;
