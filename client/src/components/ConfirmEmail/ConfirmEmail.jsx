import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, Link, useHistory } from "react-router-dom";
import { asyncConfirmEmail } from "../../redux/actions/usersActions";
import s from "./ConfirmEmail.module.sass";

function ConfirmEmail() {
  const dispatch = useDispatch();
  const history = useHistory();
  function useQuery() {
    const { search } = useLocation();

    return React.useMemo(() => new URLSearchParams(search), [search]);
  }
  let query = useQuery();
  let token = query.get("token");

  useEffect(() => {
    if (token) {
      dispatch(asyncConfirmEmail(token));
      setTimeout(() => {
        history.push("/login");
      }, 5000);
    } else {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);
  return (
    <div className={s.container}>
      <div className={s.cont}>
        <h1>Email verified!</h1>
        <span className={s.message}>Your account is now enabled to buy!</span>
        <span className={s.redirect}>
          Now redirecting to <Link to={"/login"}>login</Link>
        </span>
      </div>
    </div>
  );
}

export default ConfirmEmail;
