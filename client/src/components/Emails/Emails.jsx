import React from "react";
import "./Emails.css";
import logo from "../../assets/Book_Logo.png";

const Email1 = () => {
  const username = "peurman";
  const name = "Esteban";
  const imgUrl =
    "https://images-na.ssl-images-amazon.com/images/P/8418174099.01._SX180_SCLZZZZZZZ_.jpg";
  const title = "Harry Potter y el Prisionero de Azkaban";
  return (
    <div className="containerEmail">
      <div className="headerEmail">
        <img src={logo} className="logoEmail" alt=""></img>
        <div>
          <span className="bookStore">
            <p>Book</p>
            <p>Store</p>
          </span>
        </div>
      </div>
      <p className="thanks">
        Hi <b>{username}</b>, many thanks for buying in BookStore!
      </p>
      <p className="yourbook">
        In the attachhed PDF file you will find your book:
      </p>
      <div className="containerBookDet0">
        <div className="containerBookDet">
          <p> {title.toUpperCase()}</p>
          <img src={imgUrl} alt={title} title={title} />
        </div>
      </div>
      <p className="comeback">
        We hope you enjoy the book, and keep visiting us at{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://bookstore-rose.vercel.app/"
        >
          <b>BookStore</b>
        </a>
        !
      </p>
      {/* =================================================== */}
      <hr />
      <br />
      <p className="thanks">
        Hi <b>{username}</b>... forgot your password?
      </p>
      <p className="yourbook">
        That's okay, it happens! This is the code you will need to enter to
        reset your password:
      </p>
      <div className="containerCode0">
        <div className="containerCode1">
          <p>34FSHDFH45YK</p>
        </div>
      </div>
      <p className="yourbook">
        Please click on the button bellow to reset your password:
      </p>{" "}
      <p className="containerButtonReset">
        <button className="buttonReset">
          <a
            target="_blank"
            rel="noreferrer"
            className="aReset"
            href="https://bookstore-rose.vercel.app/"
          >
            GO ENTER CODE TO RESET PASSWORD
          </a>
        </button>
        {/* "http://localhost:3001/confirm/{{ ID }}?token={{ token }}" */}
      </p>
      <p className="comeback">
        If you did not request a new password, please let us know immediatly by
        replying this email.
      </p>
      <p className="comeback">
        We look forward to seeing you again in{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://bookstore-rose.vercel.app/"
        >
          <b>BookStore</b>
        </a>
        !
      </p>
      {/* =================================================== */}
      <hr />
      <br />
      <p className="thanks">
        Hi <b>{name}</b>, many thanks for registering in BookStore!
      </p>
      <p className="thanks">
        Your username is <b>{username}</b>
      </p>
      <p className="yourbook">
        Please click on the button bellow to confirm your account:
      </p>
      <p className="containerButtonReset">
        <button className="buttonReset">
          <a
            target="_blank"
            rel="noreferrer"
            className="aReset"
            href="https://bookstore-rose.vercel.app/"
          >
            CONFIRM ACCOUNT
          </a>
        </button>
        {/* "http://localhost:3001/login/{{ ID }}?token={{ token }}" */}
      </p>
      <p className="comeback">
        We look forward to seeing you in{" "}
        <a
          target="_blank"
          rel="noreferrer"
          href="https://bookstore-rose.vercel.app/"
        >
          <b>BookStore</b>
        </a>
        !
      </p>
      {/* =================================================== */}
      <div className="footer">
        <img src={logo} className="logoFooter" alt=""></img>
      </div>
    </div>
  );
};

export default Email1;
