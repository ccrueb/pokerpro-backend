var funct = require('../../../engine/poker-engine/domain-utils/should-bet');
var expect = require("chai").expect;
var sinon = require('sinon');
var playerStatus = require('../../../engine/poker-engine/domain/player-status');


describe("Should Bet", function() {

    it("only active player can bet", function() {
        var spy = sinon.spy();
        funct({}, { status: playerStatus.folded }, spy);
        expect(spy.notCalled);
    });

    it("all-in player cant bet anymore", function() {
        var spy = sinon.spy();

        funct({}, { status: playerStatus.active, [Symbol.for('is-all-in')]: true }, spy);

        expect(spy.notCalled);
    });

    it("a player who has bet less than the callAmount, has always the right to call", function() {
        var spy = sinon.spy();

        funct({ callAmount: 100, players: [] }, { status: playerStatus.active, chipsBet: 50 }, spy);

        expect(spy.calledOnce);
        expect(spy.calledWith({ status: playerStatus.active, chipsBet: 50 }));
    });

    it('a player, who has bet the callAmount, cant bet more', function() {
        var spy = sinon.spy();

        var gamestate = { callAmount: 50, players: [] };
        var player = { id: 1, status: playerStatus.active, chipsBet: 50, [Symbol.for('has-talked')]: true };

        funct(gamestate, player, spy);

        expect(spy.notCalled);

    });

    it("a player who has bet the callAmount, cant bet more when there arent other active players", function() {
        var spy = sinon.spy();

        var gamestate = {
            callAmount: 50,
            players: [
                { status: playerStatus.active, [Symbol.for('is-all-in')]: true },
                { status: playerStatus.folded },
                { status: playerStatus.out }
            ]
        };

        funct(gamestate, { id: 2, status: playerStatus.active, chipsBet: 50 }, spy);

        expect(spy.notCalled);


    });

    it("a player, who has bet the callAmount, can re-raise if someone raised after him", function() {
        var spy = sinon.spy();

        var gamestate = {
            callAmount: 50,
            players: [{ status: playerStatus.active }]
        };

        funct(gamestate, { id: 2, status: playerStatus.active, chipsBet: 50 }, spy);

        expect(spy.calledOnce);
        expect(spy.calledWith({ id: 2, status: playerStatus.active, chipsBet: 50 }));

    });
});