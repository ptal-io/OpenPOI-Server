var db = require('./db')

// get checkins
exports.get =  function(query, limit, offset, cb) {
  var collection = db.get().collection("checkins")
  collection.aggregate([
    {
      $match: query
    },
    { $lookup:
       {
         from: 'users',
         localField: 'user',
         foreignField: 'id',
         as: 'details'
       }
    },
    { "$unwind": "$details" },
    { "$project": 
      {
        "_id": 0,
        "user": 1,
        "poi": 1,
        "ts": 1,
        "details.photo": 1,
        "details.name": 1
      } 
    }
  ]).skip(offset).limit(limit).toArray(function(err, result) {
    cb(err,result);
  })
}

// add checkin
exports.add = function(query, cb) {
  var collection = db.get().collection("checkins")
  collection.insertOne(query, function(err, result) {
    cb(err,result);
  });
}