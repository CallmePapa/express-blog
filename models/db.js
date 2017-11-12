/**
 * Created by weiqiujuan on 17-11-12.
 */
var settings = require('../settings'),
    Db = require('mysql').Db,
    Connection = require('mysql').Connection,
    Server = require('mysql').Server;
module.exports = new Db(settings.db, new Server(settings.host, settings.port),
    {safe: true});