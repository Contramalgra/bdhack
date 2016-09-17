const express = require('express');
const config = require('./config.json');

const app = express();

app.use('build', express.static('build'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const port = config.port || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});