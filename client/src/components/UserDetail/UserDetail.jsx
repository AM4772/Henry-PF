import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  asyncDisableUser,
  asyncEnableUser,
  asyncGetUserDetail,
} from "../../redux/actions/usersActions";
import { clearUserDetail } from "../../redux/reducers/usersSlice";
import Loading from "../Loading/Loading";
import s from "./UserDetail.module.sass";
import Swal from "sweetalert2";

function UserDetail(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const { ID } = useParams();
  const user = useSelector((state) => state.users.userDetail);
  const { userProfile } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(asyncGetUserDetail(ID));
    return () => dispatch(clearUserDetail());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
  function goBack() {
    history.goBack();
  }

  function handleClick() {
    if (userProfile.admin) {
      if (user.enabled) {
        if (user.suspendedTimes < 3) {
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
              dispatch(asyncDisableUser(user.ID));
            }
          });
        } else {
          Swal.fire({
            title: "Are you sure? This action is irreversible.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, ban this user permanently.",
          }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                "Banned permanently",
                "The user has been banned.",
                "success"
              );
              dispatch(asyncDisableUser(user.ID));
              history.goBack();
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
            dispatch(asyncEnableUser(user.ID));
          }
        });
      }
    }
  }

  return (
    <div className={s.userDetail}>
      {user.name ? (
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
                  {user.name && user.surname
                    ? user.name.charAt(0).toUpperCase() +
                      user.surname.charAt(0).toUpperCase()
                    : null}
                </h1>
              </div>
            </div>
            <div className={s.data}>
              <h1 className={s.title}>{user.username}</h1>
              <div className={s.item}>
                <p>Name: </p>
                <p>{user.name}</p>
              </div>
              <div className={s.item}>
                <p>Surname: </p>
                <p>{user.surname}</p>
              </div>
              <div className={s.item}>
                <p>ID: </p>
                <p>{user.ID}</p>
              </div>
              <div className={s.item}>
                <p>Email: </p>
                <p>{user.email}</p>
              </div>
              {/* <div className={s.item}>
                <p>Suspended times: </p>
                <p>{user.suspendedTimes}</p>
              </div> */}
              <div className={s.item}>
                <p>Enabled: </p>
                {/* <p>{user.enabled === "true" ? "true" : "false"}</p> */}
                <div className={s.switch}>
                  <span
                    onClick={(e) => handleClick(e)}
                    className={
                      user.enabled === true
                        ? `${s.sliderEnabled} ${s.slider}`
                        : `${s.sliderDisabled} ${s.slider}`
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
