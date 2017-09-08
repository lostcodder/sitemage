var MongoClient = require('mongodb').MongoClient
var url = config.db.url;

MongoClient.connect(url, function(err, db) {
    if (err) console.log(err);

    global.db = db
    require('./controllers/')
});