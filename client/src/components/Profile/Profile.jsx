import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import s from "./Profile.module.sass";
import { MdOutlinePrivacyTip } from "react-icons/md";
import { FaUserCircle, FaWallet, FaUserEdit } from "react-icons/fa";
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import UserImg from "../Firebase/userImg";
function Profile(props) {
  const [edit, setEdit] = useState(true);
  const { userProfile } = useSelector((state) => state.profile);
  const { stack } = useSelector((state) => state.history);
  const history = useHistory();
  useEffect(() => {
    if (!userProfile.name) history.push("/login");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userProfile]);

  function goBack() {
    var lastPath = [];
    for (let i = 1; i < stack.length; i++) {
      if (
        stack[i] !== "/register" &&
        stack[i] !== "/login" &&
        stack[i] !== "/profile" &&
        stack[i] !== "/cart" &&
        stack[i] !== stack[0]
      ) {
        lastPath.push(stack[i]);
      }
    }
    if (lastPath.length > 0) {
      history.push(lastPath[0]);
    } else {
      history.push("/");
    }
  }

  return (
    <div className={s.containerProf0}>
      <div className={s.backButton}>
        <button className={s.buttonBack} onClick={goBack}>
          Back
        </button>
      </div>
      <div className={s.body}>
        <div className={s.container}>
          <div className={s.sections}>
            <span onClick={() => setEdit(true)}>
              {" "}
              <FaUserCircle /> User
            </span>
            <span onClick={() => history.push("/purchases")}>
              {" "}
              <FaWallet /> Purchases
            </span>
            <span>
              <MdOutlinePrivacyTip />
              Privacy
            </span>
            <span onClick={() => setEdit(false)}>
              <FaUserEdit /> Edit
            </span>
          </div>
          {edit ? (
            <div className={s.data}>
              <div className={s.sectionImg}>
                <UserImg ID={userProfile.ID} />
              </div>
              <div className={s.section}>
                <span>username</span>
                <hr className={s.divisors} />
                <span>{userProfile.username}</span>
              </div>
              <div className={s.section}>
                <span>name</span>
                <hr className={s.divisors} />
                <span>
                  {userProfile.name} {userProfile.surname}
                </span>
              </div>
              <div className={s.section}>
                <span>e-mail</span>
                <hr className={s.divisors} />
                <span>{userProfile.email}</span>
              </div>
              <div className={userProfile.admin ? s.sectionAdmin : s.section}>
                {userProfile.admin ? (
                  <>
                    <span className={s.adminTrue}>ADMIN</span>
                  </>
                ) : (
                  <>
                    <span>status</span>
                    <hr className={s.divisors} />
                    {userProfile.enabled ? (
                      <span className={s.spanActive}>active</span>
                    ) : (
                      <span className={s.spanSuspended}>suspended</span>
                    )}
                  </>
                )}
              </div>
            </div>
          ) : (
            <ProfileEdit />
          )}
        </div>
      </div>
    </div>
  );
}

export default Profile;
