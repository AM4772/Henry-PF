import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, Link, useHistory } from "react-router-dom";
import { asyncConfirmEmail } from "../../redux/actions/usersActions";
import s from "./ConfirmEmail.module.sass";

function ConfirmEmail() {
  const dispatch = useDispatch();
  const history = useHistory();
  const { confirmMail } = useSelector((state) => state.profile);
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
        if (confirmMail) {
          history.push("/login");
        } else {
          history.push("/");
        }
      }, 5000);
    } else {
      history.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, confirmMail]);
  return (
    <div className={s.container}>
      {confirmMail ? (
        <div className={s.cont}>
          <h1>Email verified!</h1>
          <span className={s.message}>Your account is now enabled to buy!</span>
          <span className={s.redirect}>
            Now redirecting to <Link to={"/login"}>login</Link>
          </span>
        </div>
      ) : (
        <div className={s.cont}>
          <h1>An error has occurred</h1>
          <span className={s.message}>
            Try again, your account is not verified yet.
          </span>
          <span className={s.redirect}>
            Now redirecting to <Link to={"/"}>Home</Link>
          </span>
        </div>
      )}
    </div>
  );
}

export default ConfirmEmail;
