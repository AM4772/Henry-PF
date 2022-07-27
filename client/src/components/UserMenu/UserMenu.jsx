import React, { useEffect, useRef, useState } from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import s from "./UserMenu.module.sass";
import { FaShoppingCart } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/profileSlice";

function UserMenu() {
  const location = useLocation();
  const dispatch = useDispatch();
  const history = useHistory();

  const { userProfile } = useSelector((state) => state.profile);
  const profileList = useRef();
  const [logged, setLogged] = useState(false);
  const [open, setOpen] = useState(false);
  function closeList(e) {
    if (
      profileList.current &&
      open &&
      !profileList.current.contains(e.target)
    ) {
      setOpen(false);
    }
  }
  document.addEventListener("mousedown", closeList);
  useEffect(() => {
    if (userProfile.email) {
      setLogged(true);
    }
  }, [userProfile]);
  function handleLogOut() {
    dispatch(logOut());
    setLogged(false);
    setOpen(!open);
    history.push("/");
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
            <div ref={profileList} className={s.profMenu}>
              <ul>
                {userProfile.admin ? (
                  <Link onClick={() => setOpen(!open)} to="/dashboard">
                    <li>
                      <span>Dashboard</span>
                    </li>
                  </Link>
                ) : null}
                <Link onClick={() => setOpen(!open)} to="/profile">
                  <li>
                    <span>Profile</span>
                  </li>
                </Link>
                <Link onClick={() => setOpen(!open)} to="/favourites">
                  <li>Favourites</li>
                </Link>
                <Link onClick={() => setOpen(!open)} to="/purchases">
                  <li>Purchase history</li>
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
          <Link
            className={s.visitText}
            to={{ pathname: `/login`, state: location.pathname }}
          >
            Log in
          </Link>
          <hr className={s.divisor} />
          <Link className={s.visitText} to="/register">
            Register
          </Link>
        </div>
      )}
    </div>
  );
}

export default UserMenu;
