var funct = require('../../../engine/poker-engine/domain-utils/player-factory');
var expect = require("chai").expect;
var sinon = require('sinon');
var playerStatus = require('../../../engine/poker-engine/domain/player-status');

var request = require('request');
var engine = require('../../../engine');
var config = require('../../../engine/config');

//var getSymbol = require('../../test-utils/get-symbol');
var isAllin_ = Symbol.for('is-all-in');
var update_ = Symbol('internal-update-method');


describe('Player factory', function () {
    it('cant create invalid player', function () {
        var player = funct({ name: 'arale' });
        expect(player).to.be.null;
    });

    it('should create new player', function () {
        var player = funct({ name: 'arale', id: 'a1'});

  expect(player.id).to.equal('a1');
  expect(player.name).to.equal('arale');

  expect(player.status).to.equal('active');
  expect(player.chips).to.equal(config.BUYIN);
  expect(player.chipsBet).to.equal(0);
  expect(player.cards).to.be.a('array');
  expect(player.fold).to.be.a('function');
  expect(player.payBet).to.be.a('function');
  expect(player.pay).to.be.a('function');
  expect(player.talk).to.be.a('function');
    });

    it('should have its gamestate updated', function () {
        var arale = funct({ name: 'arale', id: 'a1'});

  var bender = funct({ name: 'bender', id: 'b2'});

  var marvin = funct({ name: 'marvin', id: 'm3'});
  marvin.chips = 50;

  var gamestate = { pot: 150, sidepots: [], callAmount: 100, players: [arale, bender, marvin] };

  arale.update(gamestate, 100);

 expect(arale[isAllin_]).to.equal(false);
 expect(arale.chipsBet).to.equal(100);
 expect(arale.chips).to.equal(400);
 expect(gamestate.pot).to.equal(250);
 expect(gamestate.callAmount).to.equal(100);
 expect(gamestate.sidepots.length).to.equal(0);;

 bender.update(gamestate, 300);

 expect(bender[isAllin_]).to.equal(false);
 expect(bender.chipsBet).to.equal(300);
 expect(bender.chips).to.equal(200);
 expect(gamestate.pot).to.equal(550);
 expect(gamestate.callAmount).to.equal(300);
 expect(gamestate.sidepots.length).to.equal(0);



  marvin.update(gamestate, 50);

 expect(marvin[isAllin_]).to.equal(true);
 expect(marvin.chipsBet).to.equal(50);
 expect(marvin.chips).to.equal(0);
 expect(gamestate.pot).to.equal(600);
 expect(gamestate.callAmount).to.equal(300);
 expect(gamestate.sidepots.length).to.equal(2);
 expect(gamestate.sidepots[0].quote).to.equal(50);
 expect(gamestate.sidepots[0].amount).to.equal(150);
 expect(gamestate.sidepots[1].quote).to.equal(300);
 expect(gamestate.sidepots[1].amount).to.equal(300);

    });

    describe('Player pay()', function () {


     it('player pay call internal bet method', function () {
          var gamestate = {};
  var player = funct({ name: 'arale', id: 'a1'});

  var updateStub = sinon.stub(player, "update");

  var duedAmount = 50;

  expect(player.chips).is.above(duedAmount);

  player.pay(gamestate, duedAmount);

  expect(updateStub.calledOnce);
  expect(updateStub.calledWith(gamestate, duedAmount));

     });

     it('player never pay more than he owns', function () {
          var gamestate = {};
  var player = funct({ name: 'arale', id: 'a1'});
  player.chips = 40;

  var updateStub = sinon.stub(player, "update");

  var duedAmount = 50;

  expect(player.chips).is.below(duedAmount);

  player.pay(gamestate, duedAmount);

  expect(updateStub.calledOnce);
  expect(updateStub.calledWith(gamestate, player.chips));

     });

    });

});

 describe('Player fold()', function () {


     it('update player status to "folded"', function (done) {
          var gamestate = {};
  var player = funct({ name: 'arale', id: 'a1'});

  engine.once('gamestate:updated', function(data){
    expect(player.status).to.equal();
    expect(data.type).to.equal();
    expect(data.playerId).to.equal();
    expect(data.status).to.equal();

    done();
  });

  player.fold(gamestate);

     });


    });




// tape('player#payBet', t => t.end());

// tape('bet amount is less than player call amount', function(t) {

//   t.comment('unless he is betting all his chips, the bet is treated as a fold.');

