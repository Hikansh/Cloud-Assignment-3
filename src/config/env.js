const env = 'production';
// const env = 'development';
let apiUrl = '';
if (env === 'development') {
  apiUrl = 'http://localhost:8081';
} else {
  apiUrl =
    'http://cloud3backend-env.eba-gnbtkmeb.us-east-2.elasticbeanstalk.com';
}

export default apiUrl;
