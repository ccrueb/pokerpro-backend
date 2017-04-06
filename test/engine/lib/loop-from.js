var funct = require('../../../engine/poker-engine/lib/loop-from');
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var done_ = Symbol('done');

var players = [{name: "Cal"}, {name: "Steven"}, {name: "Angus"}];
describe("Loop from", function() {
    it("should be called by the correct players", function() {
      var spy = sinon.spy();
      
      funct(players, 2, spy);
      expect(spy.getCall(0)).to.have.been.calledWith({name: "Cal"}, 0);
      expect(spy.getCall(1)).to.have.been.calledWith({name: "Steven"}, 1);
      expect(spy.getCall(2)).to.have.been.calledWith({name: "Angus"}, 2);
    });
    
    it("should start with the next index given", function() {
      var spy = sinon.spy();
      funct(players, 0, spy);
      expect(spy.getCall(0)).to.have.been.calledWith({name: "Steven"}, 1);
    });

    it("should remove the _done value afterwards", function() {
      var spy = sinon.spy();
      funct(players, 0, spy);
      players.forEach(function(player){
          expect(player[done_]).to.be.undefined;
      });
    });   
});
