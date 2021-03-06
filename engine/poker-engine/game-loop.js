
'use strict';

const config = require('../config');

const logger = require('../storage/logger');

const gameStatus = require('./domain/tournament-status');
const playerStatus = require('./domain/player-status');


const runSetupTasks = require('./setup-tasks');
const runTeardownTasks = require('./teardown-tasks');

const play = require('./bet-loop');



exports = module.exports = function* dealer(gs){

  function sleep(time) {
    return new Promise(res => setTimeout(res, time));
  }

  function waitResume() {
    return new Promise(function(res, rej) {
      const time = setInterval(function() {
        if (gs.tournamentStatus == gameStatus.play){
          res(clearInterval(time));
        }
      }, 5000);
    });
  }

  while (gs.tournamentStatus != gameStatus.stop){

    const activePlayers = gs.activePlayers;
    const foldedPlayers = gs.players.filter(player => player.status == playerStatus.folded);


    //Game is over
    if (activePlayers.length + foldedPlayers.length === 1){


      logger.info('Game %d has ended.', gs.tournamentId);

      gs.tournamentStatus = gameStatus.stop;
      continue;
    }






    gs.handUniqueId = `${gs.pid}_${gs.tournamentId}_${gs.gameProgressiveId}-${gs.handProgressiveId}`;

    logger.info('Starting hand %d/%d', gs.gameProgressiveId, gs.handProgressiveId, { tag: gs.handUniqueId });



    //
    // break here until the tournament is resumed
    if (gs.tournamentStatus == gameStatus.pause){
      logger.info('Pause on hand %d/%d', gs.gameProgressiveId, gs.handProgressiveId, { tag: gs.handUniqueId });
      yield waitResume();
    }


    if (gs.tournamentStatus == gameStatus.play || gs.tournamentStatus == gameStatus.latest){

      // setup the hand:
      // restore the initial condition for a new hand, pot,
      // blinds, ante, cards ...

      runSetupTasks(gs);

      // play the game
      // each player will be asked to make a bet,
      // until only one player remains active, or
      // the hand arrive to the "river" session

      yield* play(gs);


      // find the winner of the hand, eliminated players, ...
      // and updates accordingly the gamestate

      yield* runTeardownTasks(gs);

    }


    //
    // this is the gs.handProgressiveId° hand played
    // this info is important to compute the blinds level
    gs.handProgressiveId++;

  }

};