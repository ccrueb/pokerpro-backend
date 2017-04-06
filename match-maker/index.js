var engine = require('../engine');
var gameSize = require('../config').GAME_SIZE;
var database = require('../database');


//TODO Add two more queues for different ELOs
var queue = [];
var totalGames = 0;

var addPlayer = function (joinObj) {

    console.log("Player: " + joinObj.id + " has joined the queue");

    //TODO check players elo to put them into the correct queue
    database.findPlayer(joinObj, function (err, player) {
        console.log("player pushed");
        queue.push(player);

        if (queue.length >= gameSize) {
            console.log("starting game");
            totalGames += 1;
            startGame();
        }
    });

}

/**
 * Starts the game using the players list
 */
function startGame() {
    console.log("starting game");
    //Send responses with gameID
    var players = [];
    for (var i = 0; i < gameSize; i++) {
        players.push(queue[i]);
        queue[i].res.send({
            gameId: totalGames.toString(),
            playerInfo: players[i]
        });
    }
     
    //Start game
    engine.start(totalGames.toString(), players);

    //Empty Q, this is a bad idea for the future because new players may have joined
    queue = [];

}

module.exports = addPlayer;