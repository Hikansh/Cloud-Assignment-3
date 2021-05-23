import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

import './Signup.css';

export default function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [users, setusers] = useState([]);
  const history = useHistory();

  return (
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
            id="txtUsername"
            className="modalInputField"
            type="text"
            placeholder="Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <span className="bar2"></span>
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
            // onClick={submitClicked}
          >
            Sign up
          </button>
          <br />
          <Link to="/login">Already a user? Sign In here</Link>
        </div>
      </div>
    </div>
  );
}
