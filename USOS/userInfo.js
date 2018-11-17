const request = require('request');
const fs = require('fs');

const getUserID = function (oauth, username, callback) {
    const request_data = {
        url: 'https://usosapps.umk.pl/services/users/search?name=' + encodeURIComponent(username),
        method: 'POST'
    };

    request({
        url: request_data.url,
        method: request_data.method,
        form: oauth.authorize(request_data)
    }, function (error, response, body) {
        const user = JSON.parse(body);
        try {
            callback(JSON.stringify(user.items[0].user_id));
        } catch (error) {
            console.log('Uzytkownik nie istnieje')
        }
    });

};

const getUserInfo = (oauth, body) => {
    const userID = body.slice(1, body.length - 1);
    const request_data = {
        url: `https://usosapps.umk.pl/services/users/user?user_id=${userID}&fields=first_name|last_name|titles|homepage_url|office_hours|room`,
        method: 'POST'
    };

    request({
        url: request_data.url,
        method: request_data.method,
        form: oauth.authorize(request_data)
    }, function (error, response, body) {
        const user = JSON.parse(body);
        console.log(`${user.titles.before} ${user.first_name} ${user.last_name}`);
        console.log('-----');
        console.log(`Godziny konsultacji: ${user.office_hours.pl}`);
        console.log(`Pokój: ${user.room} <- nie działa`);
        console.log(`Strona domowa: ${user.homepage_url}`);
    });
};
module.exports = {
    getUserID,
    getUserInfo
}