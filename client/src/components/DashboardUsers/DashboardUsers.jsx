import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./DashboardUsers.module.sass";
import { asyncGetUsers } from "../../redux/actions/usersActions";

function DashboardUsers() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncGetUsers());
  }, [dispatch]);
  return (
    <div className={s.userBoard}>
      <div className={s.top}>
        <h1>Usuarios</h1>
        <span>Searchbar</span>
      </div>
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
            {users.map((u) => {
              return (
                <tr key={u.ID}>
                  <td>{u.ID}</td>
                  <td>{u.username}</td>
                  <td>{u.name}</td>
                  <td>{u.surname}</td>
                  <td>{u.mail}</td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DashboardUsers;
