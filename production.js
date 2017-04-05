'use strict';

//Dependencies
const server = require('./server');

// const chalk = require('chalk');

// const mongoose = require('mongoose');
// const gameSchema = require('./schemas/game-schema');
// const playerSchema = require('./schemas/player-schema');

// mongoUri = 'mongodb://104.131.99.193/store';




//Start server
server.listen();




// //connect to mongodb
// function connect(connectionString) {
// 	return new Promise(function(res, rej){
// 		mongoose.connect(connectionString);
// 		mongoose.connection.on('error', function(err){
// 			console.log(chalk.bold.red('Thread cant connect to mongo:'), error.message);
// 			console.log(chalk.bold.red('>'));
// 			rej(err);
// 		});
// 		mongoose.connection.once('open', function() {
// 			res();
// 		});
// 	});
// }


// connect(mongoUri)
//   .then(function() {

//     console.log(chalk.bold.green('Connected to mongoDB'));


//     const Game = mongoose.model('game', gameSchema);

//     function saveUpdates(data, done){
//       //[,data.tournamentId, data.gameId, data.handId] = data.handId.match(/^[\d]+_([a-z,-\d]+)_([\d]+)-([\d]+)$/i);
//       let entry = new Game(data);
//       entry.save(function(err, savedData){
//         if(err){
//           console.log(chalk.bold.red(`An error occurred while saving ${data.type} updates.`));
//           console.log(err.message);
//         }
//         done();
//       });
//     }


//     const Player = mongoose.model('player', playerSchema);

//     function savePlayer(data, done){
//       let entry = new Player(data);
//       entry.save(function(err, savedData){
//         if(err){
//           console.log(chalk.bold.red(`An error occurred while saving ${data.type} updates.`));
//           console.log(err.message);
//         }
//         done();
//       });
//     }



//     engine.on('tournament:aborted', function() {
//       console.log(chalk.bold.red('Tournament aborted.'));
//     });

//     engine.on('tournament:completed', function() {
//       console.log(chalk.bold.gray('Tournament completed.'));
//     });

//     engine.on('gamestate:updated', function(data, done) {
//       saveUpdates(data, done);
//     });

// });
