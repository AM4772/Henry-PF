import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  asyncDisableUser,
  asyncEnableUser,
  asyncGetUserDetail,
  asyncSetAdmin,
} from "../../redux/actions/usersActions";
import { clearUserDetail } from "../../redux/reducers/usersSlice";
import Loading from "../Loading/Loading";
import s from "./UserDetail.module.sass";
import Swal from "sweetalert2";

function UserDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ID } = useParams();
  const { stack } = useSelector((state) => state.history);
  const { userDetail } = useSelector((state) => state.users);
  const { userProfile, appLoadingProfile } = useSelector(
    (state) => state.profile
  );

  useEffect(() => {
    if (!appLoadingProfile) {
      dispatch(asyncGetUserDetail(ID));
      if (!userProfile.admin) history.push("/");
    }
    return () => dispatch(clearUserDetail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLoadingProfile]);

  useEffect(() => {
    if (!userDetail.ID) {
      dispatch(asyncGetUserDetail(ID));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userDetail, dispatch]);
  function goBack() {
    if (stack.length <= 1) {
      history.push("/dashboard");
    } else {
      var lastPath = [];
      for (let i = 1; i < stack.length; i++) {
        if (
          stack[i] !== "/register" &&
          stack[i] !== "/login" &&
          stack[i] !== "/profile" &&
          stack[i] !== "/favourites" &&
          stack[i] !== "/createbook" &&
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
  }

  function handleClick() {
    if (userProfile.admin) {
      if (userDetail.enabled) {
        if (userDetail.suspendedTimes < 3) {
          Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, disable it!",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire("Disabled!", "The user has been disabled.", "success");
              dispatch(asyncDisableUser(userDetail.ID));
            }
          });
        } else {
          Swal.fire({
            title: `BAN USER ${userDetail.username}: this action is irreversible. Are you sure?`,
            icon: "error",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, ban this user",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "Banned permanently",
                `The user ${userDetail.username} has been banned`,
                "success"
              );
              dispatch(asyncDisableUser(userDetail.ID));
            }
          });
        }
      } else {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, enable!",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire("Enabled!", "The user has been enabled.", "success");
            dispatch(asyncEnableUser(userDetail.ID));
          }
        });
      }
    }
  }

  function handleAdmin() {
    if (userProfile.admin) {
      if (userDetail.admin) {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, disable administrator permissions",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Permissions disabled.",
              "Disabled administrator permissions.",
              "success"
            );
            dispatch(asyncSetAdmin(userDetail.ID));
          }
        });
      } else {
        Swal.fire({
          title: "Are you sure?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, enable administrator permissions.",
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire(
              "Permissions enabled.",
              "Enable administrator permissions.",
              "success"
            );
            dispatch(asyncSetAdmin(userDetail.ID));
          }
        });
      }
    }
  }

  return (
    <div className={s.userDetail}>
      {userDetail.name ? (
        <div className={s.container}>
          <div className={s.backButton}>
            <button className={s.buttonBack} onClick={goBack}>
              Back
            </button>
          </div>
          <div className={s.card}>
            <div className={s.sectionImg}>
              <div
                className={s.testIMG}
                /* style={{
									background: "#" + Math.floor(Math.random() * 999),
								}} */
              >
                <h1 className={s.noImg}>
                  {userDetail.name && userDetail.surname
                    ? userDetail.name.charAt(0).toUpperCase() +
                      userDetail.surname.charAt(0).toUpperCase()
                    : null}
                </h1>
              </div>
            </div>
            <div className={s.data}>
              <h1 className={s.title}>{userDetail.username}</h1>
              <div className={s.item}>
                <p>Name: </p>
                <p>{userDetail.name}</p>
              </div>
              <div className={s.item}>
                <p>Surname: </p>
                <p>{userDetail.surname}</p>
              </div>
              <div className={s.item}>
                <p>ID: </p>
                <p>{userDetail.ID}</p>
              </div>
              <div className={s.item}>
                <p>Email: </p>
                <p>{userDetail.email}</p>
              </div>
              <div className={s.item}>
                <p>Status: </p>
                <p
                  className={`${s.statusUser} ${
                    userDetail.banned
                      ? s.userStatusDisabled
                      : !userDetail.enabled && userDetail.suspendedTimes === 0
                      ? s.userStatusDisabled
                      : userDetail.enabled
                      ? s.userStatusActive
                      : s.userStatusDisabled
                  }`}
                >
                  {userDetail.banned
                    ? "banned"
                    : !userDetail.enabled && userDetail.suspendedTimes === 0
                    ? "unverified"
                    : userDetail.enabled
                    ? "active"
                    : "suspended"}
                </p>
              </div>
              {/* <div className={s.item}>
                <p>Suspended times: </p>
                <p>{user.suspendedTimes}</p>
              </div> */}
              {!userDetail.admin ? (
                <div className={s.item}>
                  {/* <p>{user.enabled === "true" ? "true" : "false"}</p> */}
                  <p>Enabled: </p>
                  {!userDetail.enable ? (
                    <div className={s.switch}>
                      <span
                        onClick={(e) => handleClick(e)}
                        className={
                          userDetail.enabled === true
                            ? `${s.sliderEnabled} ${s.slider}`
                            : `${s.sliderDisabled} ${s.slider}`
                        }
                      ></span>
                    </div>
                  ) : null}
                </div>
              ) : null}
              <div className={s.item}>
                <p>Type: </p>
                <div className={s.switch}>
                  <span
                    onClick={(e) => handleAdmin(e)}
                    className={
                      userDetail.admin
                        ? `${s.sliderAdmin} ${s.slider}`
                        : `${s.sliderNoAdmin} ${s.slider}`
                    }
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}

export default UserDetail;
