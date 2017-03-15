'use strict';

const player = require('./player');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);
const port = Number.parseInt(process.env.PORT);

app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.status(200).send('200 OK');
});

app.get('/version', function (req, res) {
  res.status(200).send(player.VERSION);
});

app.post('/bet', function (req, res) {

  console.log("Waiting for Cals move..");

  //Check every 100ms if new move has arrived
  var interval = setInterval(function () {
    if (player.hasNewMove) {
      //Clear timer and interval
      clearInterval(interval);
      clearTimeout(timer);
      
      res.status(200).send(player.bet(req.body).toString());
    }
  }, 100);

  //If no move recieved in 15 seconds send 0
  var timer = setTimeout(function () {
    //Clear timer and interval
    clearInterval(interval);
    clearTimeout(timer);

    console.log("cal ran out of time to move");
    res.status(200).send('0');
      
  }, 15 * 1000);
});

app.get('/update', function (req, res) {
  res.status(200).send(player.getMostRecentGs());
});

app.post('/move/:val', function (req, res) {
  player.move(req.params.val);
  res.status(200).send("Move sent: " + req.params.val);
});

server.listen(port, function () {
  console.log('Server listening on port', server.address().port);
});
