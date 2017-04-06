//Hashes a requests from players. Player: key, request: value

exports = module.exports = function sendResponses(gs) {
      
      gs.players.forEach(function(p) {
          if(gs.requests.get(p.id) != null) {
            gs.requests.get(p.id).res.status(200).send(p.getGs(gs));
            gs.requests.set(p.id, null);
          }     
      }, this);
      
};