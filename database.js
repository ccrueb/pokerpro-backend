const mongoose = require('mongoose');
const playerSchema = require('./schemas/player-schema');
mongoUri = require('./config').MONGO_URI;
var MongoDB = mongoose.connect(mongoUri).connection;
MongoDB.on('error', function(err) { console.log(err.message); });

var database = {};
var Player = mongoose.model('player', playerSchema);
database.findPlayer = function(obj, callback) {
    console.log('looking for' + obj.id)
    
    Player.findOne({ 'id': obj.id }, function(err, player){
        if(player === null) {
            player = createPlayer(obj.id);
            
        } 
        player.res = obj.res;
        callback(err, player);
        
    });
};

function createPlayer(id) {
    var player = new Player({
            id: id,
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

    return player;
}


module.exports = database;