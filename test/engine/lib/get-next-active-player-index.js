var funct = require('../../../engine/poker-engine/lib/get-next-active-player-index');
var playerStatus = require('../../../engine/poker-engine/domain/player-status');
var expect    = require("chai").expect;

var players = [{
    name: 'Cal',
    status: playerStatus.active
  }, {
    name: 'Joey',
    status: playerStatus.folded
  }, {
    name: 'Angus',
    status: playerStatus.active
  }, {
    name: 'Jacob',
    status: playerStatus.out
  }];

describe("Get next active player index", function() {
    it("should skip folded player", function() {
      expect(funct(players, 0)).to.equal(2);
    });
    it("should move from folded to active", function() {
      expect(funct(players, 1)).to.equal(2);
    });
    it("should skip out player", function() {
      expect(funct(players, 2)).to.equal(0);
    }); 
    it("should loop to start of array", function() {
      expect(funct(players, 3)).to.equal(0);
    });    
});
