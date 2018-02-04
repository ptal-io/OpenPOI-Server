var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

var checks = {

  doNothing: function(query) {
    return query;
  },

  getCheckins: function(query) {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("openpoi");
      
      dbo.collection("checkins").aggregate([
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
        if (err) throw err;
        db.close();
        return result;
     });
    });
  },

  addCheckin: function(query) {

    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("openpoi");
      
      dbo.collection("checkins").insertOne(query, function(err, result) {
        if (err) throw err;
        db.close();
        return result;
     });
    });
  }
}

module.exports = checks;