import React from "react";
import { Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Nav from "./components/Nav/Nav";
import BookDetail from "./components/BookDetail/BookDetail";
import UserDetail from "./components/UserDetail/UserDetail";
import Searching from "./components/Searching/Searching";
import Register from "./components/Register/Register";
import Login from "./components/Login/Login";
import UserMenu from "./components/UserMenu/UserMenu";
import "./App.sass";

function App() {
  return (
    <div className="App">
      <Nav />
      <Route exact path={"/book/:ID"} component={BookDetail} />
      <Route exact path={"/user/:ID"} component={UserDetail} />
      <Route exact path={"/search"} component={Searching} />
      <Route exact path={"/register"} component={Register} />
      <Route exact path={"/login"} component={Login} />
      //to delete
      <Route exact path={"/userMenu"} component={UserMenu} />
      <Route exact path={"/"} component={Home} />
    </div>
  );
}

export default App;
