var express = require('express')
var router = express.Router()
var dblogin = require('../db/login');
var db = require('../db/db')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

router.get('/login', (request, response) => {

    if ("user" in request.query && "pass" in request.query) {

          // silly hack to pull out only part of the password
          var password = request.query.pass.substring(32,64);

          var query = { username: request.query.user, password: password };
          var update = { $set: {lastlogin:Date()} };
          dblogin.get(query, update,function(err, result) {
                var r = Math.random().toString(36).substring(2,34);
                result.session = r;
                response.json(result);
          });
    }
})

module.exports = router;
