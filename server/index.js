// Dependencies 
var engine = require('../engine');
var matchMaker = require('../match-maker');
var app = require('express')();

// Define routes
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

exports = module.exports = app;