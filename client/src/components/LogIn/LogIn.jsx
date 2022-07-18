import React, { useState, useEffect } from 'react';
import s from './LogIn.module.sass';

function LogIn(props) {
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
    // Assign possible errors
    const isValidCopy = { ...isValid };
    // Name
    if (!name.length) isValidCopy.name = 'Name is required';
    else if (name.length < 6 || name.length > 30) isValidCopy.name = 'Name needs to be between 6-30 letters';
    else delete isValidCopy.name;
    // Surname
    if (!surname.length) isValidCopy.surname = 'Surname is required';
    else if (surname.length < 6 || surname.length > 30) isValidCopy.surname = 'Surname needs to be between 6-30 letters';
    else delete isValidCopy.surname;
    // Username
    if (!username.length) isValidCopy.username = 'Username is required';
    else if (username.length < 6 || username.length > 30) isValidCopy.username = 'Username needs to be between 6-30 letters';
    else delete isValidCopy.username;
    // Image validation
    if (!image.length) isValidCopy.image = 'Image is required';
    else delete isValidCopy.image;
    // Email validation
    if (!email.length) isValidCopy.email = 'Email is required';
    else delete isValidCopy.email;
    // Password validation
    if (!password.length) isValidCopy.password = 'Password is required';
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
    const values = { name, surname, username, image, email, password };
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
    if (!isPending && isAllowed)
      return <button id="submit-button">Submit</button>;
    else if (isPending) return <p id="submitting-button">Submitting...</p>;
    else return <p id="error-submit-button">Can't submit</p>;
  };
  const errSuccHandler = message => {
    if (message === 'Created')
      return <p className="success">Recipe has been created!</p>;
    else {
      const messageCopy = message.charAt(0).toUpperCase() + message.slice(1);
      return <p className="error">{messageCopy}</p>;
    }
  };
  return (
    <div id={s.card}>
      <form onSubmit={handleSubmit}>
        <div id="creation-card-display">
          <div id="creation-card1">
            <h1 id="creation-details-title">Register</h1>
            <div id="stuff">
              <div className="inline">
                <label className="t-card" id="title-form">Name:</label>
                <input
                  type="text"
                  value={name}
                  className="input"
                  onChange={e => setName(e.target.value)}
                ></input>{' '}
                {isValid.title ? (
                  <p className="error-message">{isValid.title}</p>
                ) : (
                  <p className="success-message">Valid title</p>
                )}
              </div>
              <div className="inline">
                <label className="t-card" id="title-form">Surname:</label>
                <input
                  type="text"
                  value={surname}
                  className="input"
                  onChange={e => setSurname(e.target.value)}
                ></input>{' '}
                {isValid.title ? (
                  <p className="error-message">{isValid.title}</p>
                ) : (
                  <p className="success-message">Valid title</p>
                )}
              </div>
              <div className="inline">
                <label className="t-card" id="title-form">Username:</label>
                <input
                  type="text"
                  value={title}
                  className="input"
                  onChange={e => setTitle(e.target.value)}
                ></input>{' '}
                {isValid.title ? (
                  <p className="error-message">{isValid.title}</p>
                ) : (
                  <p className="success-message">Valid title</p>
                )}
              </div>
              <div className="inline" id="image">
                <label className="t-card">Image: </label>
                <input
                  type="text"
                  value={image}
                  className="input"
                  onChange={e => setImage(e.target.value)}
                ></input>{' '}
                {isValid.image ? (
                  <p className="error-message">{isValid.image}</p>
                ) : (
                  <p className="success-message">Valid Image</p>
                )}
              </div>
              <div className="inline" id="image">
                <label className="t-card">Email: </label>
                <input
                  type="text"
                  value={image}
                  className="input"
                  onChange={e => setImage(e.target.value)}
                ></input>{' '}
                {isValid.image ? (
                  <p className="error-message">{isValid.image}</p>
                ) : (
                  <p className="success-message">Valid Image</p>
                )}
              </div>
              <div className="inline" id="image">
                <label className="t-card">Password: </label>
                <input
                  type="text"
                  value={image}
                  className="input"
                  onChange={e => setImage(e.target.value)}
                ></input>{' '}
                {isValid.image ? (
                  <p className="error-message">{isValid.image}</p>
                ) : (
                  <p className="success-message">Valid Image</p>
                )}
              </div>
            </div>
          </div>
          <div id="creation-card2">
            <h1 id="creation-details-title2">Optional</h1>
            <div className="notinline">
              <label className="t-card">Steps: </label>
              <textarea
                type="text"
                value={steps}
                className="textarea"
                onChange={e => setSteps(e.target.value)}
              ></textarea>
            </div>
          </div>
        </div>
        <div id="bottombutton">
          <div id="button-handler">{handleButton()}</div>
          <div id="error-success-handler">{errSuccHandler(serverResponse)}</div>
        </div>
      </form>
    </div>
  );
}

export default LogIn;
