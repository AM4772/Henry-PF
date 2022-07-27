import React from "react";
import s from "./BookCard.module.sass";
import Loading from "../Loading/Loading";
import { NavLink } from "react-router-dom";

// TESTING ================
// import { TESTING_BOOKS } from "../../testingObjects";
// ==============================

function BookCard(props) {
  let book = props;
  return (
    <div className={s.cards}>
      {book.title ? (
        <NavLink className={s.navLink} to={`/book/${book.ID}`}>
          <div className={s.container0}>
            <div className={s.container1}>
              <div className={s.containerImage}>
                <img
                  className={s.image}
                  title={book.title}
                  alt={book.ID}
                  src={`${book.image}`}
                />
              </div>
              <div className={s.containerBookName}>
                <p id={s.bookTitle}>
                  {book.title.length < 60
                    ? book.title.toUpperCase()
                    : book.title.toUpperCase().slice(0, 60) + "..."}
                </p>
                {/* {book.authors.map((el) => (
                  <p key={el} id={s.author}>
                    {el.length > 27 ? el.slice(0, 27) + "..." : el}
                  </p>
                ))} */}
                <p id={s.author}>
                  {book.authors[0] && book.authors[0].length > 27
                    ? book.authors[0].slice(0, 27) + "..."
                    : book.authors[0]}
                </p>
                {/* <p id={s.author}>{book.authors}</p> */}
              </div>
              <div className={s.price}>
                <p>
                  $
                  {new Intl.NumberFormat("es-ES", {
                    maximumFractionDigits: 2,
                    minimumFractionDigits: 2,
                  }).format(book.price)}
                </p>
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
