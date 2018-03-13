'use strict';

let mongoClient = require('mongodb').MongoClient
// const credentials = require("../credentials/credentials.json")

// NOTE: Local url
// let url = 'mongodb://localhost:27017/portfolio-website';

// NOTE: Digital Ocean url
// console.log(credentials)
  let url = "mongodb://localhost:27017";
// console.log(url);
let docs = [
  {'question':'1. Who discovered and named the basic unit of life known as the cell?', 'answers':['Robert Hooke', 'Albert Einstien', 'Edmond Halley', 'Isaac Newton'], 'correctAnswer': 'Robert Hooke'},
  {'question':'2. About how long does it take sunlight to reach Earth?', 'answers':['Twenty Minutes', 'Twelve Minutes', 'Eight Minutes', 'Thirty-Five Minutes'], 'correctAnswer': 'Eight Minutes'}
]

// function insertDocuments(db, callback) {
//     let collection = db.collection('quizcollection');
//
//     collection.insertMany(docs,function(err, result) {
//       if(err) {return console.log('Error inserting documents into collection');}
//       console.log('Inserted documents into the collection');
//       callback(null, result);
//       db.close();
//     });
// }
//
// function removeDocuments(db, callback) {
//     let collection = db.collection('quizcollection');
//
//     collection.deleteOne(docs[1],function(err, result) {
//       if(err) {return console.log('Error removing documents in collection');}
//       console.log('Removed documents from collection');
//       callback(null, result);
//       db.close();
//     });
// }
//
// function updateDocuments(db, callback) {
//     let collection = db.collection('quizcollection');
//
//     collection.update({$set: {}}, function(err, result) {
//       if(err) {return console.log('Error inserting documents into collection');}
//       console.log('Inserted documents into the collection');
//       callback(null, result);
//       db.close();
//     });
// }


function connect(callback) {
  mongoClient.connect(url, function(err, client) {
    if(err) {return console.log('Error connecting to mongo server...');}
      console.log('Connected to mongo server...')
      let db = client.db('quiz')
      callback(null, db)
  });
}

function getQuestions(callback) {

  mongoClient.connect(url, function(err, client) {
    if(err) {
    console.log(err);
      return console.log('Error connecting to mongo server...');}
      console.log('Connected to mongo server...')
      let db = client.db('quiz')
      let collection = db.collection('quizcollection');

      // collection.insertMany(docs,function(err, result) {
      //   if(err) {return console.log('Error inserting documents into collection');}
      //   console.log('Inserted documents into the collection');
      //   // callback(null, result);
      //   // db.close();
      // });

      collection.find({}).toArray(function(err, result) {
        if(err) {console.log(err); return console.log('Error finding documents');}
        console.log('Found documents');
        callback(null, result);
        console.log(result);
        // db.close();
      });
  });
}

let mongoObj = {
  connect: connect,
  // insert: insertDocuments,
  // remove: removeDocuments,
  // update: updateDocuments,
  getQuestions: getQuestions
}

module.exports = mongoObj;
