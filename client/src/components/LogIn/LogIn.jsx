import React, { useState, useEffect } from 'react';
import s from './LogIn.module.sass';

function LogIn(props) {
  const isValidInitialState = {
    emailOrUsername: '',
    password: '',
  };
  const [isValid, setIsvalid] = useState(isValidInitialState);
  const [refresh, setRefresh] = useState(0);
  const [isAllowed, setIsAllowed] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isPending, setIsPending] = useState(false);
  useEffect(() => {
    setRefresh(refresh + 1)
    // Assign possible errors
    const isValidCopy = { ...isValid };
    // Username
    if (refresh === 0) {} // Skip
    else {
      if (!emailOrUsername.length) isValidCopy.emailOrUsername = 'Email or username is required';
      else if (emailOrUsername.length < 3 || emailOrUsername.length > 50) isValidCopy.emailOrUsername = 'Email or username is invalid';
      else delete isValidCopy.emailOrUsername;
      // Password validation
      if (!password.length) isValidCopy.password = 'Password is required';
      else if (password.length < 8 || password.length > 30) isValidCopy.password = 'Password must contain between 8-30 characters';
      else delete isValidCopy.password;
    }
    setIsvalid(isValidCopy);
    // Check if its valid
    let counter = 0;
    for (let err in isValidCopy) {
      if (isValidCopy[err]) counter++;
    }
    if (!counter) setIsAllowed(true);
    else if (counter) setIsAllowed(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [emailOrUsername, password]);
  const handleSubmit = async e => {
    e.preventDefault();
    // const values = { emailOrUsername, password };
    // try {
    //   setIsPending(true);
    //   const response = await axios.post(
    //     '/recipes',
    //     values
    //   );
    //   setIsPending(false);
    //   setServerResponse(response.request.statusText);
    // } catch (error) {
    //   setIsPending(false);
    //   setServerResponse(error.response.data);
    // }
  };
  const handleButton = () => {
    if (!isPending && isAllowed && refresh !== 1) return <button className='buttons'>Log In</button>;
    else if (isPending) return <p className='buttons' id={s.waiting}>Logging In...</p>;
    else return <p className='buttons' id={s.waiting}>Log In</p>;
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
          <h1 id={s.register}>Login</h1>
          <div id={s.creationCardDisplay}>
            <div id="creation-card1">
              <div id="stuff">
                <div className={s.inline}>
                  <label className="t-card">Email/Username: </label>
                  <input
                    type="text"
                    value={emailOrUsername}
                    className={s.input}
                    onChange={e => setEmailOrUsername(e.target.value)}
                    placeholder="Email/Username"
                  ></input>{' '}
                    <p className={isValid.emailOrUsername ? s.errorMessage : s.noErrorMessage}>{isValid.emailOrUsername}</p>
                </div>
                <div className={s.inline}>
                  <label className="t-card">Password: </label>
                  <input
                    type="password"
                    value={password}
                    className={s.input}
                    placeholder="Password"
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

export default LogIn;
