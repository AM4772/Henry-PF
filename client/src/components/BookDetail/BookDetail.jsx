import React, { useEffect, useRef } from "react";
import s from "./BookDetail.module.sass";
import Loading from "../Loading/Loading";
import { MdDelete } from "react-icons/md";
import { asyncdeleteReview } from "../../redux/actions/reviewActions";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import {
  asyncGetBookDetail,
  asyncDeleteBook,
} from "../../redux/actions/booksActions";
import {
  clearBookDetail,
  setCloseButtonReview,
} from "../../redux/reducers/booksSlice";
import {
  asyncAddFavourite,
  asyncDeleteFavourite,
  asyncAddItemCart,
  asyncRemoveItemCart,
} from "../../redux/actions/usersActions";
import { asyncreportReview } from "../../redux/actions/reviewActions";

import Stars0 from "../../assets/Stars0.png";
import Stars1 from "../../assets/Stars1.png";
import Stars2 from "../../assets/Stars2.png";
import Stars3 from "../../assets/Stars3.png";
import Stars4 from "../../assets/Stars4.png";
import Stars5 from "../../assets/Stars5.png";
import heartOff from "../../assets/Heart_off.png";
import heartOn from "../../assets/Heart_on.png";
import EditBook from "../EditBook/EditBook";
import AddReview from "../AddReview/AddReview";
import { setItems } from "../../redux/reducers/checkoutSlice";

const stars = [Stars0, Stars1, Stars2, Stars3, Stars4, Stars5];

