const request = require('request');
const fs = require('fs');
const authorization = require('./authorization');

const getUserID = function (username, callback) {
    const request_data = {
        url: 'https://usosapps.umk.pl/services/users/search?name=' + encodeURIComponent(username),
        method: 'POST'
    };

    request({
        url: request_data.url,
        method: request_data.method,
        form: authorization.oauth.authorize(request_data)
    }, function (error, response, body) {
        const user = JSON.parse(body);
        // console.log(user);
        // console.log(user.items[0].user_id);
        callback(JSON.stringify(user.items[0].user_id));
    });

};

const getUserInfo = (id, callback) => {
    const userID = id.slice(1, id.length - 1);

    const request_data = {
        url: `https://usosapps.umk.pl/services/users/user?user_id=${userID}&fields=first_name|last_name|titles|homepage_url|office_hours|room`,
        method: 'POST'
    };

    request({
        url: request_data.url,
        method: request_data.method,
        form: authorization.oauth.authorize(request_data)
    }, function (error, response, body) {
        callback(JSON.parse(body));
    });
};

const getStaffActivities = (id, callback) => {
    id = id.slice(1, id.length - 1);
    const request_data = {
        url: `https://usosapps.umk.pl/services/tt/staff?user_id=${id}&days=1&fields=start_time|end_time|name|room_number`,
        method: 'POST'
    }


    request({
        url: request_data.url,
        method: request_data.method,
        form: authorization.oauth.authorize(request_data)
    }, function (error, response, body) {
        callback(body);
    })
}
module.exports = {
    getUserID,
    getUserInfo,
    getStaffActivities
}