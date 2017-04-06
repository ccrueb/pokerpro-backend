var funct = require('../../../engine/poker-engine/domain-utils/reset-gamestate');
var expect = require("chai").expect;
var sinon = require('sinon');
var playerStatus = require('../../../engine/poker-engine/domain/player-status');

describe('reset-gamestate', function() {
    it('should setup initial conditions for a new hand', function() {

        var gamestate = {
            pot: 300,
            sidepots: [{
                quote: 50,
                amount: 150
            }, {
                quote: 75,
                amount: 150
            }],
            callAmount: 50,
            commonCards: [{
                rank: 'K',
                type: 'C'
            }, {
                rank: '9',
                type: 'D'
            }, {
                rank: 'A',
                type: 'S'
            }],
            players: [{
                name: 'arale',
                status: playerStatus.out,
                chipsBet: 0
            }, {
                name: 'bender',
                status: playerStatus.folded,
                chipsBet: 50,
                cards: [{
                    rank: '5',
                    type: 'D'
                }, {
                    rank: '4',
                    type: 'S'
                }],
                bestCombination: [{
                    rank: '5',
                    type: 'D'
                }, {
                    rank: '4',
                    type: 'S'
                }, {
                    rank: 'K',
                    type: 'C'
                }, {
                    rank: '9',
                    type: 'D'
                }, {
                    rank: 'A',
                    type: 'S'
                }],
                bestCombinationData: {
                    strength: 64,
                    rank: 'A',
                    kickers: ['2']
                }
            }, {
                name: 'marvin',
                status: playerStatus.active,
                [Symbol.for('is-all-in')]: true
            }]
        };


        funct(gamestate);

        expect(gamestate.pot).to.equal(0);
        expect(gamestate.callAmount).to.equal(0);
        expect(gamestate.commonCards.length).to.equal(0);
        expect(gamestate.sidepots.length).to.equal(0);

        var arale = gamestate.players.find(x => x.name == 'arale');

        expect(arale.status).to.equal(playerStatus.out);


        var bender = gamestate.players.find(x => x.name == 'bender');

        expect(bender.chipsBet).to.equals(0);
        expect(bender.status).to.equals(playerStatus.active);
        expect(bender.cards.length).to.equals(0);
        expect(bender.bestCombination.length).to.equals(0);
        expect(bender.bestCombinationData).to.equals(null);


        var marvin = gamestate.players.find(x => x.name == 'marvin');

        expect(marvin[Symbol.for('is-all-in')]).to.be.undefined;
    });

});