'use strict';

//Dependencies
const engine = require('./engine');
const server = require('./server');
var MatchMaker = require('./match-maker');

//Start router
server.start(engine, new MatchMaker(engine));