function BookDetail(props) {
  const { ID } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { stack } = useSelector((state) => state.history);
  const { userProfile } = useSelector((state) => state.profile);
  const { closeButtonReview } = useSelector((state) => state.books);
  const { favourites, cart } = useSelector((state) => state.profile);

  let book = useSelector((state) => state.books.bookDetail);
  // let reviews = TESTING_REVIEWS;
  let reviews = book.reviews;

  const openEdit = useRef();
  document.addEventListener("mousedown", closeList);

  function closeList(e) {
    if (
      openEdit.current &&
      editEnabled &&
      !openEdit.current.contains(e.target)
    ) {
      setEditEnabled(false);
    }
  }

  const [editEnabled, setEditEnabled] = useState(false);
  const [addedBook, setAddedBook] = useState(false);
  const [addedCart, setAddedCart] = useState(false);
  let addedBookID = undefined;

  useEffect(() => {
    window.scrollTo(0, 0);
    // if (!counter) window.scrollTo(0, 0);
    // setCounter((count) => count++);
    if (favourites.length) {
      let result = favourites.find((el) => el.ID === parseInt(ID));
      if (result) setAddedBook(true); //(bookState) => !bookState);
    }
    if (cart.length) {
      let result = cart.find((el) => el.ID === parseInt(ID));
      if (result) setAddedCart(true); //(bookState) => !bookState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites, cart]);

  useEffect(() => {
    dispatch(asyncGetBookDetail(ID)).then((result) => {
      if (!result) history.push("/");
    });
    return () => dispatch(clearBookDetail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ID]);

  useEffect(() => {
    dispatch(asyncGetBookDetail(ID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [closeButtonReview]);

  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/favourites" &&
        stack[i] !== "/createbook" &&
        stack[i] !== "/checkout" &&
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

  function addingFav() {
    if (!userProfile.ID) {
      Swal.fire({
        title: "To add a favourite book, you have to be logged in",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    }
    if (userProfile.ID && !addedBook) {
      dispatch(asyncAddFavourite(userProfile.ID, ID));
      setAddedBook(true);
    }
    if (userProfile.ID && addedBook) {
      dispatch(asyncDeleteFavourite(userProfile.ID, ID));
      setAddedBook(false);
    }
  }

  const addingToCart = () => {
    if (!userProfile.ID) {
      Swal.fire({
        title: "To add a book to your Cart, you have to be logged in",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    }
    if (userProfile.ID && !addedCart) {
      dispatch(asyncAddItemCart(userProfile.ID, ID));
      setAddedCart(true);
    }
    if (userProfile.ID && addedCart) {
      dispatch(asyncRemoveItemCart(userProfile.ID, ID));
      setAddedCart(false);
    }
  };

  function buyingBook() {
    if (!userProfile.ID) {
      Swal.fire({
        title: "To buy a book, you have to be logged in",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Go to Login",
      }).then((result) => {
        if (result.isConfirmed) {
          history.push("/login");
        }
      });
    } else {
      dispatch(setItems([book]));
      history.push("/checkout");
    }
    // dispatch(asyncBuyBook(userProfile.ID, ID));
  }

  const deleteBook = () => {
    dispatch(asyncDeleteBook(ID, book.title)).then((state) => {
      if (state) history.push("/");
    });
  };

  function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
  }
  function validateReviewButton() {
    if (userProfile.ID && userProfile.admin) return true;
    let flag = "none";
    if (userProfile.payments?.length) {
      for (let i = 0; i < userProfile.payments.length; i++) {
        if (userProfile.payments[i].items?.length) {
          for (let j = 0; j < userProfile.payments[i].items.length; j++) {
            if (
              parseInt(userProfile.payments[i].items[j].ID) ===
              parseInt(book.ID)
            )
              flag = "add";
          }
        }
      }
    }
    if (book.reviews?.length) {
      for (let el of book.reviews) {
        if (el.userID === userProfile.ID) {
          flag = "view";
          addedBookID = el.ID.toString();
        }
      }
    }
    return flag;
  }
  function report(reviewId, userID) {
    dispatch(asyncreportReview(reviewId, userID, ID));
  }

  return (
    <div>
      {book.title ? (
        <div className={s.container0}>
          <div className={s.container1}>
            <div className={s.container7}>
              <div className={s.backButton}>
                <button className={s.buttonBack} onClick={goBack}>
                  Back
                </button>
              </div>
              {userProfile.ID && userProfile.admin ? (
                <div className={s.hiddenButtons}>
                  <div className={s.hiddenButton}>
                    <button
                      className={s.buttonEdit}
                      onClick={() => setEditEnabled(true)}
                    >
                      EDIT Book
                    </button>
                  </div>
                  <div className={s.hiddenButton}>
                    <button className={s.buttonDelete} onClick={deleteBook}>
                      DELETE BOOK
                    </button>
                  </div>
                </div>
              ) : (
                <div className={s.hiddenButtons}></div>
              )}
              <div className={s.containerheart}>
                <img
                  className={s.imgHeart}
                  alt="heart"
                  title={!addedBook ? "Add Favourite" : "Delete Favourite"}
                  src={!addedBook ? heartOff : heartOn}
                  onClick={addingFav}
                />
              </div>
            </div>
            <div className={s.container2}>
              <div className={s.container3}>
                <div className={s.containerImage}>
                  <img
                    className={s.image}
                    alt={book.title}
                    title={book.title}
                    src={`${book.image}`}
                  />
                </div>
                <div className={s.containerBookDetails}>
                  <div className={s.containerBookName}>
                    <p id={s.bookTitle}>
                      {book.title.length < 37
                        ? book.title.toUpperCase()
                        : book.title.toUpperCase()}
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
                    <div className={s.containerReviews1}>
                      <div
                        className={s.containerReviews2}

                        // href="#reviewsMark"
                      >
                        <img
                          className={s.reviews}
                          onClick={() => scrollSmoothTo("reviewsMark")}
                          alt="5stars"
                          src={stars[Math.round(book.rating)]}
                        />
                        <p onClick={() => scrollSmoothTo("reviewsMark")}>
                          {""}({reviews.length} reviews){""}
                        </p>
                        <div className={s.reviewButtonCont}>
                          {validateReviewButton() === "add" ? (
                            <button
                              className={s.buttonReview}
                              onClick={() => dispatch(setCloseButtonReview())}
                            >
                              Add REVIEW
                            </button>
                          ) : validateReviewButton() === "view" ? (
                            <button
                              className={s.buttonReview}
                              onClick={() => scrollSmoothTo(addedBookID)}
                            >
                              View REVIEW
                            </button>
                          ) : null}
                        </div>
                      </div>
                    </div>

                    <div className={s.arr}>
                      <p>Categories:</p>
                      {book.categories[0] ? (
                        <p>{book.categories[0]}</p>
                      ) : (
                        <p>No Categories</p>
                      )}
                    </div>
                    <div className={s.text}>
                      <p>Release Date:</p>
                      <p>
                        {new Date(book.publishedDate).toLocaleDateString(
                          "es-ES"
                        )}
                      </p>
                    </div>
                    <div className={s.text}>
                      <p>Total Pages:</p>
                      <p>{book.pageCount}</p>
                    </div>
                    <div className={s.text}>
                      <p>Publisher:</p>
                      <p>{book.publisher}</p>
                    </div>
                    <div className={s.text}>
                      <p>Average Reading Time:</p>
                      <p id={s.avgReading}>{book.avgReadingTime}</p>
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
                  <div className={s.containerButtons}>
                    <button className={s.buttons} onClick={buyingBook}>
                      BUY
                    </button>
                    <button className={s.buttons} onClick={addingToCart}>
                      {!addedCart ? "ADD TO CART" : "REMOVE FROM CART"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className={s.container4}>
              <div className={s.textDescription}>
                <p>DESCRIPTION</p>
                <p>{book.description}</p>
              </div>
            </div>
          </div>
          <div className={s.container5}>
            <p>REVIEWS</p>
            <div className={s.container6}>
              <div className={s.textReviews} id="reviewsMark">
                {reviews.map((el) => (
                  <div key={el.ID} id={el.ID}>
                    <div className={s.containerFirstLine}>
                      <div className={s.starTitle}>
                        <img src={stars[el.rating]} alt={el.ID} />
                        {el.title}{" "}
                      </div>
                      <div className={s.containerReportButton}>
                        {userProfile.ID &&
                        userProfile.ID !== el.userID &&
                        !el.reports.includes(userProfile.ID) ? (
                          <button
                            title={"Report this review"}
                            className={s.buttonReport}
                            onClick={() => report(el.ID, userProfile.ID)}
                          >
                            Report
                          </button>
                        ) : el.reports.includes(userProfile.ID) &&
                          userProfile.ID !== el.userID ? (
                          <span className={s.reported}>Reported</span>
                        ) : userProfile.ID === el.userID ? (
                          <>
                            <span className={s.yourReview}>Your Review</span>
                            <MdDelete
                              title={"Delete your review"}
                              className={s.delete}
                              onClick={() =>
                                dispatch(asyncdeleteReview(el.ID)).then((res) =>
                                  res ? dispatch(asyncGetBookDetail(ID)) : null
                                )
                              }
                            />
                          </>
                        ) : null}
                      </div>
                    </div>
                    <span className={s.containerReviewContent}>
                      {el.review}
                    </span>
                    {reviews[reviews.length - 1].ID !== el.ID ? (
                      <p className={s.divisor}></p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </div>
          {editEnabled ? (
            <div id={s.displayMePlease}>
              <div id={s.editor} ref={openEdit}>
                <EditBook book={book} />
              </div>
            </div>
          ) : undefined}
          {closeButtonReview ? (
            <div id={s.displayMePlease}>
              <div id={s.review}>
                <AddReview book={book} />
              </div>
            </div>
          ) : undefined}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default BookDetail;
