import React, { useEffect, useState } from "react";
import { Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import BookDetail from "./components/BookDetail/BookDetail";
import Cart from "./components/Cart/Cart";
import UserDetail from "./components/UserDetail/UserDetail";
import Searching from "./components/Searching/Searching";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import Profile from "./components/Profile/Profile";
import Favourites from "./components/Favourites/Favourites";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact";
import "./App.sass";
import s from "./App.module.sass";
import logo from "./assets/Book_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { addStack } from "./redux/reducers/historySlice";
import { asyncAutoLogin } from "./redux/actions/usersActions";
import Dashboard from "./components/Dashboard/Dashboard";
import PaymentDetail from "./components/PaymentDetail/PaymentDetail";
import CreateBook from "./components/CreateBook/CreateBook";
import Checkout from "./components/Checkout/Checkout";
import Success from "./components/MercadoPago/SuccessMP";
import Rejected from "./components/MercadoPago/RejectedMP";
import Pending from "./components/MercadoPago/PendingMP";
import Validate from "./components/MercadoPago/ValidateMP";
import Purchases from "./components/Purchases/Purchases";
import ConfirmEmail from "./components/ConfirmEmail/ConfirmEmail";

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const { appLoading } = useSelector((state) => state.books);
  const { appLoadingUsers } = useSelector((state) => state.users);
  const { stack } = useSelector((state) => state.history);
  const { firstAuto, appLoadingProfile } = useSelector(
    (state) => state.profile
  );
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== stack[0] || stack.length <= 0) {
      dispatch(addStack(location.pathname));
    }
    var token = localStorage.getItem("ALTKN");
    var index = document.cookie.lastIndexOf("ALTKNcookie");
    var cookie = document.cookie.slice(index).split("=");
    if (token || cookie[1]) {
      if (firstAuto) {
        dispatch(asyncAutoLogin(token ? token : cookie[1]));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  function currentPath() {
    if (location.pathname === "/register") {
      setLoading(appLoadingUsers);
    } else if (
      location.pathname === "/login" ||
      location.pathname.includes("dashboard") ||
      location.pathname.includes("book") ||
      location.pathname.includes("user") ||
      location.pathname.includes("cart") ||
      location.pathname === "/contact" ||
      location.pathname.includes("payment") ||
      location.pathname.includes("checkout") ||
      location.pathname.includes("purchase") ||
      location.pathname.includes("confirm")
    ) {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    } else if (
      location.pathname === "/profile" ||
      location.pathname === "/favourites" ||
      location.pathname === "/cart"
    ) {
      setLoading(appLoadingProfile);
    } else {
      setLoading(appLoading);
    }
  }
  useEffect(() => {
    currentPath();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appLoading, appLoadingUsers, appLoadingProfile, location]);
  useEffect(() => {}, [loading]);

  return (
    <div>
      {loading ? (
        <div className={s.loadingCont}>
          <div className={s.circleLoad}>
            <div className={s.cosito}></div>
            <img className={s.logoAnim} src={logo} alt="Book Store" />
          </div>
        </div>
      ) : null}
      <div className="App">
        <Nav />
        <Route exact path={"/confirm"} component={ConfirmEmail} />
        <Route exact path={"/checkout/validate"} component={Validate} />
        <Route exact path={"/checkout/pending"} component={Pending} />
        <Route exact path={"/checkout/rejected"} component={Rejected} />
        <Route exact path={"/checkout/success"} component={Success} />
        <Route exact path={"/checkout"} component={Checkout} />
        <Route exact path={"/book/:ID"} component={BookDetail} />
        <Route exact path={"/user/:ID"} component={UserDetail} />
        <Route exact path={"/search"} component={Searching} />
        <Route exact path={"/register"} component={Register} />
        <Route exact path={"/login"} component={LogIn} />
        <Route exact path={"/profile"} component={Profile} />
        <Route exact path={"/contact"} component={Contact} />
        <Route exact path={"/favourites"} component={Favourites} />
        <Route exact path={"/cart"} component={Cart} />
        <Route exact path={"/purchases"} component={Purchases} />
        <Route exact path={"/dashboard"} component={Dashboard} />

        <Route
          exact
          path={"/dashboard/payment/:ID"}
          component={PaymentDetail}
        />
        <Route exact path={"/createbook"} component={CreateBook} />
        <Route exact path={"/"} component={Home} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