//   var gamestate = { callAmount: 100 };
//   var player = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   player.chips = 1000;

//   var foldStub = sinon.stub(player, 'fold');

//   player.payBet(gamestate, 50);

//   t.ok(foldStub.calledOnce);
//   t.end();

// });

// tape('bet amount is less than player call amount', function(t) {

//   t.comment('but since is an allin bet, the player does not fold.');

//   var gamestate = { callAmount: 100 };
//   var player = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   player.chips = 50;

//   var updateStub = sinon.stub(player, getSymbol(Object.getPrototypeOf(player), 'internal-update-method'));
//   var foldStub = sinon.stub(player, 'fold');

//   player.payBet(gamestate, 50);

//   t.ok(!foldStub.called);
//   t.ok(updateStub.calledOnce);
//   t.ok(updateStub.calledWith(gamestate, 50));
//   t.end();

// });


// tape('bet amount is a call', function(t) {

//   var gamestate = { callAmount: 100, lastRaiseAmount: 200 };
//   var player = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   player.chips = 1000;
//   player.chipsBet = 50;

//   var updateStub = sinon.stub(player, getSymbol(Object.getPrototypeOf(player), 'internal-update-method'));

//   player.payBet(gamestate, 50);

//   t.ok(updateStub.calledOnce);
//   t.ok(updateStub.calledWith(gamestate, 50));
//   t.equal(player[hasTalked_], true);
//   t.equal(gamestate.lastRaiseAmount, 200);
//   t.end();

// });


// tape('a player cant raise an amount he has already called', function(t) {

//   t.comment('the attempt to raise is treated as a simple call.');

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });
//   arale[hasTalked_] = true;
//   arale.chips = 1000;
//   arale.chipsBet = 80;

//   var bender = sut({ name: 'bender', id: 'b2', serviceUrl: 'http:bender.com' });
//   bender[hasTalked_] = true;

//   var gamestate = { callAmount: 100, players: [arale, bender] };

//   var updateStub = sinon.stub(arale, getSymbol(Object.getPrototypeOf(arale), 'internal-update-method'));

//   arale.payBet(gamestate, 200);

//   t.ok(updateStub.calledOnce);
//   t.ok(updateStub.calledWith(gamestate, 20));
//   t.equal(arale[hasTalked_], true);
//   t.equal(bender[hasTalked_], true);
//   t.end();

// });

// tape('bet amount is a raise, but less than min raise amount', function(t) {

//   t.comment('the attempt to raise is treated as a simple call.');

//   var gamestate = { callAmount: 100, lastRaiseAmount: 20 };

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });
//   arale.chips = 1000;
//   arale.chipsBet = 20;

//   var updateStub = sinon.stub(arale, getSymbol(Object.getPrototypeOf(arale), 'internal-update-method'));

//   arale.payBet(gamestate, 90);

//   t.ok(updateStub.calledOnce);
//   t.ok(updateStub.calledWith(gamestate, 80));
//   t.equal(arale[hasTalked_], true);
//   t.equal(gamestate.lastRaiseAmount, 20);
//   t.end();

// });

// tape('bet amount is a raise, but less than min raise amount and the player is all-in', function(t) {

//   t.comment('an allin bet that is not greater than the minimum raise amount doesnt reopen the pot.');

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });
//   arale.chips = 90;
//   arale.chipsBet = 20;

//   var bender = sut({ name: 'bender', id: 'b2', serviceUrl: 'http:bender.com' });
//   bender[hasTalked_] = true;

//   var updateStub = sinon.stub(arale, getSymbol(Object.getPrototypeOf(arale), 'internal-update-method'));

//   var gamestate = { callAmount: 100, lastRaiseAmount: 20, players: [arale, bender] };

//   arale.payBet(gamestate, 90);

//   t.ok(updateStub.calledOnce);
//   t.ok(updateStub.calledWith(gamestate, 90));
//   t.equal(arale[hasTalked_], true);
//   t.equal(bender[hasTalked_], true);
//   t.equal(gamestate.lastRaiseAmount, 20);
//   t.end();

// });

// tape('bet amount is a proper raise', function(t) {

//   t.comment('the players who have already talked, can eventually re-reaise');

//   // lastRaiseAmount: is the amount of the raise;
//   // it's computed by applying the formula: playerChipsBet + betAmount - callAmount

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });
//   arale.chips = 1000;
//   arale.chipsBet = 20;

//   var bender = sut({ name: 'bender', id: 'b2', serviceUrl: 'http:bender.com' });
//   bender[hasTalked_] = true;

