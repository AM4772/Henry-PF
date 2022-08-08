import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import s from "./DashboardUsers.module.sass";
import { Link } from "react-router-dom";
import { asyncGetUsers } from "../../redux/actions/usersActions";
import SearchBarUser from "./SearchBarUser";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";
import { AiOutlineReload } from "react-icons/ai";

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
    suspendedTimes: false,
    status: false,
  });
  useEffect(() => {
    dispatch(asyncGetUsers());
    setFilterUser(users);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {}, [dispatch, search, users]);
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
  }, [search, users]);
  function sort(from) {
    if (from === "status") {
      if (sorting.status) {
        setFilterUser([
          ...filterUser.sort((a, b) => {
            if ((a.enabled && !b.enabled) || (!a.banned && b.banned)) {
              return -1;
            }
            if ((!a.enabled && b.enabled) || (a.banned && !b.banned)) {
              return 1;
            }
            return 0;
          }),
        ]);
      } else {
        setFilterUser([
          ...filterUser.sort((a, b) => {
            if ((!a.enabled && b.enabled) || (a.banned && !b.banned)) {
              return -1;
            }
            if ((a.enabled && !b.enabled) || (!a.banned && b.banned)) {
              return 1;
            }
            return 0;
          }),
        ]);
      }
    } else {
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
    }
    setSortName({ ...sorting, [from]: !sorting[from] });
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterUser]);
  function reload() {
    dispatch(asyncGetUsers());
  }
  return (
    <div className={s.userBoard}>
      <div className={s.top}>
        <h1>Users</h1>
        <div className={s.reloadCont}>
          <AiOutlineReload className={s.reload} onClick={() => reload()} />
        </div>
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
              <th className={s.sort} onClick={() => sort("status")}>
                Status
                <span>
                  {sorting.status ? <RiArrowUpSFill /> : <RiArrowDownSFill />}
                </span>
              </th>
              <th className={s.sort} onClick={() => sort("suspendedTimes")}>
                Suspensions
                <span>
                  {sorting.suspendedTimes ? (
                    <RiArrowUpSFill />
                  ) : (
                    <RiArrowDownSFill />
                  )}
                </span>
              </th>
            </tr>
          </thead>
          <tbody>
            {filterUser?.map((u) => {
              return (
                <tr key={u.ID}>
                  <td className={s.td}>
                    <Link to={`/user/${u.ID}`}>{u.ID}</Link>
                  </td>
                  <td className={s.td}>
                    <Link to={`/user/${u.ID}`}>{u.username}</Link>
                  </td>
                  <td className={s.td}>{u.name}</td>
                  <td className={s.td}>{u.surname}</td>
                  <td className={s.td}>{u.email}</td>
                  <td
                    className={`${s.td} ${
                      u.banned
                        ? s.spanSuspended
                        : u.enabled
                        ? s.spanActive
                        : s.spanSuspended
                    }`}
                  >
                    {u.banned
                      ? "banned"
                      : !u.enabled && u.suspendedTimes === 0
                      ? "unverified"
                      : u.enabled
                      ? "active"
                      : "suspended"}
                  </td>
                  <td className={s.td}>{u.suspendedTimes}</td>
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
