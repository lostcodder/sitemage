var express = require('express')
var app = express()
var port = 80
app.get('/', function (req, res) {
  res.send('Hello World')
})

app.get('/api', function (req, res) {
  res.send('{"code":200}')
})


app.listen(port)
console.log('Listening on http://localhost:' + port);



