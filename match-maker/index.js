var engine = require('../engine');
var gameSize = require('../config').GAME_SIZE;
var database = require('../database');
var logger = require('../engine/storage/logger');


//TODO Add two more queues for different ELOs
var matchMaker = {
    queue: [],
    totalGames: 0
};

matchMaker.addPlayer = function (joinObj) {

    logger.info("adding player...");

    //TODO check players elo to put them into the correct matchMaker.queue
    database.findPlayerByID(joinObj.id, function (err, player) {
        
        if(err) {
            logger.error(err);
            joinObj.res.send(err.toString());
            return;
        }

        player.res = joinObj.res;
        matchMaker.queue.push(player);

        if (matchMaker.queue.length >= gameSize) {
            matchMaker.startGame();
        }
    });
};

/**
 * Starts the game using the players list
 */
matchMaker.startGame = function() {
    // increment total games
    matchMaker.totalGames++;

    //Send responses with gameID
    var players = [];
    for (var i = 0; i < gameSize; i++) {
        players.push(matchMaker.queue[i]);
        matchMaker.queue[i].res.send({
            gameId: matchMaker.totalGames.toString(),
            playerInfo: players[i]
        });
    }
     
    //Start game
    engine.start(matchMaker.totalGames.toString(), players);

    //Empty Q, this is a bad idea for the future because new players may have joined by now
    matchMaker.queue = [];

};

module.exports = matchMaker;