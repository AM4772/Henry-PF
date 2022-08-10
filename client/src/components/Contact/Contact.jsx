import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { asyncSendContactEmail } from "../../redux/actions/contactActions";
import s from "./Contact.module.sass";
import Swal from "sweetalert2";

export default function Contact() {
  const dispatch = useDispatch();
  const isValidInitialState = {
    sender: "",
    message: "",
  };
  const infoInitialState = {
    title: "Feedback",
    sender: "",
    message: "",
  };
  const [info, setInfo] = useState(infoInitialState);
  const [isValid, setIsValid] = useState(isValidInitialState);
  const [isAllowed, setIsAllowed] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    var emailCheck = new RegExp(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
    const isValidCopy = { ...isValid };
    // Email
    if (!info.sender.length) isValidCopy.sender = " ";
    else if (!emailCheck.test(info.sender))
      isValidCopy.sender = "Email is unvalid";
    else if (info.sender.length < 3 || info.sender.length > 50)
      isValidCopy.sender = "Email is invalid";
    else delete isValidCopy.sender;
    // Message
    if (!info.message.length) isValidCopy.message = " ";
    else if (info.message.length < 16 || info.message.length > 120)
      isValidCopy.message = "Message must contain between 16-120 characters";
    else delete isValidCopy.message;
    setIsValid(isValidCopy);
    // Check if its valid
    var size = Object.keys(isValidCopy).length;
    if (!size) setIsAllowed(true);
    else if (size) setIsAllowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isAllowed) {
      Swal.fire({
        title: "You're going to send us an email, are you sure?",
        icon: "info",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Send email",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(asyncSendContactEmail(info)).then((res) => {
            if (res) {
              setInfo(infoInitialState);
            }
          });
        }
      });
    }
  };
  const handleButton = () => {
    if (isPending)
      return (
        <p className="buttons" id={s.waiting}>
          Submitting...
        </p>
      );
    else if (isAllowed) return <button className="buttons">Submit</button>;
    else
      return (
        <p className="buttons" id={s.waiting}>
          Submit
        </p>
      );
  };
  return (
    <div id={s.toCenter}>
      <div id={s.card}>
        <form onSubmit={handleSubmit}>
          <h1 id={s.register}>Contact us</h1>
          <div id={s.creationCardDisplay}>
            <div className={s.inline}>
              <select
                value={info.title}
                onChange={(e) => setInfo({ ...info, title: e.target.value })}
                className={s.selectList}
                id=""
              >
                <option value="Feedback">Feedback</option>
                <option value="Claim">Claim</option>
                <option value="Book request">Book request</option>
                <option value="Account issues">Account issues</option>
                <option value="Payments issues">Payments issues</option>
              </select>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Email: </label>
              <input
                type="text"
                placeholder="Email"
                value={info.sender}
                className={`${s.input} ${
                  isValid.sender && isValid.sender.length && info.sender
                    ? s.danger
                    : null
                }`}
                onChange={(e) => setInfo({ ...info, sender: e.target.value })}
              ></input>
              <p
                className={
                  isValid.sender && isValid.sender !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.sender}
              </p>
            </div>
            <div className={s.inline}>
              <label className={s.fillTitle}>Message: </label>
              <textarea
                type="text"
                placeholder="Message"
                value={info.message}
                className={`${s.textarea} ${
                  isValid.message && isValid.message.length && info.message
                    ? s.danger
                    : null
                }`}
                onChange={(e) => setInfo({ ...info, message: e.target.value })}
              ></textarea>
              <p
                className={
                  isValid.message && isValid.message !== " "
                    ? s.errorMessage
                    : s.noErrorMessage
                }
              >
                {isValid.message}
              </p>
            </div>
          </div>
          <div id={s.bottomButton}>{handleButton()}</div>
        </form>
      </div>
    </div>
  );
}
