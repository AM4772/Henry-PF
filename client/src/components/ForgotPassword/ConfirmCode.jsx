import React, { useState } from "react";
import s from "./ForgotPassword.module.sass";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

function ConfirmCode() {
  const dispatch = useDispatch();
  const history = useHistory();

  const [code, setCode] = useState("");

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
          <h1 className={s.title}>Confirm your code</h1>
          <div className={s.info}>
            <label className={s.mail}>Confirmation code:</label>
            <input
              className={s.input}
              type="text"
              value={code}
              placeholder="Confirmation code"
              //   onChange={(e) => setEmailOrUsername(e.target.value)}
            />
            {/* <div id="button-handler">{handleButton()}</div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ConfirmCode;
