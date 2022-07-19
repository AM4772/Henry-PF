import React from "react";
import s from "./BookDetail.module.sass";
import Loading from "../Loading/Loading";

import { useParams } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { asyncGetBookDetail } from "../../redux/actions/booksActions";
// import { clearBookDetail } from "../../redux/reducers/booksSlice";

// TESTING ================
import { TESTING_BOOKS } from "../../testingObjects";
// ==============================

function BookDetail(props) {
  const { ID } = useParams();
  // console.log("ID ES", ID);
  // let book = useSelector((state) => state.books.bookDetail);
  // const dispatch = useDispatch();
  let book = TESTING_BOOKS[ID];

  // React.useEffect(() => {
  //   dispatch(asyncGetBookDetail(ID));
  //   return () => dispatch(clearBookDetail());
  // }, [dispatch, ID]);

  var upperTitle = book.title?.toUpperCase();

  function goBack() {
    window.history.back();
  }

  return (
    <div>
      {book.title ? (
        <div className={s.container0}>
          <div className={s.container1}>
            <div className="backButton">
              <button className={s.button} onClick={goBack}>
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
                <div className={s.containerBook3}>
                  <div className={s.containerBookName}>
                    <h1 id={s.bookTitle}>{upperTitle}</h1>
                  </div>
                  <div className={s.containerDetails}>
                    <div className={s.text}>
                      <p>Description:</p>
                      <p>{book.description}</p>
                    </div>
                    <div className={s.price}>
                      <p>$ {book.price}</p>
                    </div>
                    <div className={s.arr}>
                      <p>Authors:</p>
                      {book.authors.map((el) => (
                        <p>{book.authors[el]}</p>
                      ))}
                    </div>
                    <div className={s.arr}>
                      <p>Categories:</p>
                      {book.categories.map((el) => (
                        <p>{book.categories[el]}</p>
                      ))}
                    </div>
                    <div className={s.text}>
                      <p>Publisher:</p>
                      <p>{book.publisher}</p>
                    </div>
                    <div className={s.text}>
                      <p>Publish Date:</p>
                      <p>{book.publishedDate}</p>
                    </div>
                    <div className={s.text}>
                      <p>Total Pages:</p>
                      <p>{book.pageCount}</p>
                    </div>
                    <div className={s.text}>
                      <p>Language:</p>
                      <p>{book.language}</p>
                    </div>
                  </div>
                  <div className="containerButtons">
                    <button className={s.button} onClick={goBack}>
                      Comprar
                    </button>
                    <button className={s.button} onClick={goBack}>
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
