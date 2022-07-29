import React, { useState, useEffect } from "react";
import { FaQuestionCircle, FaEye } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import s from "./ProfileEdit.module.sass";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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
    lastName: yup
      .string()
      .matches(
        /^([A-Z-a-z]+([ ]?[a-z]?['-]?[A-Z-a-z]+)*)$/,
        "Lastname cannot contain symbols."
      )
      .required("Lastname is required.")
      .min(3, "Lastname must be at least 3 characters.")
      .max(20, "Lastname must be at most 20 characters."),
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
  let lastNameCapitalize = [];
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
      name: "lastName",
      placeholder: "Lastname",
      label: "Lastname:",
      value: lastNameCapitalize.join(" "),
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
        input[4].value.length < 8
      ) {
        error = true;
        setPassError({
          password:
            input[4].value.length < 8
              ? "Password must be at least 8 characters."
              : "",
          newPassword:
            input[4].value !== "" && input[5].value === "" ? " " : "",
        });
      } else if (input[5].value.length < 8) {
        error = true;
        setPassError({
          ...passError,
          newPassword: "New password must be at least 8 characters.",
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
          lastName: input[2].value,
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
        lastName: input[2].value,
        email: input[3].value,
        password: "",
        newPassword: "",
        editPassword: false,
      };
    }
    // dispatch(asyncModifyUser(request));
  }
  function handleChangeType(e, id) {
    e.preventDefault();
    setInput([
      ...input,
      (input[id].type = input[id].type === "password" ? "text" : "password"),
      // editPassword: false,
    ]);
  }

  function handleChange(e, id, name) {
    e.preventDefault();
    const { onChange } = register(name);
    onChange(e);
    setInput([
      ...input,
      (input[id].value = e.target.value),
      // editPassword: false,
    ]);
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
                    className={s.input}
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
                  <span className={s.errors}>{passError.password}</span>
                ) : null}
                {inp.name === "newPassword" ? (
                  <span className={s.errors}>{passError.newPassword}</span>
                ) : null}
                <span className={s.errors}>{errors[inp.name]?.message}</span>
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
