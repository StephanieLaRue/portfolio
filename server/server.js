const http = require('http')
const https = require('https')
const express = require('express')
const proxy = require('http-proxy-middleware');
const app = express()
const bodyparser = require('body-parser');
const fs = require('fs');
const path = require('path');
const mail = require('./mailer');
const port = process.argv[2] || 80;
const blog = require('./blog-mongo/mongoDB.js');
const key = require('./blog-mongo/auth.js');


app.use('/api/fitness', proxy({
  target: 'http://localhost:3000'
}));

app.use('/api/fitappone', proxy({
  target: 'http://localhost:3001'
}));

app.use('/api/quiz-app', proxy({
  target: 'http://localhost:3002'
}));

app.use('/api/portfolio.1.0', proxy({
  target: 'http://localhost:3003'
}));

// app.use('/api/coushattalarue', proxy({
//   target: 'http://localhost:3006'
// }));

app.use(express.static(path.join(__dirname, '../public')))
app.use('/fitnessapp.2.0', express.static(path.join(__dirname, '../../fitnessapp.2.0')))
app.use('/calculatortwo', express.static(path.join(__dirname, '../../calculatortwo')))
app.use('/fitnessapp', express.static(path.join(__dirname, '../../fitnessapp')))
app.use('/quiz-app', express.static(path.join(__dirname, '../../quiz-app')))
app.use('/portfolio.1.0', express.static(path.join(__dirname, '../../portfolio.1.0')))
// app.use('/coushattalarue/bookcover_images', express.static(path.join(__dirname, '../../ecommerce.website/public/bookcover_images')))
// app.use('/coushattalarue/assets', express.static(path.join(__dirname, '../../ecommerce.website/public/assets')))
// app.use('/coushattalarue/*', (req, res) => 
//   res.sendFile(path.join(__dirname, '../../ecommerce.website/public/index.html'))
// )


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

app.get('/blog', blog.view)
app.post('/removePost', blog.remove)
app.post('/newPost', blog.form)
app.post('/key', key.matchKey)


app.listen(port, () => console.log(`Express server listening on ${port}...`))
