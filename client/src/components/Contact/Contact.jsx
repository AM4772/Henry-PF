import React, { useState, useEffect } from 'react';
import s from './Contact.module.sass'

export default function Contact() {
  const isValidInitialState = {
    email: '',
    message: '',
  };
  const infoInitialState = {
    email: '',
    message: '',
  };
  const [info, setInfo] = useState(infoInitialState);
  const [isValid, setIsValid] = useState(isValidInitialState);
  const [isAllowed, setIsAllowed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    var emailCheck = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
    const isValidCopy = { ...isValid };
    // Email
    if (!info.email.length) isValidCopy.email = ' ';
    else if (!emailCheck.test(info.email)) isValidCopy.email = "Email is unvalid";
    else if (info.email.length < 3 || info.email.length > 50) isValidCopy.email = 'Email is invalid';
    else delete isValidCopy.email;
    // Message
    if (!info.message.length) isValidCopy.message = ' ';
    else if (info.message.length < 16 || info.message.length > 120) isValidCopy.message = 'Message must contain between 16-120 characters';
    else delete isValidCopy.message;
    setIsValid(isValidCopy);
    // Check if its valid
    var size = Object.keys(isValidCopy).length;
    if (!size) setIsAllowed(true);
    else if (size) setIsAllowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);
  const handleSubmit = async e => {
    e.preventDefault();
  };
  const handleButton = () => {
    if (isPending) return <p className='buttons' id={s.waiting}>Submitting...</p>;
    else if (isAllowed) return <button className='buttons'>Submit</button>;
    else return <p className='buttons' id={s.waiting}>Submit</p>;
  };
  return (
    <div id={s.toCenter}>
      <div id={s.card}>
        <form onSubmit={handleSubmit}>
          <h1 id={s.register}>Contact us</h1>
          <div id={s.creationCardDisplay}>
            <div className={s.inline}>
              <label className={s.fillTitle}>Email: </label>
              <input
                type="text"
                placeholder="Email"
                value={info.email}
                className={`${s.input} ${isValid.email && isValid.email.length && info.email ? s.danger : null}`}
                onChange={e => setInfo({...info, email: e.target.value})}></input>
                <p className={isValid.email && isValid.email !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.email}</p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Message: </label>
              <textarea
                type="text"
                placeholder="Message"
                value={info.message}
                className={`${s.input} ${isValid.message && isValid.message.length && info.message ? s.danger : null}`}
                onChange={e => setInfo({...info, message: e.target.value})}></textarea>
                <p className={isValid.message && isValid.message !== ' ' ? s.errorMessage : s.noErrorMessage}>{isValid.message}</p>
            </div>
          </div>
          <div id={s.bottomButton}> {handleButton()} </div>
        </form>
      </div>
    </div>
  )
}
