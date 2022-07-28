import React, { useEffect } from "react";
import s from "./BookDetail.module.sass";
import Loading from "../Loading/Loading";
import { useHistory } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import Swal from "sweetalert2";
import { asyncGetBookDetail } from "../../redux/actions/booksActions";
import { clearBookDetail } from "../../redux/reducers/booksSlice";
import {
  asyncAddFavourite,
  asyncDeleteFavourite,
  asyncGetItemCart,
  asyncAddItemCart,
  asyncRemItemoveCart,
  asyncRemoveItemCart,
} from "../../redux/actions/usersActions";

import Stars5 from "../../assets/Stars5.png";
import heartOff from "../../assets/Heart_off.png";
import heartOn from "../../assets/Heart_on.png";

function BookDetail(props) {
  const { ID } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();

  const { stack } = useSelector((state) => state.history);
  const { userProfile } = useSelector((state) => state.profile);
  const { favourites, cart } = useSelector((state) => state.profile);
  let book = useSelector((state) => state.books.bookDetail);

  const [addedBook, setAddedBook] = useState(false);
  const [addedCart, setAddedCart] = useState(false);

  window.scrollTo(0, 0);

  useEffect(() => {
    if (favourites.length) {
      let result = favourites.find((el) => el.ID === parseInt(ID));
      if (result) setAddedBook(true);
    }
    if (cart.length) {
      let result = cart.find((el) => el.ID === parseInt(ID));
      if (result) setAddedCart(true);
    }
  }, [favourites, cart, ID]);

  useEffect(() => {
    dispatch(asyncGetBookDetail(ID));
    return () => dispatch(clearBookDetail());
  }, [dispatch, ID]);

  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/favourites" &&
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
    if (!addedBook) {
      if (!userProfile.ID) {
        Swal.fire({
          title: "To add a favourite book, you have to be logged in",
          // text: "Do you want to log in?",
          icon: "info",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Go to Login",
        }).then((result) => {
          if (result.isConfirmed) {
            history.push("/login");
            dispatch(asyncAddFavourite(userProfile.ID, ID));
            setAddedBook(true);
          }
        });
      }
    } else {
      dispatch(asyncDeleteFavourite(userProfile.ID, ID));
      setAddedBook(false);
    }
  }

  const addingToCart = () => {
    if (!addedCart) {
      if (!userProfile.ID) history.push("/login");
      dispatch(asyncAddItemCart(userProfile.ID, ID));
      setAddedCart(true);
    } else {
      dispatch(asyncRemoveItemCart(userProfile.ID, ID));
      setAddedCart(false);
    }
  }

  function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    element.scrollIntoView({
      block: "start",
      behavior: "smooth",
    });
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
                        onClick={() => scrollSmoothTo("reviewsMark")}
                        // href="#reviewsMark"
                      >
                        <img className={s.reviews} alt="5stars" src={Stars5} />
                        <p>
                          {""}(23 reviews){""}
                        </p>
                      </div>
                    </div>

                    <div className={s.arr}>
                      <p>Categories:</p>
                      {book.categories[0] ? (
                        <p>{book.categories[0]}</p>
                      ) : (
                        // book.categories.map((el) => <p key={el}>{el}</p>)
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
                    {/* <div className={s.containerDetails1}>
                      <div className={s.text}>
                        <p>Language</p>
                        <p>{book.language}</p>
                      </div>
                    </div> */}
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
                    <button className={s.buttons} onClick={goBack}>
                      BUY
                    </button>
                    <button className={s.buttons} onClick={addingToCart}>
                      {!addedCart ? 'ADD TO CART' : 'REMOVE FROM CART'}
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
                <div>
                  "The book is really excellent, with a lot of common places..."{" "}
                </div>
                <span>-Someone-</span>
                <div>"It is a masterpiece"</div>
                <span>-Someone else-</span>
                <div>
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat."
                </div>
                <span>-Some crazy person 👴-</span>
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
