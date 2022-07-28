import { useEffect } from "react";
import { useSelector } from "react-redux";
// import { useState } from "react";
import FavouriteCard from "../FavouriteCard/FavouriteCard";
import s from "./Favourites.module.sass";

const Favourites = () => {
  const { favourites } = useSelector((state) => state.profile);

  useEffect(() => {}, [favourites]);

  return favourites.length > 0 ? (
    <div className={s.containerFav0}>
      {favourites.map((b) => (
        <div key={b.ID} className={s.containerFav1}>
          <FavouriteCard
            key={b.ID}
            ID={b.ID}
            image={b.image}
            title={b.title}
            authors={b.authors}
            price={b.price}
            date={b.user_bookfav.createdAt}
          />
        </div>
      ))}
    </div>
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
