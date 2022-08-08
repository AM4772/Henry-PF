import React, { useEffect, useState } from "react";
import s from "./Payments.module.sass";
import SearchBarPayments from "./SearchBarPayments";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { asyncGetPayments } from "../../redux/actions/paymentsActions";
import { AiOutlineReload } from "react-icons/ai";

const Payments = () => {
  const { payments } = useSelector((state) => state.payments);
  const dispatch = useDispatch();
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [payments]);
  useEffect(() => {
    dispatch(asyncGetPayments());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let payment = payments;
  const [search, setSearch] = useState("");
  const [filterPayment, setPaymentFilter] = useState(payments);
  const [sorting, setSortName] = useState({
    mpID: false,
    purchasedBooks: false,
    userID: false,
    username: false,
    purchaseDate: false,
    total: false,
  });

  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }
  function reload() {
    dispatch(asyncGetPayments());
  }
  function filterPay() {
    var paymentFilter = payments.filter(
      (p) =>
        p.user.ID.toString()
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
        p.user.username
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
        p.mpID
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
        p.items.length
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
        new Date(p.createdAt)
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
          ) ||
        p.total
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
            if (a.userID < b.userID) {
              return -1;
            }
            if (a.userID > b.userID) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.userID > b.userID) {
              return -1;
            }
            if (a.userID < b.userID) {
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
            if (a.user.username < b.user.username) {
              return -1;
            }
            if (a.user.username > b.user.username) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (a.user.username > b.user.username) {
              return -1;
            }
            if (a.user.username < b.user.username) {
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
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
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
    } else if (from === "purchaseDate") {
      if (sorting.purchaseDate) {
        setPaymentFilter([
          ...filterPayment.sort((a, b) => {
            if (
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
            ) {
              return -1;
            }
            if (
              new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
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
              new Date(a.createdAt).getTime() < new Date(b.createdAt).getTime()
            ) {
              return -1;
            }
            if (
              new Date(a.createdAt).getTime() > new Date(b.createdAt).getTime()
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
      <div className={s.top}>
        <h1>Payments</h1>
        <div className={s.reloadCont}>
          <AiOutlineReload className={s.reload} onClick={() => reload()} />
        </div>
        <span>
          <SearchBarPayments value={search} onChange={handleChange} />
        </span>
      </div>
      <div className={s.tableContainer}>
        <table>
          <thead>
            <tr className={s.sticky}>
              <th className={s.sort} onClick={() => sort("mpID")}>
                ID Payment
                <span>
                  {sorting.mpID ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
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
              <th className={s.sort} onClick={() => sort("total")}>
                Price
                {sorting.total ? <RiArrowDownSFill /> : <RiArrowUpSFill />}
              </th>
            </tr>
          </thead>
          <tbody>
            {filterPayment.map((b) => (
              <tr key={b.mpID}>
                <td className={s.td}>
                  <Link to={`/dashboard/payment/${b.mpID}`}>{b.mpID}</Link>
                </td>
                <td className={s.td}>
                  <Link to={`/dashboard/payment/${b.mpID}`}>
                    {b.items.length}
                  </Link>
                </td>
                <td className={s.td}>{b.userID}</td>
                <td className={s.td}>
                  <Link to={`/user/${b.userID}`}>{b.user.username}</Link>
                </td>
                <td className={s.td}>
                  {new Date(b.createdAt).toLocaleDateString("es-ES")}
                </td>
                <td className={s.td}>
                  <Link to={`/dashboard/payment/${b.mpID}`}>${b.total}</Link>
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
