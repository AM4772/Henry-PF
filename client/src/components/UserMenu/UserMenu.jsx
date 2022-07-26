import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import s from "./UserMenu.module.sass";
import { FaShoppingCart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/profileSlice";

function UserMenu() {
  const location = useLocation();
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);
  const [logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (userProfile.email) {
      setLogged(true);
    }
  }, [userProfile]);
  function handleLogOut() {
    dispatch(logOut());
    setLogged(false);
    setOpen(!open);
  }
  return (
    <div className={s.container}>
      {logged ? (
        <>
          <div className={s.userLinks}>
            <span className={s.links} onClick={() => setOpen(!open)}>
              <div className={s.imageCont}>
                {userProfile.image ? (
                  <img
                    src={userProfile.image}
                    alt={userProfile.username}
                    title={userProfile.username}
                  />
                ) : (
                  <div className={s.noIMG}>
                    {userProfile.name
                      ? userProfile.name.charAt(0).toUpperCase() +
                        userProfile.lastName.charAt(0).toUpperCase()
                      : null}
                  </div>
                )}
              </div>
            </span>
            <hr className={s.divisor} />
            <Link to="/">
              <span className={s.links}>
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
                  <li onClick={() => setOpen(!open)}>Purchase history</li>
                </Link>
                <li onClick={() => handleLogOut()}>
                  <span>Log out</span>
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
          <Link to={{ pathname: `/login`, state: location.pathname }}>
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
