import {
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute
} from 'amazon-cognito-identity-js';

const poolData = {
  UserPoolId: 'us-east-2_6S6eQcvfx',
  ClientId: '55cqdp9idse6fh5uvafqu72scn'
};

export default new CognitoUserPool(poolData);
