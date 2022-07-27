// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import s from "./Favourites.module.sass";

const Favourites = () => {
  const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.profile);

  return favourites.length > 0 ? (
    favourites.map((fav) => (
      <div className={s.containerFav1}>
        <p>{fav.title}</p>
      </div>
    ))
  ) : (
    <div className={s.containerNotFav}>
      <div className={s.NotFav}>
        <h4>You have not selected a favorite book yet</h4>
        <p>
          You can add favorite books by clicking on the heart that appears in
          the detail of each book
        </p>
        <p>
          Browse the <a href="/">home</a> section to find your favourites books!
        </p>
      </div>
    </div>
  );
};

export default Favourites;
