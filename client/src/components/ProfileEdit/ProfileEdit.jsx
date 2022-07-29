import React, { useState, useEffect } from "react";
import { FaQuestionCircle, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import s from "./ProfileEdit.module.sass";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { asyncModifyUser } from "../../redux/actions/usersActions";
// import { useHistory } from "react-router-dom";
const schema = yup
  .object()
  .shape({
    username: yup
      .string()
      .required("Username is required.")
      .matches(
        /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/,
        "Username cannot contain symbols or whitespaces."
      )
      .min(3, "Username must be at least 3 characters.")
      .max(20, "Username must be at most 20 characters."),
    name: yup
      .string()
      .matches(
        /^([A-Z-a-z]+([ ]?[a-z]?['-]?[A-Z-a-z]+)*)$/,
        "Name cannot contain symbols."
      )
      .required("Name is required.")
      .min(3, "Name must be at least 3 characters.")
      .max(20, "Name must be at most 20 characters."),
    surname: yup
      .string()
      .matches(
        /^([A-Z-a-z]+([ ]?[a-z]?['-]?[A-Z-a-z]+)*)$/,
        "surname cannot contain symbols."
      )
      .required("surname is required.")
      .min(3, "surname must be at least 3 characters.")
      .max(20, "surname must be at most 20 characters."),
    email: yup
      .string()
      .email("E-mail is invalid.")
      .matches(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "E-mail is invalid."
      )
      .required("E-mail is required."),
    password: yup.string().max(20, "Password must be at most 20 characters."),
    newPassword: yup
      .string()
      .max(20, "New password must be at most 20 characters."),
  })
  .required();

function ProfileEdit() {
  // const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(schema),
  });
  //waiting backend
  const dispatch = useDispatch();
  const { userProfile } = useSelector((state) => state.profile);

  let nameCapitalize = [];
  let surnameCapitalize = [];
  if (userProfile.name) {
    let nameSplitted = userProfile.name.split(" ");
    nameCapitalize = nameSplitted.map(
      (n) => n.charAt(0).toUpperCase() + n.slice(1)
    );
  }
  if (userProfile.surname) {
    let surnameSplitted = userProfile.surname.split(" ");
    surnameCapitalize = surnameSplitted.map(
      (n) => n.charAt(0).toUpperCase() + n.slice(1)
    );
  }
  const [input, setInput] = useState([
    {
      pos: 0,
      type: "text",
      name: "username",
      placeholder: "Username",
      label: "Username:",
      value: userProfile.username,
    },
    {
      pos: 1,
      type: "text",
      name: "name",
      placeholder: "Name",
      label: "Name:",
      value: nameCapitalize.join(" "),
    },
    {
      pos: 2,
      type: "text",
      name: "surname",
      placeholder: "surname",
      label: "surname:",
      value: surnameCapitalize.join(" "),
    },
    {
      pos: 3,
      type: "text",
      name: "email",
      placeholder: "E-mail",
      label: "E-mail:",
      value: userProfile.email,
    },
    //=========
    // Chequear el tema de la verif de password,
    {
      pos: 4,
      type: "password",
      name: "password",
      placeholder: "Password",
      label: "Password:",
      value: "",
    },
    {
      pos: 5,
      type: "password",
      name: "newPassword",
      placeholder: "New password",
      label: "New password:",
      value: "",
    },
  ]);
  const [passError, setPassError] = useState({
    password: "",
    newPassword: "",
  });
  function validatePassword() {
    if (input[4].value !== "" || input[5].value !== "") {
      var error = false;
      if (input[5].value !== "" && input[4].value === "") {
        error = true;
        setPassError({
          ...passError,
          newPassword: "You must first type your current password.",
        });
        return;
      }
      if (
        (input[4].value !== "" && input[5].value === "") ||
        input[4].value.length < 8 ||
        input[5].value.length < 8
      ) {
        error = true;
        setPassError({
          password:
            input[4].value.length < 8
              ? "Password must be at least 8 characters."
              : "",
          newPassword:
            input[4].value !== "" && input[5].value === ""
              ? " "
              : input[5].value.length < 8
              ? "New password must be at least 8 characters."
              : "",
        });
      }
      if (!error) {
        setPassError({
          password: "",
          newPassword: "",
        });
      }
    } else {
      setPassError({
        password: "",
        newPassword: "",
      });
    }
  }
  useEffect(() => {
    validatePassword();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [input]);
  function onSubmit(data) {
    var request;
    if (input[4].value !== "") {
      validatePassword();
      if (passError.password === "" && passError.newPassword === "") {
        request = {
          username: input[0].value,
          name: input[1].value,
          surname: input[2].value,
          email: input[3].value,
          password: input[4].value,
          newPassword: input[5].value,
          editPassword: true,
        };
      }
    } else {
      request = {
        username: input[0].value,
        name: input[1].value,
        surname: input[2].value,
        email: input[3].value,
        password: "",
        newPassword: "",
        editPassword: false,
      };
    }
    dispatch(asyncModifyUser(userProfile.ID, request)).then((r) => {
      if (r) {
        window.location.reload();
      }
    });
  }
  function handleChangeType(e, id) {
    e.preventDefault();
    setInput([
      ...input,
      (input[id].type = input[id].type === "password" ? "text" : "password"),
    ]);
  }

  function handleChange(e, id, name) {
    e.preventDefault();
    const { onChange } = register(name);
    onChange(e);
    setInput([...input, (input[id].value = e.target.value)]);
  }
  return (
    <>
      <div className={s.data}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {input.map((inp, key) =>
            inp.name ? (
              <div className={s.section} key={key}>
                <span>
                  {inp.label} <FaQuestionCircle />
                </span>
                <div>
                  <input
                    type={inp.type}
                    value={inp.value}
                    className={`${s.input} ${
                      errors[inp.name]?.message
                        ? errors[inp.name]?.message === ""
                          ? ""
                          : s.inputError
                        : ""
                    } ${
                      inp.name === "password"
                        ? passError.password === ""
                          ? ""
                          : s.inputError
                        : ""
                    } ${
                      inp.name === "newPassword"
                        ? passError.newPassword === ""
                          ? ""
                          : s.inputError
                        : ""
                    }`}
                    {...register(inp.name, { required: true })}
                    onChange={(e) => handleChange(e, inp.pos, inp.name)}
                  />
                  {inp.name === "password" ? (
                    <FaEye
                      className={s.eye}
                      onClick={(e) => handleChangeType(e, inp.pos)}
                    />
                  ) : inp.name === "newPassword" ? (
                    <FaEye
                      className={s.eye}
                      onClick={(e) => handleChangeType(e, inp.pos)}
                    />
                  ) : null}
                </div>
                {inp.name === "password" ? (
                  <p
                    className={`${s.errors} ${
                      passError.password === "" ? s.errorsDisable : null
                    }`}
                  >
                    {passError.password}
                  </p>
                ) : null}
                {inp.name === "newPassword" && passError !== " " ? (
                  <p
                    className={`${s.errors} ${
                      passError.newPassword.length <= 1 ? s.errorsDisable : null
                    }`}
                  >
                    {inp.name === "newPassword"
                      ? passError.newPassword !== " "
                        ? passError.newPassword
                        : ""
                      : ""}
                  </p>
                ) : null}
                <p
                  className={`${s.errors} ${
                    errors[inp.name]?.message
                      ? errors[inp.name]?.message === ""
                        ? s.errorsDisable
                        : null
                      : s.errorsDisable
                  }`}
                >
                  {errors[inp.name]?.message
                    ? errors[inp.name]?.message.length > 0
                      ? errors[inp.name]?.message
                      : null
                    : null}
                </p>
              </div>
            ) : null
          )}
          <button className="buttons">Save changes</button>
        </form>
      </div>
    </>
  );
}

export default ProfileEdit;
