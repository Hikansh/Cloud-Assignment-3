const axios = require('axios');
const callSaveAPI = () => {
  axios
    .get(
      'https://j38uh8wwy8.execute-api.us-east-2.amazonaws.com/stage-2?username=abcdef'
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
const callReadAPI = () => {
  axios
    .get(
      'https://2nhirc9x04.execute-api.us-east-2.amazonaws.com/stage-1?username=abcd'
    )
    .then(res => console.log(res))
    .catch(err => console.log(err));
};
callReadAPI();
// callSaveAPI();
