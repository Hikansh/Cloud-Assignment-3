import React, { useState } from 'react';

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
    <div>
      <h1>Verify your account</h1>
      <input type="text" value={code} onChange={e => setCode(e.target.value)} />
      <button onClick={verify}>Verify</button>
    </div>
  );
}

export default VerifyUser;
