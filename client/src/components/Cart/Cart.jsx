import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import Loading from "../Loading/Loading.jsx";
import CartCard from "../CartCard/CartCard.jsx";
import { useDispatch } from "react-redux";
import { asyncGetItemsCart } from "../../redux/actions/usersActions";
import s from "./Cart.module.sass";

function Cart() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const history = useHistory();
  const { cart, userProfile } = useSelector((state) => state.profile);
  const { stack } = useSelector((state) => state.history);

  useEffect(() => {
    if (!cart.length && userProfile.ID) {
      setLoading(true);
      dispatch(asyncGetItemsCart(parseInt(userProfile.ID)))
        .then(() => {
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  const goBack = () => {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
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
  };
  return cart.length ? (
    <div className={s.containerFav0}>
      <div className={s.backButton}>
        <button className={s.buttonBack} onClick={goBack}>
          Back
        </button>
      </div>
      {cart.map((b) => (
        <div key={b.ID} className={s.containerFav1}>
          <CartCard
            key={b.ID}
            ID={b.ID}
            image={b.image}
            title={b.title}
            authors={b.authors}
            price={b.price}
            date={b.user_bookcart.createdAt}
          />
        </div>
      ))}
      <div id={s.centerMe}>
        <NavLink to="/" className={s.buttonsCart}>
          CONTINUE BUYING
        </NavLink>
        <button className={s.buttonsCart}>BUY</button>
      </div>
    </div>
  ) : loading && !cart.length ? (
    <Loading />
  ) : (
    <div className={s.containerNotFav0}>
      <div className={s.containerNotFav}>
        <div className={s.backButton}>
          <button className={s.buttonBack} onClick={goBack}>
            Back
          </button>
        </div>
        <div className={s.NotFav}>
          <h4>You have not added any book to your cart yet</h4>
          <p>
            You can add books to your cart by clicking on the <b>add to cart</b>{" "}
            button that appears in the detail of each book.
          </p>
          <p>
            Browse the <a href="/">home</a> section to look for books 🤠!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Cart;
