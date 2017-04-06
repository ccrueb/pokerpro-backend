var funct = require('../../../engine/poker-engine/domain-utils/assign-cards');
var expect = require("chai").expect;
var sinon = require('sinon');
var playerStatus = require('../../../engine/poker-engine/domain/player-status');

var hasDB = Symbol.for('has-dealer-button');

describe("Assign cards", function() {
    it("should assign two cards to each active player", function() {
        var cal = { name: 'cal', status: playerStatus.active, cards: [] };
        var angus = { name: 'angus', status: playerStatus.active, cards: [] };
        var jacob = { name: 'jacob', status: playerStatus.out, cards: [] };
        var garret = { name: 'garret', status: playerStatus.active, cards: [] };

        cal[hasDB] = true;
        var gamestate = {
            dealerButtonIndex: 0,
            players: [cal, angus, jacob, garret]
        };

        funct(gamestate);

        gamestate.players
            .filter(player => player.status == playerStatus.active)
            .forEach(function(player) {
                expect(player.cards.length).to.equal(2);
            });

        expect(jacob.cards.length).to.equal(0);

        var deck_ = Symbol.for('cards-deck');
        expect(gamestate[deck_].length).to.equal(46);

    });
});