// import { useEffect } from "react";
// import { useSelector } from "react-redux";
// import { useHistory } from "react-router-dom";
// import PaymentCard from "../PaymentCard/PaymentCard";
import s from "./Payments.module.sass";
import { TESTING_PAYMENTS } from "../../TESTING_PAYMENTS";
import SearchBarPayments from "./SearchBarPayments";
import { useEffect, useState } from "react";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { Link } from "react-router-dom";

const Payments = () => {
  // const history = useHistory();
  // const { favourites } = useSelector((state) => state.profile);
  // const { stack } = useSelector((state) => state.history);
  // useEffect(() => {}, []);
  let payment = TESTING_PAYMENTS;
  const [search, setSearch] = useState("");
  const [filterPayment, setPaymentFilter] = useState(TESTING_PAYMENTS);
  const [sorting, setSortName] = useState({
    ID: false,
    purchasedBooks: false,
    userID: false,
    username: false,
    purchaseDate: false,
  });

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function filterPay() {
    var paymentFilter = TESTING_PAYMENTS.filter(
      (p) =>
        p.userInfo.userID
          .toString()
          .replace(/^\s+|\s+$/g, "")
          .replace(/\./g, "")
          .replace(/\s+/g, "")
          .toLowerCase()
          .includes(
            search
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\s+/g, "")
              .toLowerCase()
          ) ||
        p.userInfo.username
          .toString()
          .replace(/^\s+|\s+$/g, "")
          .replace(/\./g, "")
          .replace(/\s+/g, "")
          .toLowerCase()
          .includes(
            search
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\s+/g, "")
              .toLowerCase()
          ) ||
        p.ID.toString()
          .replace(/^\s+|\s+$/g, "")
          .replace(/\./g, "")
          .replace(/\s+/g, "")
          .replace(/\//g, "")
          .toLowerCase()
          .includes(
            search
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\s+/g, "")
              .replace(/\//g, "")
              .toLowerCase()
          ) ||
        p.purchasedBooks.length
          .toString()
          .replace(/^\s+|\s+$/g, "")
          .replace(/\./g, "")
          .replace(/\s+/g, "")
          .replace(/\//g, "")
          .toLowerCase()
          .includes(
            search
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\s+/g, "")
              .replace(/\//g, "")
              .toLowerCase()
          ) ||
        new Date(p.purchaseDate)
          .toLocaleDateString()
          .replace(/^\s+|\s+$/g, "")
          .replace(/\./g, "")
          .replace(/\s+/g, "")
          .replace(/\//g, "")
          .toLowerCase()
          .includes(
            search
              .replace(/^\s+|\s+$/g, "")
              .replace(/\./g, "")
              .replace(/\//g, "")
              .replace(/\s+/g, "")
              .toLowerCase()
          )
    );
    setPaymentFilter(paymentFilter.sort((a, b) => a.ID - b.ID));
  }
  useEffect(() => {
    filterPay();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  function sort(from) {
    if (from === "userID") {
      if (sorting.userID) {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.userInfo.userID < b.userInfo.userID) {
              return -1;
            }
            if (a.userInfo.userID > b.userInfo.userID) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.userInfo.userID > b.userInfo.userID) {
              return -1;
            }
            if (a.userInfo.userID < b.userInfo.userID) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    } else if (from === "username") {
      if (sorting.username) {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.userInfo.username < b.userInfo.username) {
              return -1;
            }
            if (a.userInfo.username > b.userInfo.username) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.userInfo.username > b.userInfo.username) {
              return -1;
            }
            if (a.userInfo.username < b.userInfo.username) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    } else if (from === "purchasedBooks") {
      if (sorting.purchasedBooks) {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.purchasedBooks.length < b.purchasedBooks.length) {
              return -1;
            }
            if (a.purchasedBooks.length > b.purchasedBooks.length) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.purchasedBooks.length > b.purchasedBooks.length) {
              return -1;
            }
            if (a.purchasedBooks.length < b.purchasedBooks.length) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    } else if (from === "purchaseDate") {
      if (sorting.purchaseDate) {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (
              new Date(a.purchaseDate).getTime() <
              new Date(b.purchaseDate).getTime()
            ) {
              return -1;
            }
            if (
              new Date(a.purchaseDate).getTime() >
              new Date(b.purchaseDate).getTime()
            ) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (
              new Date(a.purchaseDate).getTime() >
              new Date(b.purchaseDate).getTime()
            ) {
              return -1;
            }
            if (
              new Date(a.purchaseDate).getTime() <
              new Date(b.purchaseDate).getTime()
            ) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    } else {
      if (sorting[from]) {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
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
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterPayment]);
  return payment.length > 0 ? (
    <div className={s.containerPay0}>
      {/* <div className={s.backButton}>
        <button className={s.buttonBack}>Back</button>
      </div> */}
      <div className={s.top}>
        <h1>Payments</h1>
        <SearchBarPayments value={search} onChange={handleChange} />
      </div>
      <div className={s.tableContainer}>
        <table>
          <thead>
            <tr className={s.sticky}>
              <th className={s.sort} onClick={() => sort("ID")}>
                ID Payment
                <span>
                  {sorting.ID ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sort} onClick={() => sort("purchasedBooks")}>
                Items
                <span>
                  {sorting.purchasedBooks ? (
                    <RiArrowUpSFill />
                  ) : (
                    <RiArrowDownSFill />
                  )}
                </span>
              </th>
              <th className={s.sort} onClick={() => sort("userID")}>
                UserID
                {sorting.userID ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
              </th>
              <th className={s.sort} onClick={() => sort("username")}>
                Username
                {sorting.username ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
              </th>
              <th className={s.sort} onClick={() => sort("purchaseDate")}>
                Buy Date
                {sorting.purchaseDate ? (
                  <RiArrowUpSFill />
                ) : (
                  <RiArrowDownSFill />
                )}
              </th>
              <th className={s.sort}>Price</th>
            </tr>
          </thead>
          <tbody>
            {filterPayment.map((b) => (
              <tr key={b.ID}>
                <td className={s.td}>
                  <Link to={`/dashboard/payment/${b.ID}`}>{b.ID}</Link>
                </td>
                <td className={s.td}>
                  <a href={`/dashboard/payment/${b.ID}`}>
                    {b.purchasedBooks.length}
                  </a>
                </td>
                <td className={s.td}>{b.userInfo.userID}</td>
                <td className={s.td}>{b.userInfo.username}</td>
                <td className={s.td}>
                  {new Date(b.purchaseDate).toLocaleDateString("es-ES")}
                </td>
                <td className={s.td}>
                  <a href={`/dashboard/payment/${b.ID}`}>
                    $
                    {new Intl.NumberFormat("es-ES", {
                      maximumFractionDigits: 2,
                      minimumFractionDigits: 2,
                    }).format(
                      b.purchasedBooks.reduce((ac, el) => ({
                        price: ac.price + el.price,
                      })).price
                    )}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className={s.containerNotPaym}>
      <div className={s.NotPaym}>
        <h4>There are not payments yet</h4>
      </div>
    </div>
  );
};

export default Payments;
