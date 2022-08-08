import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Loading from "../Loading/Loading";
import PurchaseCard from "../PurchaseCard/PurchaseCard";
import s from "./Purchases.module.sass";

const Purchases = () => {
  const history = useHistory();
  const { userProfile, appLoadingProfile } = useSelector(
    (state) => state.profile
  );
  const { stack } = useSelector((state) => state.history);

  useEffect(() => {
    if (!appLoadingProfile) {
      if (!userProfile.ID) {
        history.push("/");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLoadingProfile, userProfile]);

  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/purchases" &&
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
  return (
    <div className={s.containerFav0}>
      {appLoadingProfile ? <Loading /> : null}
      <div className={s.backButton}>
        <button className={s.buttonBack} onClick={goBack}>
          Back
        </button>
      </div>
      {userProfile.ID ? (
        userProfile.payments.length > 0 ? (
          userProfile.payments.map((p) => (
            <div key={p.mpID} className={s.containerFav1}>
              <PurchaseCard
                ID={p.mpID}
                date={p.createdAt}
                items={p.items}
                total={p.total}
              />
            </div>
          ))
        ) : (
          <div className={s.containerNotFav0}>
            <div className={s.containerNotFav}>
              <div className={s.NotFav}>
                <h4>You have not bought books yet</h4>
                <p>
                  You can buy books by clicking on the button BUY that appears
                  in the detail of each book
                </p>
                <p>
                  Browse the <Link to="/">home</Link> section to buy your
                  favourites books!
                </p>
              </div>
            </div>
          </div>
        )
      ) : null}
    </div>
  );
};

export default Purchases;
