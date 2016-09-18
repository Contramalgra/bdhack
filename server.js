const express = require('express');
const proxy = require('express-http-proxy');
const bodyParser = require('body-parser');
const config = require('./config.json');
const model = require('./model.js');

const app = express();

app.use(bodyParser.json());

app.use('/build', express.static('build'));

// Proxy requests to BuildDirect API
app.use('/api', proxy('https://api.builddirect.io', {
  decorateRequest: (proxyReq, originalReq) => {
    proxyReq.headers['Ocp-Apim-Subscription-Key'] = config.apiKey;
  }
}));

// Topics endpoints

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

app.delete('/topics/:id', (req, res) => {
  model.topics.delete(req.params.id, (err, deletedTopic) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(deletedTopic);
  });
});
// --------

// Answers endpoints

app.post('/topics/:topicId/answers', (req, res) => {
  if (!req.body.topicId) {
    req.body.topicId = req.params.topicId;
  }
  model.answers.create(req.body, (err, newAnswer) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(newAnswer);
  });
});

app.get('/topics/:topicId/answers', (req, res) => {
  model.answers.listByTopic(req.params.topicId, (err, answers) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(answers);
  });
});

app.get('/topics/:topicId/answers/:id', (req, res) => {
  model.answers.get(req.params.id, (err, answer) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(answer);
  });
});

app.delete('/topics/:topicId/answers/:id', (req, res) => {
  model.answers.delete(req.params.id, (err, deletedAnswer) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(deletedAnswer);
  });
});
// --------

// Comments endpoints

app.post('/topics/:topicId/answers/:answerId/comments', (req, res) => {
  if (!req.body.answerId) {
    req.body.answerId = req.params.answerId;
  }
  model.comments.create(req.body, (err, newComment) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(newComment);
  });
});

app.get('/topics/:topicId/answers/:answerId/comments', (req, res) => {
  model.comments.listByAnswer(req.params.answerId, (err, comments) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(comments);
  });
});

app.get('/topics/:topicId/answers/:answerId/comments/:id', (req, res) => {
  model.comments.get(req.params.id, (err, comment) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(comment);
  });
});

app.delete('/topics/:topicId/answers/:answerId/comments/:id', (req, res) => {
  model.comments.delete(req.params.id, (err, deletedComment) => {
    if (err) {
      return res.status(500).send(err);
    }
    return res.send(deletedComment);
  });
});
// --------

app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

const port = config.port || 3000;

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`);
});

