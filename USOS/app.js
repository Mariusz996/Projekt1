// Przed pierwszym uruchomieniem: node i --save
// Przykładowe użycie: node app.js -n 'Jacek Kobus'

const request = require('request');
const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const yargs = require('yargs');

const consumer = require('./consumer.js');
const user = require('./userInfo.js');

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

const oauth = OAuth({
    consumer: {
        key: consumer.consumer_key,// CONSUMER KEY
        secret: consumer.consumer_secret // CONUMSER SECRET
    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

user.getUserID(oauth, username, (body) => {
    if (body !== "") {
        user.getUserInfo(oauth, body);
    }
});