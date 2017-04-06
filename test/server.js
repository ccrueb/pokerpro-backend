var server = require('../server');
var expect    = require("chai").expect;
var chai = require('chai');
var chaiHttp = require('chai-http');

chai.use(chaiHttp);
server.listen(9000);
describe("Server routes", function() {
    
    it("Respond when two players join", function(done) {
        chai.request('http://localhost:9000')
            .get('/join/1')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.gameId).to.equal('1');
                
            });
            chai.request('http://localhost:9000')
            .get('/join/2')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body.gameId).to.equal('1');
            });
            done();
            
      
    });
    
});
