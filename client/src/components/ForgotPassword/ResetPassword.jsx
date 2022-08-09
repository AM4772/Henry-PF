import React, { useEffect, useState } from "react";
import s from "./ForgotPassword.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { asyncNewPassword } from "../../redux/actions/usersActions";
import { FaEye } from "react-icons/fa";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isValidInitialState = {
    password: "",
    rpassword: "",
  };

  const [password, setPassword] = useState("");
  const [rpassword, setRpassword] = useState("");
  const [isValid, setIsvalid] = useState(isValidInitialState);
  const [isPending, setIsPending] = useState(false);
  const [isAllowed, setIsAllowed] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  const [rpasswordShown, setRPasswordShown] = useState(false);

  const { userIDreset } = useSelector((state) => state.profile);

  useEffect(() => {
    const isValidCopy = { ...isValid };
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
    let counter = 0;
    for (let err in isValidCopy) {
      if (isValidCopy[err]) counter++;
    }
    if (!counter) setIsAllowed(true);
    else if (counter) setIsAllowed(false);
    return () => {
      setIsAllowed(false);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [password, rpassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsPending(true);
    ////////////////////DISPATCH!!!!!!!!!!!!!!!!!!!!
    dispatch(asyncNewPassword(userIDreset, password, rpassword)).then((res) => {
      if (res) {
        history.push("/login");
        setPassword("");
        setRpassword("");
        setIsvalid(isValidInitialState);
        setIsAllowed(false);
        setIsPending(false);
      } else setIsPending(false);
    });
  };

  const handleButton = () => {
    if (isPending)
      return (
        <p id={s.waiting} className="buttons">
          Resetting password...
        </p>
      );
    else if (isAllowed)
      return (
        <button id={s.active} className={`buttons`}>
          Reset password
        </button>
      );
    else
      return (
        <p id={s.waiting} className="buttons">
          Reset password
        </p>
      );
  };

  return (
    <div className={s.forgotPsw}>
      <div className={s.card}>
        <form onSubmit={handleSubmit}>
          <h1 className={s.title}>Reset your password</h1>
          <div className={s.info}>
            <div>
              <label className={s.mail}>New password:</label>
              <input
                className={s.input}
                type={passwordShown ? "text" : "password"}
                value={password}
                placeholder="New password"
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
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
            <div>
              <label className={s.mail}>Repeat password:</label>
              <input
                className={s.input}
                type={rpasswordShown ? "text" : "password"}
                value={rpassword}
                placeholder="Repeat password"
                onChange={(e) => setRpassword(e.target.value)}
              />{" "}
              <FaEye
                className={s.fatEye}
                onClick={() => setRPasswordShown(!rpasswordShown)}
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
              <div id="button-handler">{handleButton()}</div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
