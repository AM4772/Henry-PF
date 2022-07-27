import React, { useEffect } from "react";
import { Route, useLocation } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import BookDetail from "./components/BookDetail/BookDetail";
import UserDetail from "./components/UserDetail/UserDetail";
import Searching from "./components/Searching/Searching";
import Register from "./components/Register/Register";
import LogIn from "./components/LogIn/LogIn";
import UserMenu from "./components/UserMenu/UserMenu";
import Profile from "./components/Profile/Profile";
import Favourites from "./components/Favourites/Favourites";
import Footer from "./components/Footer/Footer.jsx";
import Contact from "./components/Contact/Contact";
import CreateBook from "./components/CreateBook/CreateBook";
import "./App.sass";
import { useDispatch, useSelector } from "react-redux";
import { addStack } from "./redux/reducers/historySlice";
import { asyncAutoLogin } from "./redux/actions/usersActions";

function App() {
  const dispatch = useDispatch();
  const { stack } = useSelector((state) => state.history);
  const { firstAuto } = useSelector((state) => state.profile);
  const location = useLocation();
  useEffect(() => {
    if (location.pathname !== stack[0] || stack.length <= 0) {
      dispatch(addStack(location.pathname));
    }
    var token = localStorage.getItem("ALTKN");
    if (token) {
      if (firstAuto) {
        dispatch(asyncAutoLogin(token));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);
  return (
    <div className="App">
      <Nav />
      <Route exact path={"/book/:ID"} component={BookDetail} />
      <Route exact path={"/user/:ID"} component={UserDetail} />
      <Route exact path={"/search"} component={Searching} />
      <Route exact path={"/register"} component={Register} />
      <Route exact path={"/login"} component={LogIn} />
      <Route exact path={"/userMenu"} component={UserMenu} />
      <Route exact path={"/profile"} component={Profile} />
      <Route exact path={"/contact"} component={Contact} />
      <Route exact path={"/dashboard/createbook"} component={CreateBook} />
      <Route exact path={"/"} component={Home} />
      <Footer />
    </div>
  );
}

export default App;
