var parseString = require('xml2js').parseString;

var cleanSchedule = function(xmlSchedule) {
    return new Promise((resolve, reject) => {
        parseString(xmlSchedule, function(err, result) {
            if (err) {
                console.log(err);
                return reject(err);
            }
            var schedule = buildCleanSchedule(result.ss.gms[0]);
            return resolve(schedule);
        });
    })
}
module.exports = cleanSchedule;

function buildCleanSchedule(xmlGames) {

    var season = xmlGames['$'].y;
    var week = xmlGames['$'].w;

    var schedule = {};
    schedule._id = season + '_' + week;
    schedule.week = parseInt(week);
    schedule.uploudDate = new Date();
    schedule.games = [];

    xmlGames.g.forEach(function(entry) {
        var game = {};
        game.id = entry['$'].eid;
        game.home = entry['$'].h;
        game.away = entry['$'].v;
        game.dayOfTheWeek = entry['$'].d;
        game.time = entry['$'].t;
        schedule.games.push(game);
    });

    return schedule;
}
