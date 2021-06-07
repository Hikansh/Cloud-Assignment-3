import React, { useContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../config/UserPool';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

import Button from '@material-ui/core/Button';

import './Login.css';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(authContext);
  const history = useHistory();
  const [users, setusers] = useState([]);

  const submitClicked = () => {
    const user = new CognitoUser({
      Username: id,
      Pool: UserPool,
    });

    const authDetails = new AuthenticationDetails({
      Username: id,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (data) => {
        console.log('Success', data);
        user.getUserAttributes((err, data) => {
          console.log(data);
        });
        auth.setUser(user);
        history.push('dashboard');
      },
      onFailure: (data) => {
        console.log('Fail', data);
        alert(data.message);
      },
      newPasswordRequired: (data) => {
        console.log('password required', data);
      },
    });
  };

  return (
    <div className="body-login">
      <div className="main-container">
        <div className="img-div">
          <img
            alt=""
            src="https://img.icons8.com/cotton/48/000000/login-rounded-right--v2.png"
          />
        </div>
        <div className="login-text">
          <h1>Log In</h1>
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
              onChange={(e) => setId(e.target.value)}
            />
            <span className="bar1"></span>
            <br />
            <input
              id="txtPassword"
              className="modalInputField"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span className="bar2"></span>
            <br />
            <p className="error">{error}</p>
            <br />

            <Button
              variant="contained"
              id="btnLogIn"
              className="btn btn-dark btn-lg"
              onClick={submitClicked}
              color="secondary"
            >
              Sign In
            </Button>

            <br />
            <Link to="/signup">Need an account? Sign Up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
