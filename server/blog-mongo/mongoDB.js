const express = require('express');
const app = express()
const bodyparser = require('body-parser');
let mongoClient = require('mongodb').MongoClient;
const mongoConnection = require('./mongo-connect.js');
const ObjectID = require("mongodb").ObjectID;
let fs = require('fs');
let path = require('path');
const credentials = require('../credentials.json');

module.exports = {

    form: function(req, res) {
      let body = req.body;
      res.set('Content-Type', 'application/json')
      mongoConnection.connect(function(err, db) {
        if (err) {
          console.log('Error', err);
          let errObj = {
            status: false,
            message: 'There was an error'
          }
          return res.send(JSON.stringify(errObj))
        }
        insertDocs(body, db, function(err, result) {
          if (err) {
            console.log("ERR:", err);
          }
          res.end(JSON.stringify({data: "Success"}))
          // let query = result.ops[0]
          // getData(query, db, function(err, data) {
          //   res.set('Content-Type', 'application/json')
          //   let response = { authorized:true, data};     
          //   res.end(JSON.stringify(response));
          // })
        });
      })
    },
    view: function(req, res) {
      mongoConnection.connect(function(err, db) {
        if (err) {
          console.log('Error', err);
          let errObj = {
            status: false,
            message: 'There was an error'
          }
          return res.send(JSON.stringify(errObj))
        }
        let query = {};
        getData(query, db, function(err, data) {
          console.log('error getting data', err);
          
          res.set('Content-Type', 'application/json')
          let response = { authorized:true, data };
          res.end(JSON.stringify(response));
        })
      })
    },
    remove: function(req, res) {
      let body = req.body;
      res.set('Content-Type', 'application/json')
      mongoConnection.connect(function(err, db) {
        if (err) {
          console.log('Error', err);
          let errObj = {
            status: false,
            message: 'There was an error'
          }
          return res.send(JSON.stringify(errObj))
        }
        removeData(body, db, function(err, result) {
          if (err) {
            console.log("ERR:", err);
          }
          let query = {}
          getData(query, db, function(err, data) {
            res.set('Content-Type', 'application/json')
            let json = JSON.stringify(data)
            res.send(json)
          })
        });
      })
    }
  }
  
  
  const getData = function(query, db, callback) {
    let collection = db.collection('inputs')
    // let projection = {
    //   _id: 0
    // }
    collection.find(query).toArray(function(err, result) {
      if (err) {
        return callback(err)
      }
      console.log('Found Data!');
      callback(null, result)
    })
  }
  
  const insertDocs = function(data, db, callback) {
    if(data.blogKey !== credentials.key) {
      console.log('no access');
      return; 
    }
    
    let collection = db.collection('inputs')
    let id = data._id ? ObjectID(data._id) : ObjectID()
    delete data._id;
    delete data.blogKey;
    collection.updateOne({"_id": id}, {$set: data}, {upsert: true}, (err, result) => {
      if (err) {
        console.log('Error inserting collection...' + err);
      }
      console.log('Data inserted!');
      callback(null, result)
    })
  }
  
  const removeData = function(data, db, callback) {
    if(data.blogKey !== credentials.key) {
      console.log('no access');
      return; 
    }
    let collection = db.collection('inputs');
    let id = data.id ? ObjectID(data.id) : "";
    collection.findOneAndDelete({"_id": id}, function(err, result) {
      if (err) {
        console.log('Error removing collection...' + err);
      }
      callback(null, result)
    })
  }
  
