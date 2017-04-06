var engine = require('../engine');
var gameSize = require('../config').GAME_SIZE;
var database = require('../database');


//TODO Add two more queues for different ELOs
var queue = [];
var totalGames = 0;

var addPlayer = function (joinObj) {

    //TODO check players elo to put them into the correct queue
    database.findPlayerByID(joinObj.id, function (err, player) {
        
        if(player === null) {
            player = database.createPlayer(joinObj.id);
        }

        player.res = joinObj.res;
        queue.push(player);

        if (queue.length >= gameSize) {
            startGame();
        }
    });
};

/**
 * Starts the game using the players list
 */
function startGame() {
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
    totalGames++;
    engine.start(totalGames.toString(), players);

    //Empty Q, this is a bad idea for the future because new players may have joined by now
    queue = [];

}

module.exports = addPlayer;