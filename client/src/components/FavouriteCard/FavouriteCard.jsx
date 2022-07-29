import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import { asyncDeleteFavourite } from "../../redux/actions/usersActions";
import Loading from "../Loading/Loading";
import s from "./FavouriteCard.module.sass";
import heartOn from "../../assets/Heart_on.png";
import { BsFillCartPlusFill, BsFillCartDashFill} from "react-icons/bs";
import {
  asyncAddItemCart,
  asyncRemoveItemCart,
} from "../../redux/actions/usersActions";

function FavouriteCard(props) {
  let book = props;
  const history = useHistory();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);
  const { cart } = useSelector((state) => state.profile);
  const [addedCart, setAddedCart] = useState(false);

  useEffect(() => {
    if (cart.length) {
      let result = cart.find((el) => el.ID === parseInt(book.ID));
      if (result) setAddedCart(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart]);

  const handleCart = () => {
    if (!addedCart) {
      if (!userProfile.ID) history.push("/login");
      dispatch(asyncAddItemCart(userProfile.ID, book.ID));
      setAddedCart(true);
    } else {
      dispatch(asyncRemoveItemCart(userProfile.ID, book.ID));
      setAddedCart(false);
    }
  };

  function deletingFav() {
    dispatch(asyncDeleteFavourite(userProfile.ID, book.ID));
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
                <p id={s.author}>
                  {book.authors[0] && book.authors[0].length > 27
                    ? book.authors[0].slice(0, 27) + "..."
                    : book.authors[0]}
                </p>
              </div>
            </NavLink>
            <div className={s.containerBlock2}>
              <div className={s.containerCartHeart}>
                <div className={s.containerEmpty}></div>
                <div className={s.containerCartHeart2}>
                  <button onClick={handleCart}>
                    { addedCart ?  <BsFillCartDashFill title="Remove from cart" className={s.icon2}/> : <BsFillCartPlusFill title="Add to Cart" className={s.icon} />}
                  </button>
                  <img
                    className={s.imgHeart}
                    alt="heart"
                    title="Delete Favourite"
                    src={heartOn}
                    onClick={deletingFav}
                  />
                </div>
              </div>
              <div className={s.containerBlock3}>
                <div className={s.containerDate1}>
                  <div className={s.containerDate2}>
                    <p>Added on</p>
                    <p>{new Date(book.date).toLocaleDateString("es-ES")}</p>
                  </div>
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
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default FavouriteCard;
