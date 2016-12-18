'use strict';

var aws = require('aws-sdk');
var s3 = new aws.S3({
    apiVersion: '2006-03-01'
});

var getS3EventBody = require('./lib/s3_common');
var exportSchedule = require('./lib/export_schedule');

module.exports.export = (event, context, callback) => {
    getS3EventBody(event)
        .then(exportSchedule)
        .then(exportResult => {
            console.log("Export result: " + exportResult);
            callback(null, {
                message: 'Export result: " + exportResult',
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
