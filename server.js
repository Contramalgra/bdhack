const express = require('express');
const proxy = require('express-http-proxy');
const config = require('./config.json');

const app = express();

app.use('/build', express.static('build'));

// Proxy requests to BuildDirect API
app.use('/api', proxy('https://api.builddirect.io', {
  decorateRequest: (proxyReq, originalReq) => {
    proxyReq.headers['Ocp-Apim-Subscription-Key'] = config.apiKey;
  }
}));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const port = config.port || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});