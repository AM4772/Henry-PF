import React, { useEffect, useState } from "react";
import s from "./ForgotPassword.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  asyncResetCode,
  asyncSetEmails,
  asyncSetUsernames,
} from "../../redux/actions/usersActions";

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { emails, usernames } = useSelector((state) => state.users);
  const isValidInitialState = {
    emailOrUsername: "",
  };

  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [isValid, setIsvalid] = useState(isValidInitialState);
  const [isPending, setIsPending] = useState(false);
  const [refresh] = useState(0);
  const [isAllowed, setIsAllowed] = useState(false);

  useEffect(() => {
    if (!emails.length) dispatch(asyncSetEmails());
    if (!usernames.length) dispatch(asyncSetUsernames());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const isValidCopy = { ...isValid };
    if (!emailOrUsername.length) isValidCopy.emailOrUsername = " ";
    else if (
      !emails.includes(emailOrUsername) &&
      !usernames.includes(emailOrUsername)
    ) {
      isValidCopy.emailOrUsername = "Email or username doesn't exists";
    } else delete isValidCopy.emailOrUsername;
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
  }, [emailOrUsername]);

  function handleSubmit(e) {
    e.preventDefault();
    if (isAllowed) {
      setIsPending(true);
      dispatch(asyncResetCode(emailOrUsername)).then(() => {
        history.push("/confirm/reset");
        setIsPending(false);
      });
    }
  }

  const handleButton = () => {
    if (!isPending && isAllowed && refresh !== 1)
      return (
        <button className={`buttons ${s.login}`} id={s.active}>
          Send reset code
        </button>
      );
    else if (isPending)
      return (
        <p className="buttons" id={s.waiting}>
          Sending code...
        </p>
      );
    else
      return (
        <p className="buttons" id={s.waiting}>
          Send reset code
        </p>
      );
  };

  function goBack() {
    history.goBack();
  }

  return (
    <div className={s.forgotPsw}>
      <div className={s.card}>
        <div className={s.backButton}>
          <button className={s.buttonBack} onClick={goBack}>
            Back
          </button>
        </div>
        <form className={s.form} onSubmit={(e) => handleSubmit(e)}>
          <h1 className={s.title}>Recover your password</h1>
          <div className={s.info}>
            <label className={s.mail}>Email/Username:</label>
            <input
              className={s.input}
              type="text"
              value={emailOrUsername}
              placeholder="Email/Username"
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />{" "}
            <p
              className={
                isValid.emailOrUsername && isValid.emailOrUsername !== " "
                  ? s.errorMessage
                  : s.noErrorMessage
              }
            >
              {isValid.emailOrUsername}
            </p>
            <div className={s.bottomButton}>{handleButton()}</div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
