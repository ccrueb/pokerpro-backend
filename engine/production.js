
'use strict';

//Dependencies
const exec = require('child_process').exec;
const chalk = require('chalk');
const engine = require('./index');
const router = require('./router');
var MatchMaker = require('./matchMaker');

// TODO: This event should be used to reply to all requests in request-queue
// I did not know this existed
engine.on('gamestate:updated', function (data, done) {
  done();
});

//Start router
router.start(engine, new MatchMaker(engine));