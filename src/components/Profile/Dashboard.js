import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/UserContext';
import { userDetailsContext } from '../../Context/UserDetailsContext';
import axios from 'axios';

function Dashboard() {
  const auth = useContext(authContext);
  const userDetails = useContext(userDetailsContext);
  const readAPI = `https://2nhirc9x04.execute-api.us-east-2.amazonaws.com/stage-1`;

  useEffect(() => {
    let username = auth.user.username;
    console.log(username);
    axios
      .get(`${readAPI}?username=${username}`, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(res => {
        userDetails.setUserDetails(res.data.Item);
        console.log(userDetails.userDetails);
      })
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ marginTop: '100px' }}>
      Welcome, {auth?.user?.username}
      <Link to="edit-profile">Edit your Profile</Link>
    </div>
  );
}

export default Dashboard;
