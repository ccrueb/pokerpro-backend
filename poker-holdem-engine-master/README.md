# poker-holdem-engine

`poker-holdem-engine` provides an engine to play Texas Hold'em Poker in respect of the [official rules](https://it.wikipedia.org/wiki/Texas_hold_%27em).

Poker here is meant to be played by other programs, which should be listen for POST http request somewhere in the Internet, or on your localhost.

It's used as default poker holdem engine for http://botpoker.org.

## demo

It's possible to run a demo on your local machine by executing the `npm run demo` from the project root folder.

In order to make the demo works you need to specify a connection string for a mongodb instance.

## start a tournament

```
const engine = require('poker-holdem-engine');

const tournamentID = 'botparty';
const players = [
  {
    id: 'r2',
    name: 'r2d2',
    serviceUrl: 'http://127.0.0.1:8080/'
  },
  ...
];

engine.start(tournamentID, players);
```

Players should be object with at least the `name`, `id`, and `serviceUrl` properties specified.

On the specified end point there should be an http server, responding on the `POST /bet`, `GET /`, and `GET /version` routes.

Every time something of interesting happen the message `gamestate:updated` is notified, with a parameter containing further information about the state of the game.

## quit a tournament

```
engine.quit(tournamentID);
```

When the tournament finishes the message `tournament:completed` is notified.

## prepare your player

It's possible to code your player in whatever language you want. In the following example I will use JavaScript.

```
// server.js

'use strict';

const player = require('./player');

const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');

const app = express();
const server = http.Server(app);

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.sendStatus(200);
});

app.get('/version', function(req, res) {
  res.status(200).send(player.VERSION);
});

app.post('/bet', function(req, res) {
  player.bet(req.body, bet => res.status(200).send(bet.toString()));
});


const port = parseInt(process.env['PORT'] || 1337);

server.listen(port, function() {
  console.log('Server listening on port', server.address().port);
});
```

And the player module

```
exports = module.exports = {

  VERSION: 'pokerstar v1',

  bet: function (gamestate, bet) {

    // gamestate contains info about the state of the game.
    // bet is the function you should use to send your bet.

    // currently we just fold every single hand
    return bet(0);

  }

};
```
