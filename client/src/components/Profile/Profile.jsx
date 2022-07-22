import React, { useState } from "react";
import s from "./Profile.module.sass";
import { MdOutlinePrivacyTip, MdSettings } from "react-icons/md";
import { FaUserCircle, FaWallet } from "react-icons/fa";
import ProfileEdit from "../ProfileEdit/ProfileEdit";

function Profile(props) {
  const [edit, setEdit] = useState(true);
  return (
    <div className={s.body}>
      <div className={s.container}>
        <div className={s.sections}>
          <span>
            {" "}
            <FaUserCircle /> Usuario
          </span>
          <span>
            {" "}
            <FaWallet /> Compras
          </span>
          <span>
            {" "}
            <MdOutlinePrivacyTip /> Privacidad
          </span>
          <span>
            <MdSettings onClick={() => setEdit(!edit)} />
          </span>
        </div>
        {edit ? (
          <div className={s.data}>
            <div className={s.sectionImg}>
              <div className={s.testIMG}></div>
            </div>
            <div className={s.section}>
              <span>username</span>
              <hr className={s.divisors} />
              <span>Harry popote</span>
            </div>
            <div className={s.section}>
              <span>name</span>
              <hr className={s.divisors} />
              <span>Harry</span>
            </div>
            <div className={s.section}>
              <span>surname</span>
              <hr className={s.divisors} />
              <span>Potter</span>
            </div>
            <div className={s.section}>
              <span>e-mail</span>
              <hr className={s.divisors} />
              <span>HarryStone@gmail.com</span>
            </div>
          </div>
        ) : (
          <ProfileEdit />
        )}
      </div>
    </div>
  );
}

export default Profile;
