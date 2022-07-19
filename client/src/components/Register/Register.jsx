import React, { useState, useEffect } from 'react';
import s from './Register.module.sass';

function Register(props) {
  const isValidInitialState = {
    name: 'Name is required',
    surname: 'Surname is required',
    username: 'Username score is required',
    image: 'Image is required',
    email: 'Email is required',
    password: 'Password is required',
  };
  const [isValid, setIsvalid] = useState(isValidInitialState);
  const [isAllowed, setIsAllowed] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setisPending] = useState(false);
  useEffect(() => {
    var urlCheck = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    var symbolsCheck = new RegExp(/[^a-zA-Z0-9\-\\/]/);
    var emailCheck = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Assign possible errors
    const isValidCopy = { ...isValid };
    // Name
    if (!name.length) isValidCopy.name = 'Name is required';
    else if (name.length < 3 || name.length > 20) isValidCopy.name = 'Name contain between 3-20 characters';
    else if (symbolsCheck.test(name)) isValidCopy.name = "Name can't contain symbols nor spaces";
    else delete isValidCopy.name;
    // Surname
    if (!surname.length) isValidCopy.surname = 'Surname is required';
    else if (surname.length < 3 || surname.length > 20) isValidCopy.surname = 'Surname needs to be between 3-20 characters';
    else if (symbolsCheck.test(surname)) isValidCopy.surname = "Surname can't contain symbols nor spaces";
    else delete isValidCopy.surname;
    // Username
    if (!username.length) isValidCopy.username = 'Username is required';
    else if (username.length < 3 || username.length > 20) isValidCopy.username = 'Username contain between 3-20 characters';
    else if (symbolsCheck.test(username)) isValidCopy.username = "Username can't contain symbols nor spaces";
    else delete isValidCopy.username;
    // Image validation
    if (!image.length) isValidCopy.image = 'Image is required';
    else if (!urlCheck.test(image)) isValidCopy.image = "Image url is unvalid";
    else delete isValidCopy.image;
    // Email validation
    if (!email.length) isValidCopy.email = 'Email is required';
    else if (!emailCheck.test(email)) isValidCopy.email = "Email is unvalid";
    else delete isValidCopy.email;
    // Password validation
    if (!password.length) isValidCopy.password = 'Password is required';
    else if (password.length < 8 || password.length > 30) isValidCopy.password = 'Password must contain between 8-30 characters';
    else delete isValidCopy.password;
    setIsvalid(isValidCopy);
    // Check if its valid
    let counter = 0;
    for (let err in isValidCopy) {
      if (isValidCopy[err]) counter++;
    }
    if (!counter) setIsAllowed(true);
    else if (counter) setIsAllowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, surname, username, image, email, password]);
  const handleSubmit = async e => {
    e.preventDefault();
    // const values = { name, surname, username, image, email, password };
    // try {
    //   setisPending(true);
    //   const response = await axios.post(
    //     '/recipes',
    //     values
    //   );
    //   setisPending(false);
    //   setServerResponse(response.request.statusText);
    // } catch (error) {
    //   setisPending(false);
    //   setServerResponse(error.response.data);
    // }
  };
  const handleButton = () => {
    if (!isPending && isAllowed) return <button id={s.submitButton}>Submit</button>;
    else if (isPending) return <p id="submitting-button">Submitting...</p>;
    else return <p id={s.errorSubmitButton}>Can't submit</p>;
  };
  // const errSuccHandler = message => {
  //   if (message === 'Created')
  //     return <p className="success">Recipe has been created!</p>;
  //   else {
  //     const messageCopy = message.charAt(0).toUpperCase() + message.slice(1);
  //     return <p className="error">{messageCopy}</p>;
  //   }
  // };
  return (
    <div id={s.toCenter}>
      <div id={s.card}>
        <form onSubmit={handleSubmit}>
          <h1 id={s.register}>Register</h1>
          <div id={s.creationCardDisplay}>
            <div id="creation-card1">
              <div id="stuff">
                <div className={s.inline}>
                  <label className="t-card" id="title-form">Name: </label>
                  <input
                    type="text"
                    value={name}
                    className={s.input}
                    onChange={e => setName(e.target.value)}
                  ></input>{' '}
                    <p className={isValid.name ? s.errorMessage : s.noErrorMessage}>{isValid.name}</p>
                </div>
                <div className={s.inline}>
                  <label className="t-card" id="title-form">Surname: </label>
                  <input
                    type="text"
                    value={surname}
                    className={s.input}
                    onChange={e => setSurname(e.target.value)}
                  ></input>{' '}
                    <p className={isValid.surname ? s.errorMessage : s.noErrorMessage}>{isValid.surname}</p>
                </div>
                <div className={s.inline}>
                  <label className="t-card" id="title-form">Username: </label>
                  <input
                    type="text"
                    value={username}
                    className={s.input}
                    onChange={e => setUsername(e.target.value)}
                  ></input>{' '}
                    <p className={isValid.username ? s.errorMessage : s.noErrorMessage}>{isValid.username}</p>
                </div>
                <div className={s.inline}>
                  <label className="t-card">Image: </label>
                  <input
                    type="text"
                    value={image}
                    className={s.input}
                    onChange={e => setImage(e.target.value)}
                  ></input>{' '}
                    <p className={isValid.image ? s.errorMessage : s.noErrorMessage}>{isValid.image}</p>
                </div>
                <div className={s.inline}>
                  <label className="t-card">Email: </label>
                  <input
                    type="text"
                    value={email}
                    className={s.input}
                    onChange={e => setEmail(e.target.value)}
                  ></input>{' '}
                    <p className={isValid.email ? s.errorMessage : s.noErrorMessage}>{isValid.email}</p>
                </div>
                <div className={s.inline}>
                  <label className="t-card">Password: </label>
                  <input
                    type="password"
                    value={password}
                    className={s.input}
                    onChange={e => setPassword(e.target.value)}
                  ></input>{' '}
                    <p className={isValid.password ? s.errorMessage : s.noErrorMessage}>{isValid.password}</p>
                </div>
              </div>
            </div>
          </div>
          <div id={s.bottomButton}>
            <div id="button-handler">{handleButton()}</div>
            {/* <div id="error-success-handler">{errSuccHandler(serverResponse)}</div> */}
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
