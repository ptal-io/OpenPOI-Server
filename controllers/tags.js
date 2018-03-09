var express = require('express')
var router = express.Router()
var dbtags = require('../db/tags');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// List all checkins provided a user id or a poi id
router.get('/get', (request, response) => {
  console.log('get tags');
  var query = { poi: parseInt(request.query.poi) };
  dbtags.get(query, function(err,res) {
    response.json(result);
  });

});

// add a checkin given a user id and a poi id
router.get('/add', (request, response) => {
  console.log('add tags');
  var query = { poi: parseInt(request.query.poi), user: parseInt(request.query.user), ts: Date(), cat: request.query.category};
  dbtags.add(query, function(err, res) {
   response.json(res);
  })
})


module.exports = router;
