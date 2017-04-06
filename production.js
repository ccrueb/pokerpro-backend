'use strict';

//Dependencies
var server = require('./server');
var port = require('./config').PORT;
var logger = require('./engine/storage/logger');
var mongoose = require('mongoose');
var mongoUri = require('./config').MONGO_URI;


//Start database
var MongoDB = mongoose.connect(mongoUri).connection;
MongoDB.on('error', function (err) { logger.error(err.message); });

server.listen(port, function () {
    logger.info('Server listening on port', port);
});