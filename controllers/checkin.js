var express = require('express')
var router = express.Router()
var dbcheckins = require('../db/checkin');
var db = require('../db/db')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

// List all checkins provided a user id or a poi id
router.get('/get', (request, response) => {

        var query = null;
        if ("user" in request.query) {
          query = { user: parseInt(request.query.user) };
          console.log("user id query");
        } else if("poi" in request.query) {
          query = { poi: parseInt(request.query.poi) };
          console.log("poi id query");
        }
        dbcheckins.get(query,function(err, res) {
           response.json(res);
        })
});

// add a checkin given a user id and a poi id
router.get('/add', (request, response) => {
        response.setHeader('content-type', 'text/javascript');
        console.log('POI check-in from user:'+request.query.user);
        var query = { poi: parseInt(request.query.poi), user: parseInt(request.query.user), ts: Date(), lat: parseFloat(request.query.lat), lng: parseFloat(request.query.lng) };
        var res = dbcheckins.addCheckin(query);
        response.json(res);
})

module.exports = router;
