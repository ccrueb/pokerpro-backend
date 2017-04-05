var engine = require('../engine');

function MatchMaker() {
    //TODO Add two more queues for different ELOs
    this.queue = [];
    this.totalGames = 0;
}

//TODO: Change this. It is a low # to make testing easier
var gameSize = 2;

MatchMaker.prototype.addPlayer = function (joinObj) {

    console.log("Player: " + joinObj.id + " has joined the queue");
    
    //TODO check players elo to put them into the correct queue
    this.queue.push(joinObj);

    //TODO search engine for games that have emtpy seats

    if (this.queue.length >= gameSize) {
        this.totalGames += 1;
        var players = [];

        //Build player objects - eventually this should be queried from DB
        for (var i = 0; i < this.queue.length; i++) {
            players.push({ id: this.queue[i].id, name: this.queue[i].id });
        }

        //Send responses with gameID
        for (var i = 0; i < this.queue.length; i++) {
            this.queue[i].res.send(this.totalGames.toString());
        }

        //Start game
        engine.start(this.totalGames.toString(), players);

        //Empty Q, this is a bad idea for the future because new players may have joined
        this.queue = [];
    }
}

module.exports = new MatchMaker();