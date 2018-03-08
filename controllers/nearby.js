var express = require('express')
var router = express.Router()
var promise = require('bluebird');

const connectionString = {
    host: 'localhost',
    port: 5432,
    database: 'openpoi',
    user: 'poiread',
    password: '2u*yJwd^HG?Rdg86g8gfYC*-F32q&dzx'
};

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var pg = pgp(connectionString);

// middleware that is specific to this router
router.use(function timeLog (req, res, next) {
  console.log('Time: ', Date.now())
  next()
})


router.get('/nearby', (req, res) => {
        res.setHeader('content-type', 'application/json');
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With");
        var q = 'null';
        if ('q' in req.query)
              var q = "'"+req.query.q + "'";
        else
              var q = 'null';

                pg.any('select * from poi_nearby('+parseFloat(req.query.lat)+','+parseFloat(req.query.lng)+','+parseInt(req.query.limit)+','+parseInt(req.query.offset)+','+q+')')
                .then(function (data) {
                    for(var i in data) {
                      data[i].direction = getDirection(data[i].direction);
                      data[i].avatar = 'https://openpoi.org/img/'+getIcon(data[i].osm_cat);
                    }
                        res.status(200)
                          .json({
                                status: 'success',
                                data: data,
                                message: 'Retrieved ALL poi'
                          });
                })
                .catch(function (err) {
                        return next(err);
                });

})

    function getDirection(deg) {
        if(deg < 23 || deg > 337)
                return 'South';
        else if(deg < 68)
                return 'Southwest';
        else if(deg < 113)
                return 'West';
        else if(deg < 158)
                return 'Northwest';
        else if(deg < 203)
                return 'North';
        else if(deg < 248)
                return 'Northeast';
        else if(deg < 293)
                return 'East';
        else
                return 'Southeast';
    }

    function getIcon(icon) {
        if(icon < 10)
                return '01.jpg';
        else if(icon < 18)
                return '02.jpg';
        else if(icon < 23)
                return '04.jpg';
        else if(icon < 30)
                return '05.jpg';
        else if(icon < 36)
                return '06.jpg';
        else if(icon < 46)
                return '07.jpg';
        else if(icon < 48)
                return '08.jpg';
        else if(icon < 59)
                return '09.jpg';
        else if(icon < 73)
                return '10.jpg';
        else if(icon < 110)
                return '11.jpg';
        else if(icon < 137)
                return '12.jpg';
        else if(icon < 159)
                return '13.jpg';
        else
                return '14.jpg';
    }


module.exports = router;
