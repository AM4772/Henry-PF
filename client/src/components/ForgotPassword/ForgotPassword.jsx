import React, { useState } from "react";
import s from "./ForgotPassword.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ForgotPassword() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { emails } = useSelector((state) => state.users.emails);
  const { usernames } = useSelector((state) => state.users.usernames);

  const [emailOrUsername, setEmailOrUsername] = useState("");

  //   const handleButton = () => {
  //     if (!isPending && isAllowed && refresh !== 1)
  //       return (
  //         <button className={`buttons ${s.login}`} id={s.active}>
  //           Log In
  //         </button>
  //       );
  //     else if (isPending)
  //       return (
  //         <p className="buttons" id={s.waiting}>
  //           Logging In...
  //         </p>
  //       );
  //     else
  //       return (
  //         <p className="buttons" id={s.waiting}>
  //           Log In
  //         </p>
  //       );
  //   };

  return (
    <div className={s.forgotPsw}>
      <div className={s.card}>
        <form action="">
          <h1 className={s.title}>Recover your password</h1>
          <div className={s.info}>
            <label className={s.mail}>Email/Username:</label>
            <input
              className={s.input}
              type="text"
              value={emailOrUsername}
              placeholder="Email/Username"
              onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            {/* <div id="button-handler">{handleButton()}</div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
