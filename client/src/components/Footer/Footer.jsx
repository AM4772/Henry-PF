import React from 'react'
import s from './Footer.module.sass'
import logo from '../../assets/Book_Logo.png'
import {AiOutlineMail} from 'react-icons/ai'

export default function Footer() {
  return (
    <footer id={s.footer}>
      <div id={s.logoAndImage}>
        <img src={logo} id={s.logo} alt=''></img>
        <div>
          <h3 id={s.book} className={s.bookStore}>Book</h3>
          <h3 id={s.store} className={s.bookStore}>Store</h3>
        </div>
      </div>
      <div id={s.emailContainer}>
        <AiOutlineMail id={s.mail}/>
        <a id={s.email} href='mailto:final.proyect.henry@gmail.com'>final.project.henry@gmail.com</a>
      </div>
    </footer>
  )
}
