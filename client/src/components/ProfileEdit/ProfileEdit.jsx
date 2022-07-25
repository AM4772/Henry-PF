import React, { useState, useEffect } from "react";
import { FaQuestionCircle, FaEye, FaEyeSlash } from "react-icons/fa";
import { useSelector } from "react-redux";
import s from "./ProfileEdit.module.sass";

function ProfileEdit() {
  //waiting backend
  // const dispatch = useDispatch()
  const { userProfile } = useSelector((state) => state.profile);
  const [errors, setErrors] = useState({
    username: "",
    name: "",
    lastName: "",
    email: "",
    password: "",
    newPassword: "",
  });

  let nameCapitalize = [];
  let lastNameCapitalize = [];
  let regex = {
    username: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
    nameAndLast: /^([a-z]+([ ]?[a-z]?[a-z]+)*)$/,
    email:
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  };

  function validate() {
    if (
      input.username.length < 3 ||
      input.username.length > 20 ||
      input.username === "" ||
      !regex.username.test(input.username.replace(/^\s+|\s+$/g, ""))
    ) {
      setErrors({
        ...errors,
        username:
          input.username === ""
            ? " "
            : input.username.length < 3
            ? "Username is too short"
            : input.username.length > 20
            ? "Username is too long"
            : "Username cannot contain symbols or whitespaces",
      });
    }
    if (
      input.name.length < 3 ||
      input.name.length > 20 ||
      input.name === "" ||
      !regex.nameAndLast.test(
        input.name.toLowerCase().replace(/^\s+|\s+$/g, "")
      )
    ) {
      setErrors({
        ...errors,
        name:
          input.name === ""
            ? " "
            : input.name.length < 3
            ? "Name is too short"
            : input.name.length > 20
            ? "Name is too long"
            : "Name cannot contain symbols",
      });
    }
    if (
      input.lastName.length < 3 ||
      input.lastName.length > 20 ||
      input.lastName === "" ||
      !regex.nameAndLast.test(
        input.lastName.toLowerCase().replace(/^\s+|\s+$/g, "")
      )
    ) {
      setErrors({
        ...errors,
        lastName:
          input.lastName === ""
            ? " "
            : input.lastName.length < 3
            ? "Lastname is too short"
            : input.lastName.length > 20
            ? "Lastname is too long"
            : "Lastname cannot contain symbols",
      });
    }
    if (
      input.email === "" ||
      !regex.email.test(input.email.replace(/^\s+|\s+$/g, ""))
    ) {
      setErrors({
        ...errors,
        email: input.email === "" ? " " : "Email invalid",
      });
    }
    if (input.password !== "") {
      if (
        input.newPassword.length < 8 ||
        input.newPassword.length > 30 ||
        input.newPassword === "" ||
        input.password.length < 8 ||
        input.password.length > 30
      ) {
        setErrors({
          ...errors,
          password:
            input.password.length < 8
              ? "Password is too short"
              : input.password.length > 30
              ? "Password is too long"
              : "",
          newPassword:
            input.newPassword === ""
              ? " "
              : input.newPassword.length < 8
              ? "Password is too short"
              : input.password.length > 30
              ? "Password is too long"
              : "",
        });
      }
    }
    if (input.newPassword !== "") {
      if (input.password === "") {
        setErrors({
          ...errors,
          password: "You must first enter your password",
        });
      }
    }
    if (
      errors.username === "" &&
      errors.name === "" &&
      errors.lastName === "" &&
      errors.email === "" &&
      errors.password === "" &&
      errors.newPassword === ""
    ) {
      if (input.password !== "" && input.editPassword === false) {
        setInput({ ...input, editPassword: true });
      }
      return true;
    } else return false;
  }
  function validatePassword() {
    if (input.password !== "") {
      setInput({
        ...input,
        editPassword: true,
      });
    }
  }

  if (userProfile.name) {
    let nameSplitted = userProfile.name.split(" ");
    nameCapitalize = nameSplitted.map(
      (n) => n.charAt(0).toUpperCase() + n.slice(1)
    );
  }
  if (userProfile.lastName) {
    let lastNameSplitted = userProfile.lastName.split(" ");
    lastNameCapitalize = lastNameSplitted.map(
      (n) => n.charAt(0).toUpperCase() + n.slice(1)
    );
  }
  const [input, setInput] = useState({
    username: userProfile.username,
    name: nameCapitalize.join(" "),
    lastName: lastNameCapitalize.join(" "),
    email: userProfile.email,
    //=========
    // Chequear el tema de la verif de password,
    password: "",
    newPassword: "",
    editPassword: false,
  });
  const [passwordShown, setPasswordShown] = useState(false);
  const [newPasswordShown, setNewPasswordShown] = useState(false);

  function handleChange(e) {
    e.preventDefault();
    setErrors({ ...errors, [e.target.name]: "", newPassword: "" });
    setInput({
      ...input,
      [e.target.name]: e.target.value,
      editPassword: false,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    if (validate()) {
      validatePassword();
      /* dispatch(asyncUserEdit(input)) */
    }
  }

  useEffect(() => {
    validate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);

  return (
    <>
      <div className={s.data}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className={s.section}>
            <span>
              Username: <FaQuestionCircle />
              {/* La idea seria que con un hover en el ?*/}
            </span>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className={`${s.input} ${
                errors.username !== "" ? s.inputError : null
              }`}
              value={input.username}
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div
            className={`${s.errorsDisable} ${
              errors.username && errors.username !== " " ? s.errors : null
            }`}
          >
            {errors.username}
          </div>

          <div className={s.section}>
            <span>
              Name: <FaQuestionCircle />
            </span>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={input.name}
              className={`${s.input} ${
                errors.name !== "" ? s.inputError : null
              }`}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div
            className={`${s.errorsDisable} ${
              errors.name && errors.name !== " " ? s.errors : null
            }`}
          >
            {errors.name}
          </div>
          <div className={s.section}>
            <span>
              Surname: <FaQuestionCircle />
            </span>
            <input
              type="text"
              name="lastName"
              placeholder="Surname"
              value={input.lastName}
              className={`${s.input} ${
                errors.lastName !== "" ? s.inputError : null
              }`}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div
            className={`${s.errorsDisable} ${
              errors.lastName && errors.lastName !== " " ? s.errors : null
            }`}
          >
            {errors.lastName}
          </div>
          <div className={s.section}>
            <span>
              E-mail: <FaQuestionCircle />
            </span>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={input.email}
              className={`${s.input} ${
                errors.email !== "" ? s.inputError : null
              }`}
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div
            className={`${s.errorsDisable} ${
              errors.email && errors.email !== " " ? s.errors : null
            }`}
          >
            {errors.email}
          </div>
          <div className={s.section}>
            <span>
              Current password: <FaQuestionCircle />
            </span>
            <div className={s.inputDiv}>
              <input
                type={passwordShown ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={input.password}
                className={`${s.input} ${
                  errors.password !== "" ? s.inputError : null
                }`}
                onChange={(e) => handleChange(e)}
              />
              <FaEye onClick={() => setPasswordShown(!passwordShown)} />
            </div>
          </div>
          <div
            className={`${s.errorsDisable} ${
              errors.password && errors.password !== " " ? s.errors : null
            }`}
          >
            {errors.password}
          </div>
          <div className={s.section}>
            <span>
              New password: <FaQuestionCircle />
            </span>
            <div className={s.inputDiv}>
              <input
                type={newPasswordShown ? "text" : "password"}
                name="newPassword"
                placeholder="New password"
                value={input.newPassword}
                className={`${s.input} ${
                  errors.newPassword !== "" ? s.inputError : null
                }`}
                onChange={(e) => handleChange(e)}
              />
              <FaEye onClick={() => setNewPasswordShown(!newPasswordShown)} />
            </div>
          </div>
          <div
            className={`${s.errorsDisable} ${
              errors.newPassword && errors.newPassword !== " " ? s.errors : null
            }`}
          >
            {errors.newPassword}
          </div>
          <div className={s.section}>
            <button className="buttons">Save changes</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default ProfileEdit;
