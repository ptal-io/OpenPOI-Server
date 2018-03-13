var express = require('express')
var router = express.Router()
var dbsignup = require('../db/signup');
var db = require('../db/db')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/', (request, response) => {

    if ("username" in request.query && "pass" in request.query) {
          // silly hack to pull out only part of the password
          var password = request.query.pass.substring(32,64);
          var query = { username: request.query.username, password: password, email: request.query.email, name: request.query.name, photo:'https://i.stack.imgur.com/IHLNO.jpg' };
          dbsignup.get(query,function(err, result) {
                response.json(result);
          });
    }
})

module.exports = router;
