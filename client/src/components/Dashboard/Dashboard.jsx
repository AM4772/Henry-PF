import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, Link } from "react-router-dom";

import s from "./Dashboard.module.sass";
import Sidebar from "../Sidebar/Sidebar";
import UsersBoard from "../DashboardUsers/DashboardUsers";
import Payments from "../Payments/Payments";
import CreateBook from "../CreateBook/CreateBook";
import { asyncGetUsers } from "../../redux/actions/usersActions";
import { Line, Donut, Graph } from "../Analytics/Analytics";
import { TESTING_PAYMENTS } from "../../TESTING_PAYMENTS";

function Dashboard() {
  const { users } = useSelector((state) => state.users);
  const { userProfile } = useSelector((state) => state.profile);
  const { currentSection } = useSelector((state) => state.dashboard);
  const usersMini = users.slice(users.length - 5, users.length).reverse();
  const payments = TESTING_PAYMENTS;
  const paymentsMini = payments
    .slice(payments.length - 5, payments.length)
    .reverse();
  const history = useHistory();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!userProfile.admin) {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    dispatch(asyncGetUsers());
  }, [dispatch]);

  return (
    <div className={s.container}>
      <>
        <div className={s.dashboard}>
          <Sidebar className={s.Sidebar} />
          <div className={s.cont}>
            {currentSection === 1 ? (
              <UsersBoard />
            ) : currentSection === 2 ? (
              <CreateBook />
            ) : currentSection === 3 ? (
              <Payments />
            ) : currentSection === 4 ? (
              <div id={s.fixMe}>
                <Graph />
                <div id={s.npm}>
                  <div className={s.box3}>
                    <Line />
                  </div>
                  <div className={s.box3}>
                    <Donut />
                  </div>
                </div>
              </div>
            ) : (
              <div className={s.mainContainer}>
                <div className={s.topSection}>
                  <div className={s.box2}>
                    <Line />
                  </div>
                  <div className={s.box2}>
                    <Donut />
                  </div>
                </div>
                <div className={s.botSection}>
                  <div className={s.tableContainer}>
                    <table>
                      <thead>
                        <tr className={s.sticky}>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Lastname</th>
                          {/* 													<th>Email</th> */}
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersMini.map((u) => {
                          return (
                            <tr key={u.ID}>
                              <td className={s.tdUs}>{u.ID}</td>
                              <td className={s.tdUs}>{u.username}</td>
                              <td className={s.tdUs}>{u.name}</td>
                              <td className={s.tdUs}>{u.surname}</td>
                              {/* 															<td className={s.td}>{u.email}</td> */}
                              <td
                                className={`${s.tdUs} ${
                                  u.enabled ? s.spanActive : s.spanSuspended
                                }`}
                              >
                                {u.enabled ? "active" : "suspended"}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <div className={s.tableContainer}>
                    <table>
                      <thead>
                        <tr className={s.sticky}>
                          <th>PayID</th>
                          <th>Items</th>
                          {/* 													<th>UserID</th> */}
                          <th>Username</th>
                          <th>Buy Date</th>
                          <th>Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paymentsMini.map((p) => {
                          return (
                            <tr key={p.ID}>
                              <td className={s.td}>
                                <Link to={`/dashboard/payment/${p.ID}`}>
                                  {p.ID}
                                </Link>
                              </td>
                              <td className={s.td}>
                                {p.purchasedBooks.length}
                              </td>
                              {/* 															<td className={s.td}>{p.userInfo.userID}</td> */}
                              <td className={s.td}>{p.userInfo.username}</td>
                              <td className={s.td}>
                                {new Date(p.purchaseDate).toLocaleDateString(
                                  "es-ES"
                                )}
                              </td>
                              <td className={s.td}>
                                $
                                {new Intl.NumberFormat("es-ES", {
                                  maximumFractionDigits: 2,
                                  minimumFractionDigits: 2,
                                }).format(
                                  p.purchasedBooks.reduce((ac, el) => ({
                                    price: ac.price + el.price,
                                  })).price
                                )}
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    </div>
  );
}

export default Dashboard;
