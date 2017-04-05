// Dependencies
var engine = require('../engine');
var matchMaker = require('../match-maker');
var express = require('express');
var http = require('http');
var bodyParser = require('body-parser');

// Set up Express server
var app = express();
var server = http.Server(app);
var port = require('../config').PORT;

// Define routes
app.use(bodyParser.json());

app.get('/game/:gameId/:playerId/:bet', function (req, res) {
    engine.addRequest(req, res);
});

app.get('/game/:gameId/:playerId', function (req, res) {
    engine.addRequest(req, res);
});

app.get('/join/:playerId', function (req, res) {
    matchMaker.addPlayer({ id: req.params.playerId, res: res });
});

app.get('/leave/:gameId/:playerId', function (req, res) {
    //TODO remove player from game
});

// Exported (public) methods
exports = module.exports = {};
exports.listen = function () {
    server.listen(port, function () {
        console.log('Server listening on port', server.address().port);
    });
};

exports.close = function() {
    // TODO
}