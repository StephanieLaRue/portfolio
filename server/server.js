const express = require('express')
const app = express()
const bodyparser = require('body-parser')
let fs = require('fs')
let path = require('path')
const mail = require('./mailer')
const port = 3000;
// const port = process.argv[2] || 80;
const fitness = require('../projects/expressinputapp/server/server.js')

app.use(express.static(path.join(__dirname, '../src')))
app.use('/projects', express.static(path.join(__dirname, '../projects')))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}))

app.post('/contact', function(req, res) {
  mail.sendGmail(req, res, function(err, result) {})
})

app.get('/view', fitness.view)
app.post('/form', fitness.form)
app.post('/remove', fitness.remove)


app.listen(port, () => console.log('Express server listening on port 3000...'))
