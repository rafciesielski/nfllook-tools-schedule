var mongoClient = require('mongodb').MongoClient;

var exportSchedule = function(scheduleAsJson) {
    return new Promise((resolve, reject) => {
        mongoClient.connect(process.env.MONGO_DB_URI, function(err, db) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            var schedule = JSON.parse(scheduleAsJson);
            insertSchedule(schedule, db, function() {
                db.close();
                return resolve(schedule._id + ': OK');
            });
        });
    })
}
module.exports = exportSchedule;

var insertSchedule = function(schedule, db, callback) {
    var collection = db.collection('schedule');
    collection.insertOne(schedule, function(err, result) {
        callback(result);
    });
}
