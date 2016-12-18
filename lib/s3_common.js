var aws = require('aws-sdk');
var s3 = new aws.S3({
    apiVersion: '2006-03-01'
});

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
module.exports = getS3EventBody;
