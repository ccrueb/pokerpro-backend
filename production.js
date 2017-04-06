'use strict';

//Dependencies
var server = require('./server');
var port = require('./config').PORT;
var logger = require('./engine/storage/logger');


server.listen(port, function () {
    logger.info('Server listening on port', port);
});