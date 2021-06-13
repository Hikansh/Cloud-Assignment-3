import React, { useContext, useState, useEffect } from 'react';
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import UserPool from '../../config/UserPool';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/UserContext';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import apiUrl from '../../config/env';
import FacebookLogin from 'react-facebook-login';
import GitHubLogin from 'react-github-login';

import Button from '@material-ui/core/Button';

import './Login.css';

export default function Login() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const auth = useContext(authContext);
  const history = useHistory();
  const [users, setusers] = useState([]);
  const writeAPI = `https://j38uh8wwy8.execute-api.us-east-2.amazonaws.com/stage-2`;

  const responseFacebook = response => {
    console.log(response);
    let ud = {
      username: response.id,
      email: response.email
    };
    auth.setUser(ud);
    axios
      .get(`${writeAPI}?username=${ud.username}&email=${ud.email}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => console.log(res.data.Item))
      .catch(err => console.log(err));
    axios
      .post(apiUrl + '/user/setUser', {
        user: ud
      })
      .then(res => console.log(res));

    history.push('dashboard');
  };

  const componentClicked = data => {
    console.log(data);
  };

  const submitClicked = () => {
    const user = new CognitoUser({
      Username: id,
      Pool: UserPool
    });

    const authDetails = new AuthenticationDetails({
      Username: id,
      Password: password
    });

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log('Success', data);
        user.getUserAttributes((err, data) => {
          console.log(data);
        });
        auth.setUser(user);
        axios
          .post(apiUrl + '/user/setUser', {
            user: user
          })
          .then(res => console.log(res));
        history.push('dashboard');
      },
      onFailure: data => {
        console.log('Fail', data);
        alert(data.message);
      },
      newPasswordRequired: data => {
        console.log('password required', data);
      }
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
            <FacebookLogin
              appId="985837868828213"
              autoLoad={true}
              fields="name,email,picture"
              onClick={componentClicked}
              callback={responseFacebook}
            />

            <br />
            <Link to="/signup">Need an account? Sign Up here</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
