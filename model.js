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
    }
  },
  answers: {

  },
  comments: {

  }
};