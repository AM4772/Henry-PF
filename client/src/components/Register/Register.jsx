import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { asyncRegisterUser } from "../../redux/actions/usersActions";
import s from "./Register.module.sass";

function Register(props) {
  const dispatch = useDispatch();
  const history = useHistory();
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
  useEffect(() => {
    if (userProfile.email) {
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
      var symbolsCheck = new RegExp(/[^a-zA-Z\-\\/]/);
      var usernameCheck = new RegExp(/^(?!...)(?!..$)[^\W][\w.]{0,29}$/);
      var emailCheck = new RegExp(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
      // var imageCheck = new RegExp(/(https?:\/\/.*\.(?:png|jpg|svg))/);
      // Assign possible errors
      const isValidCopy = { ...isValid };
      // Name
      if (!name.length) isValidCopy.name = " ";
      else if (name.length < 3 || name.length > 20)
        isValidCopy.name = "Name contain between 3-20 characters";
      else if (symbolsCheck.test(name))
        isValidCopy.name = "Name can't contain symbols, spaces nor numbers";
      else delete isValidCopy.name;
      // Surname
      if (!surname.length) isValidCopy.surname = " ";
      else if (surname.length < 3 || surname.length > 20)
        isValidCopy.surname = "Surname needs to be between 3-20 characters";
      else if (symbolsCheck.test(surname))
        isValidCopy.surname =
          "Surname can't contain symbols, spaces nor numbers";
      else delete isValidCopy.surname;
      // Username
      if (!username.length) isValidCopy.username = " ";
      else if (username.length < 3 || username.length > 20)
        isValidCopy.username = "Username contain between 3-20 characters";
      else if (usernameCheck.test(username))
        isValidCopy.username =
          "Username can't contain symbols, spaces nor numbers";
      else delete isValidCopy.username;
      // Image validation
      // if (!image.length) isValidCopy.image = " ";
      // else if (!imageCheck.test(image))
      //   isValidCopy.image = "Image url is unvalid";
      // else delete isValidCopy.image;
      // Email validation
      if (!email.length) isValidCopy.email = " ";
      else if (!emailCheck.test(email)) isValidCopy.email = "Email is unvalid";
      else delete isValidCopy.email;
      // Password validation
      if (!password.length) isValidCopy.password = " ";
      else if (password.length < 8 || password.length > 30)
        isValidCopy.password = "Password must contain between 8-30 characters";
      else delete isValidCopy.password;
      // Password validation
      if (!rpassword.length) isValidCopy.password = " ";
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
  ]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const info = { name, surname, username, email, password };
    try {
      setisPending(true);
      dispatch(asyncRegisterUser(info));
      setisPending(false);
    } catch (err) {
      console.log(err);
      setisPending(false);
    }
  };
  const handleButton = () => {
    if (!isPending && isAllowed) return <button className="buttons">Register</button>;
    else if (isPending) return <p id={s.waiting} className="buttons">Registering...</p>;
    else return <p id={s.waiting} className="buttons">Register</p>;
  };
  // const errSuccHandler = message => {
  //   if (message === 'Created')
  //     return <p className="success">Recipe has been created!</p>;
  //   else {
  //     const messageCopy = message.charAt(0).toUpperCase() + message.slice(1);
  //     return <p className="error">{messageCopy}</p>;
  //   }
  // };
  return (
    <div id={s.toCenter}>
      <div id={s.card}>
        <form onSubmit={handleSubmit}>
          <h1 id={s.register}>Register</h1>
          <div id={s.creationCardDisplay}>
            <div id="creation-card1">
              <div id="stuff">
                <div className={s.inline}>
                  <label className="t-card" id="title-form">
                    Name:{" "}
                  </label>
                  <input
                    type="text"
                    value={name}
                    id={`${
                      isValid.name && isValid.name.length && count.name
                        ? s.danger
                        : null
                    }`}
                    className={s.input}
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
                  <label className="t-card" id="title-form">
                    Surname:{" "}
                  </label>
                  <input
                    type="text"
                    value={surname}
                    id={`${
                      isValid.surname && isValid.surname.length && count.surname
                        ? s.danger
                        : null
                    }`}
                    className={s.input}
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
                  <label className="t-card" id="title-form">
                    Username:{" "}
                  </label>
                  <input
                    type="text"
                    value={username}
                    id={`${
                      isValid.username &&
                      isValid.username.length &&
                      count.username
                        ? s.danger
                        : null
                    }`}
                    className={s.input}
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
                {/* <div className={s.inline}>
                  <label className="t-card">Image: </label>
                  <input
                    type="text"
                    value={image}
                    id={`${
                      isValid.image && isValid.image.length && count.image
                        ? s.danger
                        : null
                    }`}
                    className={s.input}
                    placeholder="Image"
                    onChange={(e) =>
                      setCount({ ...count, image: 1 }) ||
                      setImage(e.target.value)
                    }
                  ></input>{" "}
                  <p
                    className={
                      isValid.image && isValid.image !== " "
                        ? s.errorMessage
                        : s.noErrorMessage
                    }
                  >
                    {isValid.image}
                  </p>
                </div> */}
                <div className={s.inline}>
                  <label className="t-card">Email: </label>
                  <input
                    type="text"
                    value={email}
                    id={`${
                      isValid.email && isValid.email.length && count.email
                        ? s.danger
                        : null
                    }`}
                    className={s.input}
                    placeholder="Email"
                    onChange={(e) =>
                      setCount({ ...count, email: 1 }) ||
                      setEmail(e.target.value)
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
                  <label className="t-card">Password: </label>
                  <input
                    type="password"
                    value={password}
                    id={`${
                      isValid.password &&
                      isValid.password.length &&
                      count.password
                        ? s.danger
                        : null
                    }`}
                    className={s.input}
                    placeholder="Password"
                    onChange={(e) =>
                      setCount({ ...count, password: 1 }) ||
                      setPassword(e.target.value)
                    }
                  ></input>{" "}
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
                  <label className="t-card">Repeat password: </label>
                  <input
                    type="password"
                    value={rpassword}
                    id={`${
                      isValid.rpassword &&
                      isValid.rpassword.length &&
                      count.rpassword
                        ? s.danger
                        : null
                    }`}
                    className={s.input}
                    placeholder="Repeat password"
                    onChange={(e) =>
                      setCount({ ...count, rpassword: 1 }) ||
                      setRpassword(e.target.value)
                    }
                  ></input>{" "}
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
            </div>
          </div>
          <div id={s.bottomButton}>
            <div id="button-handler">{handleButton()}</div>
            {/* <div id="error-success-handler">{errSuccHandler(serverResponse)}</div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
