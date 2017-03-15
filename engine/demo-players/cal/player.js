exports = module.exports = {

  VERSION: 'cal folder',

  gs: undefined,
  hasNewMove: false,
  newMoveValue: undefined,

  //TODO: Currently the gamestate is only sent to the player when it is their return
  //We want it sent to the player after every move so the client can update

  bet: function (gamestate) {

    'use strict';
    this.gs = gamestate;
    this.hasNewMove = false;
    return this.newMoveValue;

  },

  getMostRecentGs: function () {
      return this.gs;
  },

  move: function(value) {
    this.newMoveValue = value;
    this.hasNewMove = true;
  }

};