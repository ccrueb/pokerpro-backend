var engine = require('../engine');
var gameSize = require('../config').GAME_SIZE;

const mongoose = require('mongoose');
const playerSchema = require('../schemas/player-schema');
mongoUri = requre('../config').MONGO_URI;

function MatchMaker() {
    this.engine = engine;
    //TODO Add two more queues for different ELOs
    this.queue = [];
    this.players = [];
    this.totalGames = 0;
}


MatchMaker.prototype.addPlayer = function (joinObj) {

    console.log("Player: " + joinObj.id + " has joined the queue");
    
    //TODO check players elo to put them into the correct queue
    this.queue.push(joinObj);

    //TODO search engine for games that have emtpy seats

    //once queue fills up, find players associated with provided ids
    if (this.queue.length >= gameSize) {
        console.log("starting game");
        this.totalGames += 1;

        //Build player objects - queried from db
        var MongoDB = mongoose.connect(mongoUri).connection;
        MongoDB.on('error', function(err) { console.log(err.message); });
        MongoDB.once('open', this.findPlayers.bind(this));
    }
}

/**
 * queries database for players corresponding with ids
 */
MatchMaker.prototype.findPlayers = function (){
    console.log("finding players");

    var Player = mongoose.model('player', playerSchema);

    // query database for each player
    var promises = [];
    for (var i = 0; i < this.queue.length; i++) {
        console.log("finding player with id %s", this.queue[i].id);
        promises.push(Player.findOne({ 'id': this.queue[i].id }, this.handlePlayer.bind(this, i, Player)));
    }
    Promise.all(promises).then(this.startGame.bind(this))
        .catch(function(error) {
            console.log(error);
            return;
        });
}

/**
 * handles player object returned by database
 * @param  {[type]} err    error message
 * @param  {[type]} player player object returned by database
 */
MatchMaker.prototype.handlePlayer = function(i, Player, err, player) {
    if(err) { console.log(player); return; }

    console.log("handling player: " + player);

    //if player doesn't exist, create a new one
    if(player===undefined || player===null){
        console.log("playerid %s ===undefined!!", this.queue[i].id);
        
        player = new Player({
            id: this.queue[i].id,
            name: "xXP0k3RsLaY3rXx",
            elo: 600,
            handsWon: 0,
            handsLost: 0,
            chipsWon: 0,
            chipsLost: 0
        });

        player.save(function(err,player){
            if (err) {
                console.log("error in creating player: " + err);
                return;
            }
            console.log("successfully created player");
        });
    }
    
    // add player to players list
    console.log("adding player to array: " + player);
    this.players.push(player);
}

/**
 * Starts the game using the players list
 */
MatchMaker.prototype.startGame = function() {
    console.log("starting game");
    //Send responses with gameID
    for (var i = 0; i < this.queue.length; i++) {
        this.queue[i].res.send(this.totalGames.toString() + "; " + this.players[i]);
    }

    //Start game
    engine.start(this.totalGames.toString(), this.players);

    //Empty Q, this is a bad idea for the future because new players may have joined
    this.queue = [];

    //Empty players
    this.players = [];

}

module.exports = new MatchMaker();