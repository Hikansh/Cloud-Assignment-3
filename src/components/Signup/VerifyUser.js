import React, { useState } from 'react';
import Button from '@material-ui/core/Button';

import './Signup.css';

function VerifyUser({ user }) {
  const [code, setCode] = useState('');

  const verify = () => {
    if (code !== '') {
      user.confirmRegistration(code, true, (err, result) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
          return;
        }
        console.log(result);
      });
    } else {
      console.log('Empty code');
    }
  };
  return (
    // <div>
    //   <h1>Verify your account</h1>
    //   <input type="text" value={code} onChange={e => setCode(e.target.value)} />
    //   <button onClick={verify}>Verify</button>
    // </div>
    <div className="verify-container">
      <div className="verify-container1">
        <h1>
          <u>
            <b>Verify Code</b>
          </u>
        </h1>
        <h2>
          <b>
            Please check your inbox. A unique code has been sent to the email
            address you provided.
          </b>
        </h2>
        <input
          type="text"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        <br></br>
        <Button
          variant="contained"
          id="btnLogIn"
          className="btn btn-dark btn-lg"
          color="secondary"
          onClick={verify}
        >
          Verify
        </Button>
      </div>
    </div>
  );
}

export default VerifyUser;
