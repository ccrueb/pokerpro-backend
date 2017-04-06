var funct = require('../../../engine/poker-engine/domain-utils/should-break');
var expect = require("chai").expect;
var sinon = require('sinon');
var playerStatus = require('../../../engine/poker-engine/domain/player-status');
var allin_ = Symbol.for('is-all-in');

describe("Should break", function() {

    it("should return false if start of round", function() {
        gs = {spinCount: 0};
        funct(gs);
        expect(funct(gs)).to.be.false;
    });

    it("should break if all have called or allin", function() {
        gs = {spinCount: 3,
            callAmount: 10,
            activePlayers: [
                {chipsBet: 10},
                {chipsBet: 5}
            ]
    };

        gs.activePlayers[1][allin_] = true;
        funct(gs);
        expect(funct(gs)).to.be.true;
    });

    it("should not break if someone should bet", function() {
        gs = {spinCount: 3,
            callAmount: 10,
            activePlayers: [
                {chipsBet: 10},
                {chipsBet: 5}
            ]
    };

       
        funct(gs);
        expect(funct(gs)).to.be.false;
    });
    
});