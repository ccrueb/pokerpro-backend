var funct = require('../../../engine/poker-engine/lib/get-next-player-index');
var expect    = require("chai").expect;

var players = [{name: "Cal"}, {name: "Steven"}, {name: "Angus"}];

describe("Get next player index", function() {
    it("should increment by one", function() {
      expect(funct(players, 0)).to.equal(1);
    });
    it("should loop to 0", function() {
      expect(funct(players, 2)).to.equal(0);
    });   
});
