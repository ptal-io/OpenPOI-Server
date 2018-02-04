var db = require('./db')

exports.get =  function(query, cb) {
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
             as: 'userdetails'
           }
         }
      ]).toArray(function(err, result) {
        cb(err,result);
     })
}
