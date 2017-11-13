var settings = require('../settings');

function Db() {
    db = settings.db;
    host = settings.host;
    port = settings.port;
}

module.exports = Db;
