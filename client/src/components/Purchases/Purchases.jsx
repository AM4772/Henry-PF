import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import s from "./Purchases.module.sass";

const Favourites = () => {
  const history = useHistory();
  const { favourites } = useSelector((state) => state.profile);
  const { stack } = useSelector((state) => state.history);

  useEffect(() => {}, [favourites]);

  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/cart" &&
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
  return favourites.length > 0 ? (
    <div className={s.containerFav0}>
      <div className={s.backButton}>
        <button className={s.buttonBack} onClick={goBack}>
          Back
        </button>
      </div>
      {favourites.map((b) => (
        <div key={b.ID} className={s.containerFav1}>
          <PurchaseCard
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
    <div className={s.containerNotFav0}>
      <div className={s.backButton}>
        <button className={s.buttonBack} onClick={goBack}>
          Back
        </button>
      </div>
      <div className={s.containerNotFav}>
        <div className={s.NotFav}>
          <h4>You have not bought books yet</h4>
          <p>
            You can buy books by clicking on the button BUY that appears in the
            detail of each book
          </p>
          <p>
            Browse the <a href="/">home</a> section to buy your favourites
            books!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Favourites;
