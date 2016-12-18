'use strict';

var aws = require('aws-sdk');
var s3 = new aws.S3({
    apiVersion: '2006-03-01'
});

var downloadWeekSchedule = require('./lib/download_schedule');

module.exports.download = (event, context, callback) => {
    downloadAndPutInS3SeasonSchedule(new Date().getFullYear())
        .then(putsStatusList => {
            console.log("S3 Puts status list: " + putsStatusList);
            callback(null, {
                message: putsStatusList,
                event
            });
        }).catch(err => {
            console.log("Error: " + err);
            callback(null, {
                message: err,
                event
            });
        })
};

function downloadAndPutInS3SeasonSchedule(season) {
    return new Promise((resolve, reject) => {
        var promises = [];
        for (var weekNo = 1; weekNo <= 17; weekNo++) {
            promises.push(downloadAndPutInS3WeekSchedule(season, weekNo));
        }
        Promise.all(promises).then(putsStatusList => {
            return resolve(putsStatusList);
        }).catch(err => {
            console.log("Error: " + err);
            return reject(err);
        });
    })
}

function downloadAndPutInS3WeekSchedule(season, weekNo) {
    return new Promise((resolve, reject) => {
        downloadWeekSchedule(season, weekNo)
            .then(xmlSchedule => putScheduleInS3(season, weekNo, xmlSchedule))
            .then(putStatus => {
                return resolve(putStatus);
            }).catch(err => {
                console.log("Error: " + err);
                return reject(err);
            });
    })
}

function putScheduleInS3(season, week, xmlSchedule) {
    return new Promise((resolve, reject) => {
        var bucket = 'nfllook-schedule-raw';
        var key = season + '_' + week + '.xml';
        s3.putObject({
            Bucket: bucket,
            Key: key,
            Body: xmlSchedule
        }, function(err, data) {
            if (err) {
                return reject(err);
            } else {
                return resolve(key + ': OK');
            }
        });
    })
}
