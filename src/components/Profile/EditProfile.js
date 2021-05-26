import React, { useContext, useEffect, useState } from 'react';
import { userDetailsContext } from '../../Context/UserDetailsContext';

function EditProfile() {
  const [editSate, setEditState] = useState(false);
  const userDetails = useContext(userDetailsContext);

  useEffect(() => {
    console.log(userDetails);
  }, []);

  const editBtnClicked = () => {
    setEditState(true);
  };
  const saveBtnClicked = () => {
    setEditState(false);
  };

  const renderNormalSate = () => {
    return (
      <div>
        <p>Email: {userDetails.userDetails.email.S || 'Empty'}</p>
        <p>First name: {userDetails.userDetails.firstName.S || 'Empty'}</p>
        <p>Last Name: {userDetails.userDetails.lastName.S || 'Empty'}</p>
        <button onClick={() => editBtnClicked()}>Edit</button>
      </div>
    );
  };

  const renderEditSate = () => {
    return (
      <div>
        <p>
          Email: <input type="email" placeholder="Email" />
        </p>
        <p>
          First name: <input type="text" placeholder="First name" />
        </p>
        <p>
          Last Name: <input type="text" placeholder="Last name" />
        </p>
        <p>
          Gender: <input type="text" placeholder="Gender" />
        </p>
        <button onClick={() => saveBtnClicked()}>Save</button>
      </div>
    );
  };
  return (
    <div style={{ marginTop: '100px' }}>
      {editSate ? renderEditSate() : renderNormalSate()}
    </div>
  );
}

export default EditProfile;
