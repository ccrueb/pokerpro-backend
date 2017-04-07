var mm = require('../match-maker');
var db = require('../database');
var sinon = require('sinon')
var engine = require('../engine')
var expect = require("chai").expect;

describe("Match maker", function() {
    
    it("should have an empty queue", function() {
      expect(mm.queue).is.array;
      expect(mm.queue.length).to.equal(0);
    });
    
    it("should have 0 total games", function() {
      expect(mm.totalGames).to.equal(0);;
    });

    describe("Match maker addPlayer function", function() {
    it("should hit the database when a new player joins", function() {
      var dbStub = sinon.stub(db, 'findPlayerByID').callsFake(function(obj,cb) {cb(null, {})});

      mm.addPlayer({name: 'Cal', res: 2});

      expect(dbStub.calledOnce);
      dbStub.restore();
    });
    
    

    it("should start the game when second player joins", function() {
      var startstub = sinon.stub(mm, "startGame").callsFake(function() {mm.totalGames++,mm.queue = []}); 
      const player2 = { name: 'player2', id: 'p2'};
      mm.addPlayer(player2);
      expect(startstub.calledOnce);
    });

    it("should create new player if none found", function() {
      var dbStub = sinon.stub(db, 'findPlayerByID').callsFake(function(obj,cb) {cb(null, null)});
      var createStub = sinon.stub(db, 'createPlayer').callsFake(function(obj,cb) {return {}});

      mm.addPlayer({name: 'Cal', res: 2});

      expect(dbStub.calledOnce);
    });
   
   it("should have two games", function() {
     
      const player3 = { name: 'player3', id: 'p3'};
      const player4 = { name: 'player4', id: 'p4'};
      
      mm.addPlayer(player3);
      mm.addPlayer(player4);
      expect(mm.totalGames).to.equal(2);
    });
});

describe("Match maker startGame function", function() {
    it("should clear queue", function() {
      
      mm.startGame();

      expect(mm.queue.length).to.equal(0);
    });
    it("should increment total games", function() {
      var initalValue = mm.totalGames;
      mm.startGame();
      
      expect(mm.totalGames).to.be.above(initalValue);
    });
});
});




