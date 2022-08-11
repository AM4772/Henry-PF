import { useEffect, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
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
  const [filterPayments, setFilterPayments] = useState(userProfile.payments);
  const [sorting, setSortName] = useState({
    createdAt: false,
    total: false,
    items: false,
  });
  const { stack } = useSelector((state) => state.history);
  function sort(from) {
    if (from === "items") {
      if (sorting[from]) {
        setFilterPayments([
          ...filterPayments.sort((a, b) => {
            if (a.items.length < b.items.length) {
              return -1;
            }
            if (a.items.length > b.items.length) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setFilterPayments([
          ...filterPayments.sort((a, b) => {
            if (a.items.length > b.items.length) {
              return -1;
            }
            if (a.items.length < b.items.length) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    } else if (from === "createdAt") {
      if (sorting[from]) {
        setFilterPayments([
          ...filterPayments.sort((a, b) => {
            if (new Date(a[from]) < new Date(b[from])) {
              return -1;
            }
            if (new Date(a[from]) > new Date(b[from])) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setFilterPayments([
          ...filterPayments.sort((a, b) => {
            if (new Date(a[from]) > new Date(b[from])) {
              return -1;
            }
            if (new Date(a[from]) < new Date(b[from])) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    } else {
      if (sorting[from]) {
        setFilterPayments([
          ...filterPayments.sort((a, b) => {
            if (a[from] < b[from]) {
              return -1;
            }
            if (a[from] > b[from]) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setFilterPayments([
          ...filterPayments.sort((a, b) => {
            if (a[from] > b[from]) {
              return -1;
            }
            if (a[from] < b[from]) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    }
    setSortName({ ...sorting, [from]: !sorting[from] });
  }

  useEffect(() => {
    if (!appLoadingProfile) {
      if (!userProfile.ID) {
        history.push("/");
      } else {
        let array = [...userProfile.payments];
        setFilterPayments([...array]);
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
        // stack[i] !== "/profile" &&
        stack[i] !== "/purchases"
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
        <table>
          <thead>
            <tr>
              <th className={s.sorter} onClick={() => sort("items")}>
                items
                <span>
                  {!sorting.items ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sorter} onClick={() => sort("total")}>
                Price
                <span>
                  {!sorting.total ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sorter} onClick={() => sort("createdAt")}>
                Date
                <span>
                  {!sorting.createdAt ? (
                    <RiArrowUpSFill />
                  ) : (
                    <RiArrowDownSFill />
                  )}
                </span>
              </th>
            </tr>
          </thead>
        </table>
      </div>
      {userProfile.ID ? (
        userProfile.payments.length > 0 ? (
          <div className={s.purchaseCont}>
            {filterPayments?.map((p) => (
              <PurchaseCard
                className={s.containerFav1}
                key={p.mpID}
                ID={p.mpID}
                date={p.createdAt}
                items={p.items}
                total={p.total}
              />
            ))}
          </div>
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
