var request = require('request');

var downloadWeekSchedule = function(season, week) {
    return new Promise((resolve, reject) => {
        var url = 'http://www.nfl.com/ajax/scorestrip?season=' + season + '&seasonType=REG&week=' + week;
        request(url, function(error, response, body) {
            if (error) {
                console.log(err);
                return reject(err);
            }
            if (response.statusCode == 200) {
                return resolve(body);
            } else {
                return reject(response.statusCode);
            }
        });
    })
}
module.exports = downloadWeekSchedule;
