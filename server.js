const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const config = require('./config.json');
const model = require('./model.js');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use('/build', express.static('build'));

// Proxy requests to BuildDirect API
app.use('/api', proxy('https://api.builddirect.io', {
  decorateRequest: (proxyReq, originalReq) => {
    proxyReq.headers['Ocp-Apim-Subscription-Key'] = config.apiKey;
  }
}));

app.post('/topics', (req, res) => {
  model.topics.create(req.body, (err, newTopic) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(newTopic);
  });
});

app.get('/topics', (req, res) => {
  model.topics.list((err, topics) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(topics);
  });
});

app.get('/topics/:id', (req, res) => {
  model.topics.get(req.params.id, (err, topic) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(topic);
  });
});

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const port = config.port || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

