// Model CRUD methods
const Nedb = require('nedb');

const topics = new Nedb({ filename: __dirname + '/data/topics', autoload: true });
const answers = new Nedb({ filename: __dirname + '/data/answers', autoload: true });
const comments = new Nedb({ filename: __dirname + '/data/comments', autoload: true });

module.exports = {
  topics: {
    create: (topic, callback) => {
      topics.insert(topic, (err, newTopic) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, newTopic);
      });
    },
    list: (callback) => {
      topics.find({}, (err, topics) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, topics);
      });
    },
    get: (id, callback) => {
      topics.findOne({_id: id}, (err, topic) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, topic);
      });
    },
    delete: (id, callback) => {
      topics.remove({_id: id}, (err, removedTopic) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, removedTopic);
      });
    }
  },
  answers: {
    create: (answer, callback) => {
      answers.insert(answer, (err, newAnswer) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, newAnswer);
      });
    },
    listByTopic: (topicId, callback) => {
      answers.find({topicId: topicId}, (err, answers) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, answers);
      });
    },
    get: (id, callback) => {
      answers.findOne({_id: id}, (err, answer) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, answer);
      });
    },
    delete: (id, callback) => {
      answers.remove({_id: id}, (err, removedAnswer) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, removedAnswer);
      });
    }
  },
  comments: {
    create: (comment, callback) => {
      comments.insert(comment, (err, newComment) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, newComment);
      });
    },
    listByAnswer: (answerId, callback) => {
      comments.find({answerId: answerId}, (err, comments) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, comments);
      });
    },
    get: (id, callback) => {
      comments.findOne({_id: id}, (err, comment) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, comment);
      });
    },
    delete: (id, callback) => {
      comments.remove({_id: id}, (err, removedComment) => {
        if (err) {
          return callback(err, null);
        }
        return callback(null, removedComment);
      });
    }
  }
};