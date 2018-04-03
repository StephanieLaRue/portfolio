let mongoClient = require('mongodb').MongoClient
module.exports.connect = function connect(callback) {
  console.log('blogapp:' + 'Connected to mongo server...');
    let url = "mongodb://localhost:27017";
    mongoClient.connect(url, function(err, client) {
      if (err) {
        return callback(err)
      }
      let db = client.db('blog');
      callback(null, db)
    });

  }