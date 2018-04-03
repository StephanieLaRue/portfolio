const express = require('express')
const app = express()
const bodyparser = require('body-parser');
let fs = require('fs');
let path = require('path');
const mail = require('./mailer');
const port = 3000;
// const port = process.argv[2] || 80;
const fitness = require('../projects/fitnessapp/server/server.js');
const quiz = require('../projects/quiz-app/mongo/mongodb.js');
const blog = require('../blogComponents/blog-mongoDB/mongoDB.js');

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

app.get('/view', blog.view)
app.post('/form', blog.form)
app.post('/remove', blog.remove)


app.get('/blog', function(req, res) {
  console.log("GetBlog");
  let post1 = {
    date: 'date1',
    title: 'title1',
    body: 'body1'
  }
  let post2 = {
    date: 'date2',
    title: 'title2',
    body: 'body2'
  }
  let response = { authorized:true, data: [post1, post2] }
  res.end(JSON.stringify(response))
})


app.listen(port, () => console.log('Express server listening on port 3000...'))
