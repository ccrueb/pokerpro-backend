var mongoose = require('mongoose');
var playerSchema = require('./schemas/player-schema');
var logger = require('./engine/storage/logger');
var Player = mongoose.model('player', playerSchema);

// Exported object
var database = {};

//Finds a player based on ID - used by MatchMaker
database.findPlayerByID = function (id, callback) {
    
    logger.info('Search for player ' + id);
    
    Player.findOne({ 'id': id }, function (err, player) {
        if(err) {
            logger.error(err);
            return;
        }
        if (player === null) {
            logger.info('Player ' + id + ' does not exist.');
            callback(new Error('No player found'), null);

        } else {
           logger.info('Player ' + id + ' found.');
           callback(err, player);
        }
    });
};

//Creates a new player
database.createPlayer = function(id) {
    var player = new Player({
        id: id,
        name: "xXP0k3RsLaY3rXx",
        elo: 600,
        handsWon: 0,
        handsLost: 0,
        chipsWon: 0,
        chipsLost: 0
    });

    player.save(function (err, player) {
        if (err) {
            logger.error("error in creating player: " + err);
            return;
        }
        logger.info("successfully created player " + id);
    });

    return player;
};

module.exports = database;