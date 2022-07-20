import React from "react";
import s from "./BookCard.module.sass";
import Loading from "../Loading/Loading";
import { NavLink } from "react-router-dom";

// TESTING ================
import { TESTING_BOOKS } from "../../testingObjects";
// ==============================

function BookCard(props) {
  let book = props;
  return (
    <div>
      {book.title ? (
        <NavLink className="navLink" to={`/book/${book.ID}`}>
          <div className={s.container0}>
            <div className={s.container1}>
              <div className={s.containerImage}>
                <img
                  className={s.image}
                  alt={book.title}
                  src={`${book.image}`}
                />
              </div>
              <div className={s.containerBookName}>
                <p id={s.bookTitle}>
                  {book.title.length < 37
                    ? book.title.toUpperCase()
                    : book.title.toUpperCase().slice(0, 37) + "..."}
                </p>
                <p id={s.author}>{book.authors}</p>
              </div>
              <div className={s.price}>
                <p>${new Intl.NumberFormat("es-ES").format(book.price)}</p>
              </div>
            </div>
          </div>
        </NavLink>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default BookCard;
