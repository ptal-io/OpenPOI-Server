var db = require('./db')

// get checkins
exports.get =  function(query, cb) {
  var collection = db.get().collection("tags")
  console.log(query);
  collection.find(query, {_id:0}).limit(1).sort({$natural:-1}).toArray( function(err, result) {
    cb(err,result);
  })
}

// add checkin
exports.add = function(query, cb) {
  var collection = db.get().collection("tags")
  collection.insertOne(query, function(err, result) {
    cb(err,result);
  });
}