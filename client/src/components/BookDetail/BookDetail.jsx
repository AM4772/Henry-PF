import React from "react";
import s from "./BookDetail.module.sass";
import Loading from "../Loading/Loading";

import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetBookDetail } from "../../redux/actions/booksActions";
import { clearBookDetail } from "../../redux/reducers/booksSlice";

// // TESTING ================
// import { TESTING_BOOKS } from "../../testingObjects";
// // ==============================

function BookDetail(props) {
  const { ID } = useParams();

  let book = useSelector((state) => state.books.bookDetail);
  const dispatch = useDispatch();
  // let book = TESTING_BOOKS[ID - 1];

  React.useEffect(() => {
    dispatch(asyncGetBookDetail(ID));
    return () => dispatch(clearBookDetail());
  }, [dispatch, ID]);

  function goBack() {
    window.history.back();
  }

  return (
    <div>
      {book.title ? (
        <div className={s.container0}>
          <div className={s.container1}>
            <div className={s.backButton}>
              <button className={s.buttonBack} onClick={goBack}>
                Back
              </button>
            </div>
            <div className={s.container2}>
              <div className={s.container3}>
                <div className={s.containerImage}>
                  <img
                    className={s.image}
                    alt={book.title}
                    src={`${book.image}`}
                  />
                </div>
                <div className={s.containerBookDetails}>
                  <div className={s.containerBookName}>
                    <p id={s.bookTitle}>
                      {book.title.length < 37
                        ? book.title.toUpperCase()
                        : book.title.toUpperCase().slice(0, 37) + "..."}
                    </p>
                  </div>
                  <div className={s.containerDetails}>
                    <div className={s.arr}>
                      {/* <p>Authors:</p> */}
                      {/* <p id={s.author}>{book.authors}</p> */}
                      {book.authors.map((el) => (
                        <p key={el} id={s.author}>
                          {el}
                        </p>
                      ))}
                    </div>
                    <div className={s.text}>
                      <p>Description</p>
                      <p>{book.description}</p>
                    </div>
                    <div className={s.arr}>
                      <p>Categories:</p>
                      {/* <p>{book.categories}</p> */}
                      {book.categories.map((el) => (
                        <p key={el}>{el}</p>
                      ))}
                    </div>
                    <div className={s.text}>
                      <p>Publisher</p>
                      <p>{book.publisher}</p>
                    </div>
                    <div className={s.text}>
                      <p>Publish Date</p>
                      <p>
                        {new Date(book.publishedDate).toLocaleDateString(
                          "es-ES"
                        )}
                      </p>
                    </div>
                    <div className={s.text}>
                      <p>Total Pages</p>
                      <p>{book.pageCount}</p>
                    </div>
                    <div className={s.text}>
                      <p>Language</p>
                      <p>{book.language}</p>
                    </div>
                    <div className={s.price}>
                      <p>
                        ${new Intl.NumberFormat("es-ES").format(book.price)}
                      </p>
                    </div>
                  </div>
                  <div className={s.containerButtons}>
                    <button className={s.buttons} onClick={goBack}>
                      Comprar
                    </button>
                    <button className={s.buttons} onClick={goBack}>
                      Añadir al Carrito
                    </button>
                  </div>
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

export default BookDetail;
