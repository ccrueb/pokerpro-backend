var MatchMaker = require('../match-maker');
var engine = require('../engine');
var expect    = require("chai").expect;

describe("Match Maker constructor", function() {
    it("should have an empty queue", function() {
      var mm = new MatchMaker(engine);
      expect(mm.queue.length).to.equal(0);
    });
    it("should have total game 0", function() {
      var mm = new MatchMaker(engine);
      expect(mm.totalGames).to.equal(0);
    });
    
});
