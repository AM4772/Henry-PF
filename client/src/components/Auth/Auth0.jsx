import React, { useEffect } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch, useSelector } from "react-redux";
import { asyncRegisterAuth0 } from "../../redux/actions/usersActions";
import { FcGoogle } from "react-icons/fc";
import s from "./Auth0.module.sass";

function Auth0() {
  const dispatch = useDispatch();
  const { loginWithPopup, user } = useAuth0();
  const { userProfile } = useSelector((state) => state.profile);
  useEffect(() => {
    if (user && !userProfile.ID) {
      dispatch(
        asyncRegisterAuth0({
          username: user.nickname,
          name: user.given_name,
          surname: user.family_name,
          email: user.email,
          image: user.picture,
          auth_zero: true,
        })
      );
    }
  }, [user]);
  function login() {
    loginWithPopup();
  }
  return (
    <div className={`buttons ${s.auth0btn}`} onClick={login}>
      <FcGoogle />
      Continue with Google
    </div>
  );
}

export default Auth0;
