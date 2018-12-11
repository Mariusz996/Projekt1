const OAuth = require('oauth-1.0a');
const crypto = require('crypto');
const consumer = require('./consumer.js');

const oauth = OAuth({
    consumer: {
        key: consumer.consumer_key,
        secret: consumer.consumer_secret

    },
    signature_method: 'HMAC-SHA1',
    hash_function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
    }
});

module.exports.oauth = oauth;