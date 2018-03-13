var express = require('express')
var router = express.Router()
var dbtags = require('../db/tags');

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// List all checkins provided a user id or a poi id
router.get('/get', (request, response) => {
  if ('poi' in request.query) {
    var query = { poi: parseInt(request.query.poi), cat:{$exists:true} };
    console.log(query);
    dbtags.get(query, function(err,res) {
      response.json({
        code: 200,
        data: res,
        message: 'success'
      });
    });
  } else {
    response.json({
        code: 500,
        data: [],
        message: 'No POI ID provided.'
      });
  }

});

// add a checkin given a user id and a poi id
router.get('/add', (request, response) => {
  if ('poi' in request.query && 'user' in request.query) {
    request.query.poi = parseInt(request.query.poi);
    request.query.user = parseInt(request.query.user);
    request.query.ts = Date();
    //var query = { poi: parseInt(request.query.poi), user: parseInt(request.query.user), ts: Date()};
    //query.cat = ('category' in request.query) ? request.query.category : null;
    dbtags.add(request.query, function(err, res) {
      response.json({
        code: 200,
        data: res,
        message: 'success'
      });
    });
  } else {
    response.json({
        code: 500,
        data: [],
        message: 'Requires POI, USER and CAT parameters.'
      });
  }
});


module.exports = router;
