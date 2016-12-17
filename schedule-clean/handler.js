'use strict';

var aws = require('aws-sdk');
var s3 = new aws.S3({
    apiVersion: '2006-03-01'
});
var cleanSchedule = require('./clean_schedule');

module.exports.clean = (event, context, callback) => {

    getS3EventBody(event)
        .then(cleanSchedule)
        .then(putScheduleInS3)
        .then(schedule => {
            console.log("schedule: " + JSON.stringify(schedule));
            callback(null, {
                message: 'Schedule ' + schedule._id + ' cleaned successfully!',
                event
            });
        })
        .catch(err => {
            console.log("Error: " + err);
            callback(null, {
                message: err,
                event
            });
        })
};

function getS3EventBody(s3Event) {
    return new Promise((resolve, reject) => {
        var bucket = s3Event.Records[0].s3.bucket.name;
        var key = s3Event.Records[0].s3.object.key;
        s3.getObject({
            Bucket: bucket,
            Key: key
        }, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(data.Body.toString('utf-8'));
            }
        });
    })
}

function putScheduleInS3(schedule) {
    return new Promise((resolve, reject) => {
        var bucket = 'nfllook-schedule-clean';
        var key = schedule._id + '.json';
        s3.putObject({
            Bucket: bucket,
            Key: key,
            Body: JSON.stringify(schedule)
        }, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(schedule);
            }
        });
    })
}
