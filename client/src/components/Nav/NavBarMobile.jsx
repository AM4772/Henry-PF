import React, { useEffect, useRef, useState } from "react";
import NavLinks from "./NavLinks.jsx";
import { Link, useHistory } from "react-router-dom";
import s from "./Nav.module.sass";
import SearchBar from "../SearchBar/SearchBar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import { FaShoppingCart } from "react-icons/fa";
import { BiLogOut, BiArrowBack } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../redux/reducers/profileSlice.js";
import { useAuth0 } from "@auth0/auth0-react";

export default function NavBarMobile() {
  const dispatch = useDispatch();
  const { logout, user } = useAuth0();
  const history = useHistory();
  const { userProfile, cart } = useSelector((state) => state.profile);
  const { stack } = useSelector((state) => state.history);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  function goBack() {
    var lastPath = [];
    for (let i = 0; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/favourites" &&
        stack[i] !== "/cart" &&
        stack[i] !== "/dashboard" &&
        stack[i] !== "/dashboard/payments" &&
        stack[i] !== "/dashboard/users"
      ) {
        lastPath.push(stack[i]);
      }
    }
    if (lastPath.length > 0) {
      history.push(lastPath[0]);
    } else {
      history.push("/");
    }
  }
  const nav = useRef(null);
  function closeList(e) {
    if (nav.current && open && !nav.current.contains(e.target)) {
      setOpen(false);
    }
  }
  document.addEventListener("mousedown", closeList);
  function handleLogOut() {
    dispatch(logOut());
    setOpen(false);
    if (user) {
      setTimeout(() => {
        logout({ returnTo: `http://localhost:3000` });
      }, 2100);
    }
    goBack();
  }
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);
  return (
    <div>
      <nav ref={nav} className={`${s.navMobile} ${open ? s.openHam : null}`}>
        <div className={s.closeNav}>
          <BiArrowBack onClick={() => setOpen(false)} />
        </div>
        {userProfile.username ? (
          <ul>
            <li className={s.logoCont}>
              <NavLinks open={true} setOpen={setOpen} setInput={setInput} />
            </li>
            <Link
              title="Profile"
              onClick={() => setOpen(false)}
              to={"/profile"}
            >
              <li className={s.profile}>
                {userProfile.image ? (
                  <img
                    src={userProfile.image}
                    alt={userProfile.username}
                    title={userProfile.username}
                  />
                ) : (
                  <div>
                    <div className={s.imageCont}>
                      <div title={userProfile.username} className={s.noIMG}>
                        {userProfile.name
                          ? userProfile.name.charAt(0).toUpperCase() +
                            userProfile.surname.charAt(0).toUpperCase()
                          : null}
                      </div>
                    </div>
                  </div>
                )}
                <span>{userProfile.username}</span>
              </li>
            </Link>
            {userProfile.admin ? (
              <div className={s.admincont}>
                <Link onClick={() => setOpen(false)} to="/dashboard">
                  <li className={s.admin}>
                    <span>Dashboard</span>
                  </li>
                </Link>
                <Link onClick={() => setOpen(false)} to="/createbook">
                  <li className={s.admin}>
                    <span>Create book</span>
                  </li>
                </Link>
              </div>
            ) : null}
            <li className={s.li}>
              <Link onClick={() => setOpen(false)} to={"/favourites"}>
                Favourites
              </Link>
            </li>
            <li className={s.li}>
              <Link onClick={() => setOpen(false)} to={"/purchases"}>
                Purchase history
              </Link>
            </li>
            <li className={s.liLO} onClick={() => handleLogOut()}>
              <span>Log out</span>

              <BiLogOut />
            </li>
          </ul>
        ) : (
          <div>
            <ul>
              <li className={s.logoCont}>
                <NavLinks open={true} setOpen={setOpen} setInput={setInput} />
              </li>
              <Link onClick={() => setOpen(false)} to={"/login"}>
                <li className={s.li}>Login</li>
              </Link>
              <Link onClick={() => setOpen(false)} to={"/register"}>
                <li>Register</li>
              </Link>
            </ul>
          </div>
        )}
      </nav>
      <div
        className={`${s.mobileContSearch} ${
          /.+(?=\/home$).+/.test(window.location.href) ? null : s.searchHome
        }`}
      >
        <button className={s.hamburguer} onClick={() => setOpen(true)}>
          <GiHamburgerMenu />
        </button>
        <SearchBar input={input} setInput={setInput} />
        {userProfile.ID ? (
          <Link to="/cart">
            <span className={s.links}>
              <FaShoppingCart className={s.icon} />
              {cart.length ? (
                <p className={s.cartNumber}>
                  {cart.length < 10 && cart.length >= 1 ? cart.length : "9+"}
                </p>
              ) : undefined}
            </span>
          </Link>
        ) : (
          <Link to="/login">
            <span className={s.links}>
              <FaShoppingCart className={s.icon} />
            </span>
          </Link>
        )}
      </div>
    </div>
  );
}
