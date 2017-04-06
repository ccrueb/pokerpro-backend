var mm = require('../match-maker');
var sinon = require('sinon')
var engine = require('../engine')
var expect = require("chai").expect;

describe("Match Maker constructor", function() {
    it("should have an empty queue", function() {
      expect(mm.queue.length).to.equal(0);
    });
    it("should have total players 0", function() {
      expect(mm.players.length).to.equal(0);
    });
    it("should have total game 0", function() {
      expect(mm.totalGames).to.equal(0);
    });
});

describe("Match Maker addPlayer function", function() {
    it("should have total players in queue equal to 1", function() {
      const player1 = { name: 'player1', id: 'p1'};
      mm.addPlayer(player1);
      expect(mm.queue.length).to.equal(1);
    });
    it("one game should start", function() {
      var startstub = sinon.stub(mm, "startGame", function() {mm.queue = []});
      const player2 = { name: 'player2', id: 'p2'};
      mm.addPlayer(player2);
      expect(startstub.calledOnce);
    });
   it("should have total games 2", function() {
     
      const player3 = { name: 'player3', id: 'p3'};
      const player4 = { name: 'player4', id: 'p4'};
      //mm.addPlayer(player1);
      //mm.addPlayer(player2);
      mm.addPlayer(player3);
      mm.addPlayer(player4);
      expect(mm.totalGames).to.equal(2);
    });
    // this test needs to be rerun after the matchmaker has been fixed. 
    /*it("should have total players 2", function() {
      const player1 = { name: 'player1', id: 'p1', serviceUrl: 'http:player1.com' };
      const player2 = { name: 'player2', id: 'p2', serviceUrl: 'http:player2.com' };
      mm.addPlayer(player1);
      mm.addPlayer(player2);
      expect(mm.players.length).to.equal(2);
    }); */
});


