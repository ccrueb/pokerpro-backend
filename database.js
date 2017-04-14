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
            callback(err, null);
        }
        else if (player === null) {
            callback(new Error('No player found'), null);

        } 
        else {
           logger.info('Player ' + id + ' found.');
           callback(err, player);
        }
    });
};

//Creates a new player
database.createPlayer = function(playerObj) {
	logger.info("creating player...");
    var player = new Player({
        id: playerObj.id,
        name: playerObj.name,
        elo: 600,
        avatarId: 0,
        handsWon: 0,
        handsLost: 0,
        chipsWon: 0,
        chipsLost: 0
    });

    player.save(function (err, player) {
        if (err) {
            logger.error("error in creating player: " + err);
            playerObj.res.send(err);
            return;
        }
        logger.info("successfully created player " + playerObj.id);
        playerObj.res.send(player);
    });
};

//changes player's avatar
database.changeAvatar = function(playerId, avatarId, callback){
	logger.info("changing avatar...");
	Player.findOneAndUpdate({ id : playerId }, { avatarId: avatarId }, { new: true }, function(err, player){
		if(err) {
            callback(err, null);
        }
        else if (player === null) {
            callback(new Error('No player found'), null);

        }
        else {
           logger.info('Updated avatarId');
           callback(err, player);
        }
	});
};

module.exports = database;