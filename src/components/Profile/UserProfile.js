import React, { useContext, useEffect, useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
// // core components
import GridItem from '../Grid/GridItem.js';
import GridContainer from '../Grid/GridContainer.js';
import Card from '../Card/Card';
import CardHeader from '../Card/CardHeader.js';
import CardAvatar from '../Card/CardAvatar.js';
import CardBody from '../Card/CardBody.js';
import CardFooter from '../Card/CardFooter.js';
import Button from '@material-ui/core/Button';
import { userDetailsContext } from '../../Context/UserDetailsContext';
import AWS from 'aws-sdk';

const styles = {
  cardCategoryWhite: {
    color: 'rgba(255,255,255,.62)',
    margin: '0',
    fontSize: '14px',
    marginTop: '0',
    marginBottom: '0',
  },
  cardTitleWhite: {
    color: '#FFFFFF',
    marginTop: '0px',
    minHeight: 'auto',
    fontWeight: '300',
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: '3px',
    textDecoration: 'none',
  },
  containerDiv: {
    marginTop: '120px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: '100%',
  },
  gridContainerStyle: {
    width: '40%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

const useStyles = makeStyles(styles);

export default function UserProfile() {
  const classes = useStyles();
  return (
    <div className={classes.containerDiv}>
      <GridContainer className={classes.containerDiv}>
        <GridItem className={classes.gridContainerStyle}>
          <Card>
            <CardHeader color="primary">
              <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
              <p className={classes.cardCategoryWhite}>Complete your profile</p>
            </CardHeader>
            <CardBody>
              <GridContainer>
                <GridItem>
                  <Card profile>
                    <CardAvatar profile>
                      <img
                        src="images/default.png"
                        height="150px"
                        width="150px"
                      />
                      Change Profile pic
                      <input
                        type="file"
                        name="file"
                        className=""
                        accept="image/*"
                        style={{ color: 'black' }}
                      />
                    </CardAvatar>
                  </Card>
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem>
                  First name: <input type="text" placeholder="First name" />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <br></br>
                <GridItem>
                  Last Name: <input type="text" placeholder="Last name" />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <br></br>
                <GridItem>
                  Email: <input type="email" placeholder="Email" />
                </GridItem>
              </GridContainer>
            </CardBody>
            <CardFooter>
              <Button color="primary">Edit Profile</Button>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
