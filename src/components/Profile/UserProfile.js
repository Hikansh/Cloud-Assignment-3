import React, { useContext, useEffect, useState } from 'react';
import { userDetailsContext } from '../../Context/UserDetailsContext';
import AWS from 'aws-sdk';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Image from '../../images/pexels-michelle-leman-6774558.jpg';
import { IconButton, TextField, Tooltip, Typography } from '@material-ui/core';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import axios from 'axios';
import { useHistory } from 'react-router';
import apiUrl from '../../config/env';

const useStyles = makeStyles({
  containerDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    minHeight: '100vh',
    backgroundImage: `url(${Image})`,
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed'
  },
  root: {
    width: '40%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    marginTop: '80px'
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)'
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  large: {
    width: 200,
    height: 200,
    borderRadius: '50%',
    border: '1px solid black'
  },
  cardContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    width: '80%',
    color: 'black'
  },

  input: {
    display: 'none'
  }
});

function UserProfile() {
  const classes = useStyles();
  const [editSate, setEditState] = useState(false);
  const userDetails = useContext(userDetailsContext);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);
  let userData = null;
  const history = useHistory();

  const handleCapture = ({ target }) => {
    setSelectedFile(target.files[0]);
  };

  const S3_BUCKET = 'cloud-a3-react';
  const REGION = 'us-east-2';

  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET_ID
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
  });

  const getUserDetailsFromBackend = async () => {
    userData = await axios.get(apiUrl + '/user/getUserDetails');
    userDetails.setUserDetails(userData.data.userDetails);
  };

  useEffect(() => {
    // if (!userDetails.userDetails) {
    getUserDetailsFromBackend().then(() => {
      console.log(userDetails);
      setEmail(
        userDetails?.userDetails?.email.S ||
          userData.data.userDetails.email.S ||
          'Empty'
      );
      setFirstName(
        userDetails?.userDetails?.firstName?.S ||
          userData?.data?.userDetails?.firstName?.S ||
          'Empty'
      );
      setLastName(
        userDetails?.userDetails?.lastName.S ||
          userData.data.userDetails.lastName.S ||
          'Empty'
      );
      getImageFromS3();
    });
    // } else {
    //   console.log('here');
    // }
  }, [editSate]);

  const fileChangeHandler = event => {
    setSelectedFile(event.target.files[0]);
    console.log(selectedFile);
  };

  const editBtnClicked = () => {
    setEditState(true);
  };

  // Getting an img url
  const getImageFromS3 = () => {
    var params = {
      Bucket: S3_BUCKET,
      Key:
        (userDetails?.userDetails?.username?.S ||
          userData.data.userDetails.username.S) + '.jpg'
    };
    myBucket.getObject(params, function (err, data) {
      if (err) {
        console.log(err);
        setImgUrl(null);
      } else {
        myBucket.getSignedUrl(
          'getObject',
          {
            Bucket: S3_BUCKET,
            Key:
              (userDetails?.userDetails?.username.S ||
                userData.data.userDetails.username.S) + '.jpg'
          },
          function (err, url) {
            if (err) {
              setImgUrl(null);
              console.log(err);
            } else {
              console.log('Your generated pre-signed URL is', url);
              setImgUrl(url);
            }
          }
        );
      }
    });
  };

  const saveBtnClicked = () => {
    console.log(selectedFile);
    setEditState(false);
    if (selectedFile) {
      const params = {
        ACL: 'public-read',
        Body: selectedFile,
        Bucket: S3_BUCKET,
        Key:
          (userDetails.userDetails.username.S ||
            userData.data.userDetails.username.S) + '.jpg' || selectedFile.name
      };

      // Uploading an image
      myBucket
        .putObject(params)
        .on('httpUploadProgress', evt => {
          setProgress(Math.round((evt.loaded / evt.total) * 100));
          console.log(progress);
        })
        .send(err => {
          if (err) console.log(err);
          else console.log('Success');
        });
    }
    console.log('Sending data:', {
      username:
        userDetails.userDetails.username.S ||
        userData.data.userDetails.username.S,
      email: email,
      firstName: firstName,
      lastName: lastName
    });
    axios
      .post(apiUrl + '/user/updateUserDetails', {
        username:
          userDetails.userDetails.username.S ||
          userData.data.userDetails.username.S,
        email: email,
        firstName: firstName,
        lastName: lastName
      })
      .then(res => {
        history.push('dashboard');
      });
  };

  const renderNormalSate = () => {
    return (
      <div className={classes.containerDiv}>
        <Card className={classes.root}>
          <h1>Edit Profile</h1>

          <img
            src={imgUrl === null ? 'images/default.png' : imgUrl}
            height="150px"
            width="150px"
          />

          <CardContent className={classes.cardContent}>
            <Typography variant="subtitle1" gutterBottom>
              {' '}
              {email}{' '}
            </Typography>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography variant="subtitle1" gutterBottom>
              {' '}
              {firstName}{' '}
            </Typography>
          </CardContent>
          <CardContent className={classes.cardContent}>
            <Typography variant="subtitle1" gutterBottom>
              {lastName}{' '}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => editBtnClicked()}
            >
              Edit
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  };

  const renderEditSate = () => {
    return (
      <div className={classes.containerDiv}>
        <Card className={classes.root}>
          <h1>Edit Profile</h1>
          {/* <Avatar
            alt="Remy Sharp"
            src="images/default.png"
            className={classes.large}
          /> */}
          <img
            src={imgUrl === null ? 'images/default.png' : imgUrl}
            height="150px"
            width="150px"
          />
          <input
            accept="image/jpeg"
            id="faceImage"
            type="file"
            className={classes.input}
            onChange={handleCapture}
          />
          <Tooltip title="Select Image">
            <label htmlFor="faceImage">
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <EditOutlinedIcon fontSize="large" />
              </IconButton>
            </label>
          </Tooltip>
          <label>
            {selectedFile ? selectedFile.name : 'Change Profile Picture'}
          </label>
          <CardContent className={classes.cardContent}>
            <TextField
              id="outlined-basic"
              value={email}
              // onChange={e => setEmail(e.target.value)}
              variant="outlined"
              style={{ width: '70%' }}
              readOnly={true}
            />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <TextField
              id="outlined-basic"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
              variant="outlined"
              style={{ width: '70%' }}
            />
          </CardContent>
          <CardContent className={classes.cardContent}>
            <TextField
              id="outlined-basic"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
              variant="outlined"
              style={{ width: '70%' }}
            />
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={() => saveBtnClicked()}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </div>
    );
  };
  return (
    <div style={{ marginTop: '10px', width: '100%' }}>
      {editSate ? renderEditSate() : renderNormalSate()}
    </div>
  );
}

export default UserProfile;
