import React from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../assets/Book_Logo.png';
import { AiOutlineMail } from 'react-icons/ai';
import s from './Footer.module.sass';

export default function Footer() {
  return (
    <footer id={s.footer}>
      <div id={s.logoAndImage}>
        <img src={logo} id={s.logo} alt=""></img>
        <div>
          <h3 id={s.book} className={s.bookStore}>
            Book
          </h3>
          <h3 id={s.store} className={s.bookStore}>
            Store
          </h3>
        </div>
      </div>
      <div id={s.emailContainer}>
        <AiOutlineMail id={s.mail} />
        <NavLink id={s.email} to="/contact">
          Contact us
        </NavLink>
      </div>
    </footer>
  );
}