//   var gamestate = { callAmount: 100, lastRaiseAmount: 20, players: [arale, bender] };

//   var updateStub = sinon.stub(arale, getSymbol(Object.getPrototypeOf(arale), 'internal-update-method'));

//   arale.payBet(gamestate, 200);

//   t.ok(updateStub.calledOnce);
//   t.ok(updateStub.calledWith(gamestate, 200));
//   t.equal(arale[hasTalked_], true);
//   t.equal(bender[hasTalked_], undefined);
//   t.equal(gamestate.lastRaiseAmount, 120);
//   t.end();

// });

// tape('bet amount is a proper raise, but too high', function(t) {

//   // the bet amount is always normalized to maximum amount owned by the player

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });
//   arale.chips = 1000;
//   arale.chipsBet = 50;

//   var bender = sut({ name: 'bender', id: 'b2', serviceUrl: 'http:bender.com' });
//   bender[hasTalked_] = true;

//   var gamestate = { callAmount: 100, lastRaiseAmount: 20, players: [arale, bender] };

//   var updateStub = sinon.stub(arale, getSymbol(Object.getPrototypeOf(arale), 'internal-update-method'));

//   arale.payBet(gamestate, 2500);

//   t.ok(updateStub.calledOnce);
//   t.ok(updateStub.calledWith(gamestate, 1000));
//   t.equal(arale[hasTalked_], true);
//   t.equal(bender[hasTalked_], undefined);
//   t.equal(gamestate.lastRaiseAmount, 950);
//   t.end();

// });




// tape('player#talk', t => t.end());

// tape('check json', function(t) {

//   var postStub = sinon.stub(request, 'post');

//   var gamestate = {
//     tournamentId: 'test-tournament',
//     gameProgressiveId: 1,
//     handProgressiveId: 2,
//     spinCount: 1,
//     callAmount: 40,
//     pot: 60,
//     sidepots: [],
//     sb: 20,
//     dealerButtonIndex: 1,
//     commonCards: [{rank:'A', type:'C'}, {rank:'A', type:'D'}, {rank:'K', type:'H'}],
//     players: []
//   };

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });
//   var bender = sut({ name: 'bender', id: 'b2', serviceUrl: 'http:bender.com' });


//   arale.cards = [{rank:'A', type:'H'}, {rank:'A', type:'S'}];
//   arale.chipsBet = 20;

//   bender.cards = [{rank:'2', type:'H'}, {rank:'7', type:'S'}];
//   bender.chipsBet = 40;
//   bender[Symbol.for('has-dealer-button')] = true;

//   gamestate.players.push(arale, bender);

//   arale.talk(gamestate);

//   t.ok(postStub.calledOnce, 'called arale service');


//   var infoKnownByArale = postStub.getCall(0).args[1].body;

//   t.equal(infoKnownByArale.tournamentId, 'test-tournament', 'check tournament');
//   t.equal(infoKnownByArale.game, 1, 'check game');
//   t.equal(infoKnownByArale.hand, 2, 'check round');
//   t.equal(infoKnownByArale.spinCount, 1, 'check spinCount');
//   t.equal(infoKnownByArale.buyin, 500, 'check buyin');

//   t.equal(infoKnownByArale.me, 0, 'check index');
//   t.equal(infoKnownByArale.db, 1, 'check dealerbutton index');

//   t.equal(infoKnownByArale.callAmount, 20, 'callAmount is 0');
//   t.equal(infoKnownByArale.minimumRaiseAmount, 60, 'minimumRaiseAmount is 60');

//   t.equal(infoKnownByArale.pot, 60, 'pot is 60');
//   t.equal(infoKnownByArale.sidepots.length, 0, 'pot is 60');
//   t.equal(infoKnownByArale.sb, 20, 'smallblind is 20');

//   t.equal(infoKnownByArale.commonCards.length, 3), 'arale knows common cards';

//   t.equal(infoKnownByArale.players[0].cards.length, 2), 'arale knows his cards';
//   t.equal(infoKnownByArale.players[1].cards, undefined), 'arale don\'t know bender\'s cards';

//   infoKnownByArale.players.forEach(function(player) {
//     ['name', 'id', 'status', 'chips', 'chipsBet']
//       .forEach(prop => t.ok(player.hasOwnProperty(prop), 'check player visible property'));
//   });

//   postStub.reset();

