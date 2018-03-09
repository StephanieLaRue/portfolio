let mongoClient = require('mongodb').MongoClient
module.exports.connect = function connect(callback) {
    let url = "mongodb://localhost:27017";
    mongoClient.connect(url, function(err, client) {
      if (err) {
        return callback(err)
      }
      let db = client.db('name');
      callback(null, db)
    });

  }
