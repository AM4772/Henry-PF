import React, { useState } from "react";
import s from "./ForgotPassword.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [password, setPassword] = useState("");

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
          <h1 className={s.title}>Reset your password</h1>
          <div className={s.info}>
            <div>
              <label className={s.mail}>New password:</label>
              <input
                className={s.input}
                type="text"
                value={password}
                placeholder="New password"
                //   onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div id="button-handler">{handleButton()}</div> */}
            </div>
            <div>
              <label className={s.mail}>Repeat password:</label>
              <input
                className={s.input}
                type="text"
                value={password}
                placeholder="Repeat password"
                //   onChange={(e) => setPassword(e.target.value)}
              />
              {/* <div id="button-handler">{handleButton()}</div> */}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
