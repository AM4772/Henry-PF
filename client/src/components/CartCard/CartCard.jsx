import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import Loading from '../Loading/Loading';
import { BsFillCartDashFill } from 'react-icons/bs';
import { asyncRemoveItemCart } 
from '../../redux/actions/usersActions';
import s from './CartCard.module.sass';

function CartCard(props) {
  let book = props;
  const dispatch = useDispatch();
  const { userProfile } = useSelector(state => state.profile);
  const handleRemoveItemCart = () => dispatch(asyncRemoveItemCart(userProfile.ID, book.ID));

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
                    : book.title.toUpperCase().slice(0, 60) + '...'}
                </p>
                <p id={s.author}>
                  {book.authors[0] && book.authors[0].length > 27
                    ? book.authors[0].slice(0, 27) + '...'
                    : book.authors[0]}
                </p>
              </div>
            </NavLink>
            <div className={s.containerBlock2}>
              <div className={s.containerCartHeart}>
                <div className={s.containerCartHeart2}>
                  <button className={s.iconPosition} onClick={() => handleRemoveItemCart()}>
                    <BsFillCartDashFill title="Remove from cart" className={s.icon} />
                  </button>
                </div>
              </div>
              <div className={s.containerBlock3}>
                <div className={s.containerDate1}>
                  <div className={s.containerDate2}>
                    <p>Added on</p>
                    <p>{new Date(book.date).toLocaleDateString('es-ES')}</p>
                  </div>
                </div>
                <div className={s.price}>
                  <p>
                    $
                    {new Intl.NumberFormat('es-ES', {
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

export default CartCard;
