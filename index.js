const express = require('express');
const app = express();
const https = require('https');
const fs = require('fs');

app.use(express.static('public'));

var db = require('./db/db.js');

app.get('/', (request, response) => {
        response.writeHead(200, {'Content-Type': 'text/html'});
        response.end(fs.readFileSync('public/index.html'));
})
app.use('/checkin', require('./controllers/checkin'))
app.use('/user', require('./controllers/user'))
app.use('/poi', require('./controllers/nearby'))

db.connect('mongodb://localhost:27017/mydatabase', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
        app.listen(3000, function() {
            console.log(`server is listening...`)
        })
        const options = {
          key: fs.readFileSync('/etc/letsencrypt/live/openpoi.org/privkey.pem'),
          cert: fs.readFileSync('/etc/letsencrypt/live/openpoi.org/cert.pem'),
          ca: fs.readFileSync('/etc/letsencrypt/live/openpoi.org/chain.pem')
        };
        https.createServer(options, app).listen(443);
  }
})
