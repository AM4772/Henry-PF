import React, { useState, useEffect } from "react";
import { FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useHistory } from "react-router-dom";
import {
  asyncRegisterUser,
  asyncSetEmails,
  asyncSetUsernames,
} from "../../redux/actions/usersActions";
import Auth0 from "../Auth/Auth0";
import s from "./Register.module.sass";

function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const [passwordShown, setPasswordShown] = useState(false);
  const [passwordShown2, setPasswordShown2] = useState(false);
  const { stack } = useSelector((state) => state.history);
  const { userProfile } = useSelector((state) => state.profile);
  const isValidInitialState = {
    name: "",
    surname: "",
    username: "",
    email: "",
    password: "",
    rpassword: "",
  };
  const countInitialState = {
    name: 0,
    surname: 0,
    username: 0,
    email: 0,
    password: 0,
    rpassword: 0,
  };
  const [isValid, setIsvalid] = useState(isValidInitialState);
  const [count, setCount] = useState(countInitialState);
  const [isAllowed, setIsAllowed] = useState(false);
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [isPending, setisPending] = useState(false);
  const { emails, usernames } = useSelector((state) => state.users);
  const [registered, setRegistered] = useState(false);
  useEffect(() => {
    if (!emails.length) dispatch(asyncSetEmails());
    if (!usernames.length) dispatch(asyncSetUsernames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (userProfile.email || registered) {
      var lastPath = [];
      for (let i = 0; i < stack.length; i++) {
        if (stack[i] !== "/register" && stack[i] !== "/login") {
          lastPath.push(stack[i]);
        }
      }
      if (lastPath.length > 0) {
        history.push(lastPath[0]);
      } else {
        history.push("/");
      }
    } else {
      let regex = {
        symbols: new RegExp(/^([A-Z-a-z]+([ ]?[a-z]?['-]?[A-Z-a-z]+)*)$/),
        username: new RegExp(/^(?!...)(?!..$)[^\W][\w.]{0,29}$/),
        email: new RegExp(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        ),
      };
      const isValidCopy = { ...isValid };
      // Name
      if (!name.length) isValidCopy.name = " ";
      else if (name.includes("-"))
        isValidCopy.name =
          "Name can't contain symbols, numbers nor spaces at the end of the input";
      else if (name.length < 1 || name.length > 50)
        isValidCopy.name = "Name contain between 1-50 characters";
      else if (!regex.symbols.test(name))
        isValidCopy.name =
          "Name can't contain symbols, numbers nor spaces at the end of the input";
      else delete isValidCopy.name;
      // Surname
      if (!surname.length) isValidCopy.surname = " ";
      else if (surname.length < 1 || surname.length > 50)
        isValidCopy.surname = "Surname needs to be between 1-50 characters";
      else if (!regex.symbols.test(surname))
        isValidCopy.surname = "Surname can't contain symbols nor numbers";
      else delete isValidCopy.surname;
      // Username
      if (!username.length) isValidCopy.username = " ";
      else if (username.length < 3 || username.length > 20)
        isValidCopy.username = "Username contain between 3-20 characters";
      else if (username.includes(" "))
        isValidCopy.username = "Username can't contain spaces";
      else if (usernames.includes(username))
        isValidCopy.username = "Username is already taken";
      else delete isValidCopy.username;
      // Email validation
      if (!email.length) isValidCopy.email = " ";
      else if (!regex.email.test(email)) isValidCopy.email = "Email is invalid";
      else if (emails.includes(email))
        isValidCopy.email = "Email is already in use";
      else delete isValidCopy.email;
      // Password validation
      if (!password.length) isValidCopy.password = " ";
      else if (password.length < 8 || password.length > 50)
        isValidCopy.password = "Password must contain between 8-30 characters";
      else delete isValidCopy.password;
      // Repeat Password validation
      if (!rpassword.length) isValidCopy.rpassword = " ";
      else if (password !== rpassword)
        isValidCopy.rpassword = "Both passwords must be identical";
      else delete isValidCopy.rpassword;
      setIsvalid(isValidCopy);
      // Check if its valid
      let counter = 0;
      for (let err in isValidCopy) {
        if (isValidCopy[err]) counter++;
      }
      if (!counter) setIsAllowed(true);
      else if (counter) setIsAllowed(false);
    }
    return () => {
      setIsAllowed(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    name,
    surname,
    username,
    email,
    password,
    rpassword,
    isPending,
    userProfile,
    history,
    registered,
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = {
      name,
      surname,
      username,
      email,
      password,
      BASE_URL: process.env.REACT_APP_BASE_URL,
    };
    setisPending(true);
    dispatch(asyncRegisterUser(info)).then((res) => {
      if (res) {
        history.push("/login");
        setName("");
        setSurname("");
        setEmail("");
        setUsername("");
        setPassword("");
        setRpassword("");
        setCount(countInitialState);
        setIsvalid(isValidInitialState);
        setIsAllowed(false);
        setisPending(false);
        setRegistered(true);
      } else setisPending(false);
    });
  };
  const handleButton = () => {
    if (isPending)
      return (
        <p id={s.waiting} className="buttons">
          Registering...
        </p>
      );
    else if (isAllowed)
      return (
        <button id={s.active} className={`buttons`}>
          Register
        </button>
      );
    else
      return (
        <p id={s.waiting} className="buttons">
          Register
        </p>
      );
  };
  return (
    <div id={s.toCenter}>
      <div id={s.card}>
        <form onSubmit={handleSubmit}>
          <h1 id={s.register}>Register</h1>
          <div id={s.creationCardDisplay}>
            <div className={s.inline}>
              <label className={s.fillTitle}>Name: </label>
              <input
                type="text"
                value={name}
                className={`${s.input} ${
                  isValid.name && isValid.name.length && count.name
                    ? s.danger
                    : s.nejDanger
                }`}
                placeholder="Name"
                onChange={(e) =>
                  setCount({ ...count, name: 1 }) || setName(e.target.value)
                }
              ></input>{" "}
              <p
                className={
                  isValid.name && isValid.name !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.name}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Surname: </label>
              <input
                type="text"
                value={surname}
                className={`${s.input} ${
                  isValid.surname && isValid.surname.length && count.surname
                    ? s.danger
                    : s.nejDanger
                }`}
                placeholder="Surname"
                onChange={(e) =>
                  setCount({ ...count, surname: 1 }) ||
                  setSurname(e.target.value)
                }
              ></input>{" "}
              <p
                className={
                  isValid.surname && isValid.surname !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.surname}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Username: </label>
              <input
                type="text"
                value={username}
                className={`${s.input} ${
                  isValid.username && isValid.username.length && count.username
                    ? s.danger
                    : s.nejDanger
                }`}
                placeholder="Username"
                onChange={(e) =>
                  setCount({ ...count, username: 1 }) ||
                  setUsername(e.target.value)
                }
              ></input>{" "}
              <p
                className={
                  isValid.username && isValid.username !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.username}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Email: </label>
              <input
                type="text"
                value={email}
                className={`${s.input} ${
                  isValid.email && isValid.email.length && count.email
                    ? s.danger
                    : s.nejDanger
                }`}
                placeholder="Email"
                onChange={(e) =>
                  setCount({ ...count, email: 1 }) || setEmail(e.target.value)
                }
              ></input>{" "}
              <p
                className={
                  isValid.email && isValid.email !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.email}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Password: </label>
              <input
                type={passwordShown ? "text" : "password"}
                value={password}
                className={`${s.input} ${
                  isValid.password && isValid.password.length && count.password
                    ? s.danger
                    : s.nejDanger
                }`}
                placeholder="Password"
                onChange={(e) =>
                  setCount({ ...count, password: 1 }) ||
                  setPassword(e.target.value)
                }
              ></input>{" "}
              <FaEye
                className={s.fatEye}
                onClick={() => setPasswordShown(!passwordShown)}
              />
              <p
                className={
                  isValid.password && isValid.password !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.password}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Repeat password: </label>
              <input
                type={passwordShown2 ? "text" : "password"}
                value={rpassword}
                className={`${s.input} ${
                  isValid.rpassword &&
                  isValid.rpassword.length &&
                  count.rpassword
                    ? s.danger
                    : s.nejDanger
                }`}
                placeholder="Repeat password"
                onChange={(e) =>
                  setCount({ ...count, rpassword: 1 }) ||
                  setRpassword(e.target.value)
                }
              ></input>{" "}
              <FaEye
                className={s.fatEye}
                onClick={() => setPasswordShown2(!passwordShown2)}
              />
              <p
                className={
                  isValid.rpassword && isValid.rpassword !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.rpassword}
              </p>
            </div>
          </div>
          <div id={s.perroAustraliano}>
            <NavLink to="/login" id={s.linker}>
              Already registered?
            </NavLink>
          </div>
          <div className={s.bottomButton}>{handleButton()}</div>
          <div className={s.buttomButton} id={s.auth0}>
            <Auth0 />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
