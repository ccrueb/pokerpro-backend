
'use strict';

const winston = require('winston');

const config = require('../config');

var logger;

if (process.env.NODE_ENV !== 'test') {
    logger = new (winston.Logger)({
        transports: [
            new winston.transports.Console({ colorize: true }),
            new (winston.transports.File)({filename: 'production.log' })
        ]
    });
} else {
    // while testing, log only to file, leaving stdout free for unit test status messages
    logger = new (winston.Logger)({
        transports: [
            new (winston.transports.File)({ filename: '.logs/test.log' })
        ]
    });
}

winston.addColors({ error: 'red', warn: 'yellow', info: 'green', verbose: 'magenta', debug: 'magenta', silly: 'white' });


// set the verbosity
// i am using the default levels: { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }
logger.level = config.LOG_LEVEL;

exports = module.exports = logger;
