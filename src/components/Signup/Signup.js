import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import UserPool from '../../config/UserPool';
import { CognitoUser, CognitoUserAttribute } from 'amazon-cognito-identity-js';
import VerifyUser from './VerifyUser';
import axios from 'axios';

// import './Signup.css';

export default function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [cognitoUser, setCognitoUser] = useState(null);
  const history = useHistory();
  const writeAPI = `https://j38uh8wwy8.execute-api.us-east-2.amazonaws.com/stage-2`;

  const submitClicked = () => {
    UserPool.signUp(id, password, [], null, function (err, result) {
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      console.log(result.userSub);
      axios
        .get(`${writeAPI}?username=${result.userSub}&email=${id}`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json'
          }
        })
        .then(res => console.log(res.data.Item))
        .catch(err => console.log(err));

      setCognitoUser(result.user);
    });
  };

  return (
    <>
      <div className="main-container">
        <div className="img-div">
          <img
            alt=""
            src="https://img.icons8.com/officel/40/000000/change-user-male.png"
          />
        </div>
        <div className="login-text">
          <h1>Sign Up</h1>
        </div>
        <br />
        <div className="form-container">
          <div className="form-div">
            <input
              id="txtEmail"
              className="modalInputField"
              type="text"
              placeholder="Email"
              value={id}
              onChange={e => setId(e.target.value)}
            />
            <span className="bar1"></span>
            <br />
            <input
              id="txtPassword"
              className="modalInputField"
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <br />
            <p className="error">{error}</p>
            <button
              id="btnLogIn"
              className="btn btn-dark btn-lg"
              onClick={submitClicked}
            >
              Sign up
            </button>
            <br />
            <Link to="/login">Already a user? Sign In here</Link>
          </div>
        </div>
      </div>
      {cognitoUser && <VerifyUser user={cognitoUser} />}
    </>
  );
}
