import React, { useEffect } from "react";
import s from "./BookCard.module.sass";
import Loading from "../Loading/Loading";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import {
  asyncAddFavourite,
  asyncDeleteFavourite,
} from "../../redux/actions/usersActions";
import heartOff from "../../assets/Heart_off.png";
import heartOn from "../../assets/Heart_on.png";
import Stars0 from "../../assets/Stars0.png";
import Stars1 from "../../assets/Stars1.png";
import Stars2 from "../../assets/Stars2.png";
import Stars3 from "../../assets/Stars3.png";
import Stars4 from "../../assets/Stars4.png";
import Stars5 from "../../assets/Stars5.png";

function BookCard(props) {
  let book = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.profile);
  const { userProfile } = useSelector((state) => state.profile);
  const [addedBook, setAddedBook] = useState(false);

  const stars = [Stars0, Stars1, Stars2, Stars3, Stars4, Stars5];

  useEffect(() => {
    if (favourites.length) {
      let result = favourites.find((el) => el.ID === parseInt(book.ID));
      if (result) setAddedBook(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [favourites]);

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
      dispatch(asyncAddFavourite(userProfile.ID, book.ID));
      setAddedBook(true);
    }
    if (userProfile.ID && addedBook) {
      dispatch(asyncDeleteFavourite(userProfile.ID, book.ID));
      setAddedBook(false);
    }
  }

  return (
    <div className={s.cards}>
      {book.title ? (
        <div className={s.container0}>
          <div className={s.container1}>
            <NavLink className={s.navLink} to={`/book/${book.ID}`}>
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
                <div className={s.authorAndReviews}>
                  <p id={s.author}>
                    {book.authors[0] && book.authors[0].length > 27
                      ? book.authors[0].slice(0, 15) + "..."
                      : book.authors[0]}
                  </p>
                  <div className={s.starReviews}>
                    <img src={stars[Math.round(book.rating)]} alt={book.ID} />
                  </div>
                </div>
                <p id={s.publishDate}>Published Date: {book.publishDate}</p>
              </div>
            </NavLink>
            <div className={s.containerHeartPrice}>
              <div className={s.containerHeart}>
                <img
                  className={s.imgHeart}
                  alt="heart"
                  title={!addedBook ? "Add Favourite" : "Delete Favourite"}
                  src={!addedBook ? heartOff : heartOn}
                  onClick={addingFav}
                />
              </div>
              <NavLink className={s.navLink2} to={`/book/${book.ID}`}>
                <div className={s.price}>
                  <p>
                    $
                    {new Intl.NumberFormat("es-ES", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(book.price)}
                  </p>
                </div>
              </NavLink>
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
