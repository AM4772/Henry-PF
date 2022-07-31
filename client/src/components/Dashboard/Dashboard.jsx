import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../Sidebar/Sidebar";
import s from "./Dashboard.module.sass";
import UsersBoard from "../DashboardUsers/DashboardUsers";
import { asyncGetUsers } from "../../redux/actions/usersActions";
import Payments from "../Payments/Payments";
import CreateBook from "../CreateBook/CreateBook";
import { Line, Donut, Graph } from "../Analytics/Analytics";
import { useHistory } from "react-router-dom";

function Dashboard() {
  const { users } = useSelector((state) => state.users);
  const { userProfile } = useSelector((state) => state.profile);
  const usersMini = users.slice(0, 4);
  const history = useHistory();
  const dispatch = useDispatch();
  const { currentSection } = useSelector((state) => state.dashboard);
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
              <>
								<Graph/>
								<Line />
								<Donut />
							</>
            ) : (
              <div className={s.mainContainer}>
                <div className={s.topSection}>Top side</div>
                <div className={s.botSection}>
                  <div className={s.tableContainer}>
                    <table>
                      <thead>
                        <tr className={s.sticky}>
                          <th>ID</th>
                          <th>Username</th>
                          <th>Name</th>
                          <th>Lastname</th>
                          <th>Email</th>
                          <th>Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {usersMini.map((u) => {
                          return (
                            <tr key={u.ID}>
                              <td className={s.td}>{u.ID}</td>
                              <td className={s.td}>{u.username}</td>
                              <td className={s.td}>{u.name}</td>
                              <td className={s.td}>{u.surname}</td>
                              <td className={s.td}>{u.email}</td>
                              <td className={s.td}></td>
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