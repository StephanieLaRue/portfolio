const express = require('express')
const app = express()
const bodyparser = require('body-parser')
let fs = require('fs')
let path = require('path')
const mail = require('./mailer')
const port = 3000;

app.use(express.static(path.join(__dirname, '../src')))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}))

app.post('/contact', function(req, res) {
  mail.sendGmail(req, res, function(err, result) {
  })
})




app.listen(port, () => console.log('Express server listening on port 3000...'))
