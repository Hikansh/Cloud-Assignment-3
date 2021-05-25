const path = require('path');
const express = require('express');
const app = express(); // create express app

// add middlewares
app.use(express.static(path.join(__dirname, '../build')));
app.use(express.static('public'));

app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// start express server on port 8081
const port = process.env.port || 8081;
app.listen(port, () => {
  console.log('server started on port ' + port);
});
