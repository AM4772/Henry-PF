import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import s from "./UserMenu.module.sass";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useSelector } from "react-redux";

function UserMenu(props) {
  const { userProfile } = useSelector((state) => state.profile);
  const [logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (userProfile.email) {
      setLogged(true);
    }
  }, [userProfile]);
  return (
    <div className={s.container}>
      {logged ? (
        <>
          <div className={s.userLinks}>
            <span className={s.links} onClick={() => setOpen(!open)}>
              <FaUserCircle className={s.icon} />
            </span>
            <hr className={s.divisor} />
            <Link to="/">
              <span className={s.links} onClick={() => setOpen(!open)}>
                <FaShoppingCart className={s.icon} />
              </span>
            </Link>
          </div>
          {open && (
            <div className={s.profMenu}>
              <ul>
                <Link to="/profile">
                  <li>
                    <span onClick={() => setOpen(!open)}>Profile</span>
                    <span></span>
                  </li>
                </Link>
                <Link to="/favourites">
                  <li onClick={() => setOpen(!open)}>Favourites</li>
                </Link>
                <Link to="/purchases">
                  <li onClick={() => setOpen(!open)}>Purchase's history</li>
                </Link>
                <li onClick={() => setLogged(!logged)}>
                  <span onClick={() => setOpen(!open)}>Log out</span>
                  <span>
                    <BiLogOut className={s.ico} />
                  </span>
                </li>
              </ul>
            </div>
          )}
        </>
      ) : (
        <div className={s.visitLinks}>
          <Link to="/login">
            <span className={s.visitText}>Log in</span>
          </Link>
          <hr className={s.divisor} />
          <Link to="/register">
            <span className={s.visitText}>Register</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
