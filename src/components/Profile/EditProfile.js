import React, { useContext, useEffect, useState } from 'react';
import { userDetailsContext } from '../../Context/UserDetailsContext';
import AWS from 'aws-sdk';

function EditProfile() {
  const [editSate, setEditState] = useState(false);
  const userDetails = useContext(userDetailsContext);
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [selectedFile, setSelectedFile] = useState();
  const [progress, setProgress] = useState(0);
  const [imgUrl, setImgUrl] = useState(null);

  const S3_BUCKET = 'cloud-a3-react';
  const REGION = 'us-east-2';

  AWS.config.update({
    accessKeyId: 'AKIARZ7AWDJHZG6F7AU4',
    secretAccessKey: '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'
  });

  const myBucket = new AWS.S3({
    params: { Bucket: S3_BUCKET },
    region: REGION
  });

  useEffect(() => {
    console.log(userDetails);
    setEmail(userDetails.userDetails.email.S || 'Empty');
    setFirstName(userDetails.userDetails.firstName.S || 'Empty');
    setLastName(userDetails.userDetails.lastName.S || 'Empty');
    getImageFromS3();
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
      Key: userDetails.userDetails.username.S + '.jpg'
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
            Key: userDetails.userDetails.username.S + '.jpg'
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
        Key: userDetails.userDetails.username.S + '.jpg' || selectedFile.name
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
  };

  const renderNormalSate = () => {
    return (
      <div>
        <img
          src={imgUrl === null ? 'images/default.png' : imgUrl}
          height="150px"
          width="150px"
        />
        <p>Email: {email}</p>
        <p>First name: {firstName}</p>
        <p>Last Name: {lastName}</p>
        <button onClick={() => editBtnClicked()}>Edit</button>
      </div>
    );
  };

  const renderEditSate = () => {
    return (
      <div>
        <p>
          <img
            src={imgUrl === null ? 'images/default.png' : imgUrl}
            height="150px"
            width="150px"
          />
          Change Profile pic
          <input
            type="file"
            name="file"
            className=""
            accept="image/*"
            onChange={e => fileChangeHandler(e)}
            style={{ color: 'black' }}
          />
        </p>
        <p>
          Email: <input type="email" placeholder="Email" value={email} />
        </p>
        <p>
          First name:{' '}
          <input type="text" placeholder="First name" value={firstName} />
        </p>
        <p>
          Last Name:{' '}
          <input type="text" placeholder="Last name" value={lastName} />
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
