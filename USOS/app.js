// Przed pierwszym uruchomieniem: node i --save
// Przykładowe użycie: node app.js -n 'Jacek Kobus'
const yargs = require('yargs');
const userInfo = require('./userInfo.js');

const argv = yargs
    .options({
        n: {
            demand: true,
            alias: 'name',
            describe: 'Szukaj',
            string: true
        }
    })
    .help()
    .argv;

const username = argv.name;

userInfo.getUserID(username, (id) => {
    if (id !== "") {
        userInfo.getStaffActivities(id, (body) => {
            body = JSON.parse(body);
            console.log("Dzisiejszy plan:");
            console.log("--------------------");
            body.forEach(activity => {
                console.log(activity.name.pl);
                console.log(activity.start_time);
                console.log(activity.end_time);
                console.log(`Sala: ${activity.room_number}`);
                console.log('\n');
            });
        })
    }
});