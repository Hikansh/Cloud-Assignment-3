import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authContext } from '../../Context/UserContext';
import { userDetailsContext } from '../../Context/UserDetailsContext';
import axios from 'axios';
import apiUrl from '../../config/env';
import { Button } from '@material-ui/core';

function Dashboard() {
  const auth = useContext(authContext);
  const userDetails = useContext(userDetailsContext);
  const readAPI = `https://2nhirc9x04.execute-api.us-east-2.amazonaws.com/stage-1`;
  let userData = null;

  const getUserFromBackend = async () => {
    auth.setUser(null);
    userData = await axios.get(apiUrl + '/user/getUser');
    auth.setUser(userData.data.user);
  };

  useEffect(() => {
    // if (!auth.user) {
    // console.log('Here');
    getUserFromBackend().then(() => {
      console.log(userData);
      let username = auth.user?.username || userData.data.user.username;
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
          let ud = res.data.Item;
          axios
            .post(apiUrl + '/user/setUserDetails', {
              userD: ud
            })
            .then(res => console.log(res));
        })
        .catch(err => console.log(err));
    });
    // }
  }, []);

  return (
    <div
      style={{
        width: '100%',
        margin: '0 auto',
        color: 'white',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        flexDirection: 'column',
        background: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.8)),
        url('../../images/bg.jpg')`,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover'
      }}
    >
      {userDetails.userDetails ? (
        <>
          {' '}
          <h1 style={{ fontSize: '3rem' }}>
            Hey {userDetails.userDetails.email.S}, Welcome to your dashboard !
          </h1>
        </>
      ) : (
        <>
          {' '}
          <h1 style={{ fontSize: '4rem' }}>Hey {auth?.user?.username}</h1>
        </>
      )}
      {/* <h1>We provide everything you need ! At minimal costs 🤩</h1> */}
      <br />
      <div>
        <Button
          component={Link}
          to={'user'}
          variant="contained"
          color="secondary"
          size="large"
        >
          Edit your Profile
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button
          component={Link}
          to={'/'}
          variant="contained"
          color="primary"
          size="large"
        >
          Explore our Products
        </Button>
      </div>
    </div>
  );
}

export default Dashboard;
