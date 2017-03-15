
'use strict';

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
const port = 9000;

exports = module.exports = {
    start: function (engine, matchMaker) {
        app.use(bodyParser.json());

        app.get('/game/:gameId/:playerId/:bet', function (req, res) {
            engine.addRequest(req, res);
        });

        app.get('/game/:gameId/:playerId', function (req, res) {
            engine.addRequest(req, res);
        });

        app.get('/join/:playerId', function (req, res) {
            matchMaker.addPlayer({id: req.params.playerId, res: res});   
        });

        server.listen(port, function () {
            console.log('Server listening on port', server.address().port);
        });
    }
}