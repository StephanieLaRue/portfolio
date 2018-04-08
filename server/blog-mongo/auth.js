const express = require('express');
const app = express();
const bodyparser = require('body-parser');
let fs = require('fs');
const credentials = require('../credentials.json');

module.exports = {
  matchKey: function (req, res) {
    let key = req.body.storedKey;
    res.set('Content-Type', 'application/json');
    let isAuthorized = key === credentials.key;
    let response = {
      authorized: isAuthorized
    };  
    res.end(JSON.stringify(response));
  }
}