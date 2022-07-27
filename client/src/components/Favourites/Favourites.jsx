// import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
// import { useState } from "react";
import FavouriteCard from "../FavouriteCard/FavouriteCard";
import s from "./Favourites.module.sass";

const Favourites = () => {
  // const dispatch = useDispatch();
  const { favourites } = useSelector((state) => state.profile);

  return favourites.length > 0 ? (
    favourites.map((b) => (
      <div className={s.containerFav0}>
        <div className={s.containerFav1}>
          <FavouriteCard
            key={b.ID}
            ID={b.ID}
            image={b.image}
            title={b.title}
            authors={b.authors}
            price={b.price}
          />
        </div>
        <div>
          <button className="buttons">Empty List</button>
        </div>
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