//   bender.talk(gamestate);
//   t.ok(postStub.calledOnce, 'called bender service');

//   var infoKnownByBender = postStub.getCall(0).args[1].body;

//   t.equal(infoKnownByBender.tournamentId, 'test-tournament', 'check tournament');
//   t.equal(infoKnownByBender.game, 1, 'check game');
//   t.equal(infoKnownByBender.hand, 2, 'check round');
//   t.equal(infoKnownByBender.spinCount, 1, 'check spinCount');
//   t.equal(infoKnownByBender.buyin, 500, 'check buyin');

//   t.equal(infoKnownByBender.me, 1, 'check index');
//   t.equal(infoKnownByBender.db, 1, 'check dealerbutton index');

//   t.equal(infoKnownByBender.callAmount, 0, 'callAmount is 0');

//   t.equal(infoKnownByBender.minimumRaiseAmount, 40, 'minimumRaiseAmount is 40');
//   t.equal(infoKnownByBender.pot, 60, 'pot is 60');
//   t.equal(infoKnownByBender.sb, 20, 'smallblind is 20');

//   t.equal(infoKnownByBender.commonCards.length, 3), 'bender knows common cards';

//   t.equal(infoKnownByBender.players[1].cards.length, 2), 'bender knows his cards';
//   t.equal(infoKnownByBender.players[0].cards, undefined), 'bender don\'t know bender\'s cards';

//   infoKnownByBender.players.forEach(function(player) {
//     ['name', 'id', 'status', 'chips', 'chipsBet']
//       .forEach(prop => t.ok(player.hasOwnProperty(prop), 'check player visible property'));
//   });

//   postStub.restore();

//   t.end();

// });

// tape('when server request fail, default bet is 0', function(t) {

//   var postStub = sinon.stub(request, 'post');

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   postStub.yields({ message: 'Internal Server Error' });
//   arale.talk({ players: [] })
//     .then(function(betAmount){
//       t.equal(betAmount, 0);

//       postStub.restore();
//       t.end();
//     });

// });

// tape('before the promise is resolved, the amount is sanitized (negative number)', function(t) {

//   var postStub = sinon.stub(request, 'post');
//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   postStub.yields(null, {}, '-50');
//   arale.talk({ players: [] })
//     .then(function(betAmount){
//       t.equal(betAmount, 0);

//       postStub.restore();
//       t.end();
//     });

// });

// tape('before the promise is resolved, the amount is sanitized (NaN)', function(t) {

//   var postStub = sinon.stub(request, 'post');
//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   postStub.yields(null, {}, 'hello');
//   arale.talk({ players: [] })
//     .then(function(betAmount){
//       t.equal(betAmount, 0);

//       postStub.restore();
//       t.end();
//     });

// });

// tape('before the promise is resolved, the amount is sanitized (Infinity is treated as NaN)', function(t) {

//   var postStub = sinon.stub(request, 'post');
//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   postStub.yields(null, {}, 'Infinity');
//   arale.talk({ players: [] })
//     .then(function(betAmount){
//       t.equal(betAmount, 0);

//       postStub.restore();
//       t.end();
//     });

// });

// tape('before the promise is resolved, the amount is sanitized (valid amount)', function(t) {

//   var postStub = sinon.stub(request, 'post');
//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   postStub.yields(null, {}, '100');
//   arale.talk({ players: [] })
//     .then(function(betAmount){
//       t.equal(betAmount, 100);

//       postStub.restore();
//       t.end();
//     });

// });




// tape('player#showdown', t => t.end());

// tape('return data about the strongest combination', function(t) {

//   var arale = sut({ name: 'arale', id: 'a1', serviceUrl: 'http:arale.com' });

//   arale.cards = [
//     { rank: 'A', type: 'S' },
//     { rank: 'A', type: 'D' },
//   ];

//   var poker = arale.showdown([
//     { rank: '9', type: 'D' },
//     { rank: '5', type: 'D' },
//     { rank: 'K', type: 'D' },
//     { rank: 'A', type: 'C' },
//     { rank: 'A', type: 'H' }
//   ]);

//   var expectedStrongestCombination = [{ rank: 'A', type: 'S' }, { rank: 'A', type: 'D' }, { rank: 'K', type: 'D' }, { rank: 'A', type: 'C' }, { rank: 'A', type: 'H' }];

//   t.deepEqual(poker, expectedStrongestCombination);
//   t.deepEqual(arale.bestCombination, expectedStrongestCombination);

//   t.end();
// });
