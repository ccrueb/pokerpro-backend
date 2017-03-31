var request = require('request');

//ID of the player
var id = getRandomArbitrary(0, 100000);

//ID of game player is in
var gameId;

//Holds the most current gamestate object
var currGs;

//Join game
request('http://127.0.0.1:9000/join/' + id, function (error, response, body) {
    if (!error) {
        gameId = body;

        //This could cause a potential race condition where the gs on the server has
        //not been created yet.
        update();
    }
});

// Determine whether to send bet or request new gamestate
var update = function () {

    if(currGs == null) {
        //Request first gamestate
        console.log('Making first request of the game');
        request('http://127.0.0.1:9000/game/' + gameId + '/' + id, function (error, response, body) {
            if (!error) {
                console.log("New Gamestate received");
                //Save gamestate
                currGs = JSON.parse(body);
                //Recursivly call
                update();
            }
        });
    }

    else if (yourTurn()) {
        //Get bet info from client here
        bet(10);
    } else {
        //Request newest gamestate
        console.log('Requesting game state.')
        request('http://127.0.0.1:9000/game/' + gameId + '/' + id, function (error, response, body) {
            if (!error) {
                console.log("New Gamestate received");
                //Save gamestate
                currGs = JSON.parse(body);
                //Recursivly call
                update();
            }
        });
    }
};

var bet = function (val) {
    console.log('Hmmmmmm what should I do...');
    setTimeout(() => request('http://127.0.0.1:9000/game/' + gameId + '/' + id + '/' + val, function (error, response, body) {
        if (!error) {
            console.log("New Gamestate received");
            //Save gamestate
            currGs = JSON.parse(body);
            //Recursivly call
            update();
        }
    }),5000);
    
};

//Generate a random #. Used to create ID for demo player
function getRandomArbitrary(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

// TODO: Look at currGs and determine if it is your move
function yourTurn() {
    if(parseInt(currGs.currentPlayer) === id) {
        console.log("HEY! It's my turn.");
        return true;
    }

    return false;
}