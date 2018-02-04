var express = require('express');
var app = express();
var port = 3000;

var checkins = require('./routes/checkin.js')

app.use('/checkin', checkins)

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})