var express = require('express')
var router = express.Router()
var dbcheckins = require('../db/checkin');
var db = require('../db/db')

router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})

var result = {};

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

        // set limit and offset
        limit = 50;
        offset = 0;
        if ("limit" in request.query) {
            limit = parseInt(request.query.limit);
        }
        if ("offset" in request.query) {
            offset = parseInt(request.query.offset);
        }

        
        dbcheckins.get(query,limit,offset,function(err, res) {
          response.json({
                code: 200,
                data: res,
                message: 'success'
          });
        })
});

// add a checkin given a user id and a poi id
router.get('/add', (request, response) => {
        console.log('POI check-in from user:'+request.query.user);
        var query = { poi: parseInt(request.query.poi), user: parseInt(request.query.user), ts: Date(), lat: parseFloat(request.query.lat), lng: parseFloat(request.query.lng) };
        dbcheckins.add(query, function(err, res) {
         response.json(res);
        })
})


module.exports = router;
