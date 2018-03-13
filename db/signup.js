var db = require('./db')

exports.get =  function(query, cb) {
      var collection = db.get().collection("users")
      collection.find().count(function(err, result) {
        query.id = result;
        console.log(query);
        collection.insert(query,{projection:{username:1, _id:0, id:1}}, function(err, result) {
	        cb(err,result);
	     })
      })
      // query.id = collection.find().count()
      // console.log(query)
      
}
