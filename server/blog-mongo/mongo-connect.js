// let mongoClient = require('mongodb').MongoClient;
// const credentials = require("../credentials.json")
// module.exports.connect = function connect(callback) {
  
//     // let url = "mongodb://localhost:27017";
//     let url = `mongodb://${credentials.mongoUser}:${credentials.mongoPass}@127.0.0.1:27017`
//     mongoClient.connect(url, {authSource: "admin"}, function(err, client) {
//       if (err) {
//         return callback(err)
//       }
//       console.log('blogapp:' + 'Connected to mongo server...');
//       let db = client.db('blog');
//       callback(null, db)
//     });

//   }