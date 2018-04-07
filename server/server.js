const express = require('express')
const app = express()
const bodyparser = require('body-parser');
let fs = require('fs');
let path = require('path');
const mail = require('./mailer');
const port = 3000;
// const port = process.argv[2] || 80;
const fitness = require('../projects/fitnessapp/mongoDB/mongo.js');
const quiz = require('../projects/quiz-app/mongo/mongodb.js');
const blog = require('./blog-mongo/mongoDB.js');

app.use(express.static(path.join(__dirname, '../public')))
app.use('/projects', express.static(path.join(__dirname, '../projects')))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
  extended: true
}))

app.post('/contact', function(req, res) {
  mail.sendGmail(req, res, function(err, result) {
    res.writeHead(200, {'Content-Type': 'text/plain'})
    res.end(result)
  })
})

app.get('/quiz-app', function(req, res) {
  quiz.getQuestions(function(err, quizData) {
    res.end(JSON.stringify(quizData))
  });
})

app.get('/view', fitness.view)
app.post('/form', fitness.form)
app.post('/remove', fitness.remove)

app.post('/newPost', blog.form)
app.get('/blog', blog.view)


app.listen(port, () => console.log('Express server listening on port 3000...'))
