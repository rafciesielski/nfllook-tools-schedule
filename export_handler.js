'use strict';

var aws = require('aws-sdk');
var s3 = new aws.S3({
    apiVersion: '2006-03-01'
});

var exportSchedule = require('./lib/export_schedule');

module.exports.export = (event, context, callback) => {

};
