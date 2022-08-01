import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./DashboardUsers.module.sass";
import { asyncGetUsers } from "../../redux/actions/usersActions";
import SearchBarUser from "./SearchBarUser";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

function DashboardUsers() {
  const { users } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [filterUser, setFilterUser] = useState(users);
  const [sorting, setSortName] = useState({
    ID: false,
    name: false,
    surname: false,
    username: false,
    email: false,
  });
  useEffect(() => {
    if (users.length <= 0) {
      dispatch(asyncGetUsers());
      setFilterUser(users);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [dispatch, search]);
  function handleChange(e) {
    e.preventDefault();
    setSearch(e.target.value);
  }

  function filterUsers() {
    var userfilter = users.filter(
      (u) =>
        u.name
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
        u.username
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
        u.email
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
        u.surname
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
        u.ID.toString().includes(
          search
            .replace(/^\s+|\s+$/g, "")
            .replace(/\./g, "")
            .replace(/\s+/g, "")
            .toLowerCase()
        )
    );
    setFilterUser(userfilter.sort((a, b) => a.ID - b.ID));
  }
  useEffect(() => {
    filterUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);
  function sort(from) {
    if (sorting[from]) {
      setFilterUser([
        ...filterUser.sort((a, b) => {
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
      setFilterUser([
        ...filterUser.sort((a, b) => {
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
    setSortName({ ...sorting, [from]: !sorting[from] });
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUser]);
  return (
    <div className={s.userBoard}>
      <div className={s.top}>
        <h1>Users</h1>
        <span>
          <SearchBarUser onChange={handleChange} />
        </span>
      </div>
      <div className={s.tableContainer}>
        <table>
          <thead>
            <tr className={s.sticky}>
              <th className={s.sort} onClick={() => sort("ID")}>
                ID
                <span>
                  {sorting.ID ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sort} onClick={() => sort("username")}>
                Username
                <span>
                  {sorting.username ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sort} onClick={() => sort("name")}>
                Name
                <span>
                  {sorting.name ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sort} onClick={() => sort("surname")}>
                Lastname
                <span>
                  {sorting.surname ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sort} onClick={() => sort("email")}>
                Email
                <span>
                  {sorting.email ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filterUser?.map((u) => {
              return (
                <tr key={u.ID}>
                  <td className={s.td}>{u.ID}</td>
                  <td className={s.td}>{u.username}</td>
                  <td className={s.td}>{u.name}</td>
                  <td className={s.td}>{u.surname}</td>
                  <td className={s.td}>{u.email}</td>
                  <td
                    className={`${s.td} ${
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
    </div>
  );
}

export default DashboardUsers;
