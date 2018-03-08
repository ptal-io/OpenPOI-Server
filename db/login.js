var db = require('./db')

exports.get =  function(query, update, cb) {
      var collection = db.get().collection("users")
      collection.findOneAndUpdate(query,update,{projection:{username:1, _id:0, id:1}}, function(err, result) {
        cb(err,result);
     })
}
