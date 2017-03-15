//Hashes a requests from players. Player: key, request: value

exports = module.exports = {

  sendResponses: function(gs) {
      
      gs.players.forEach(function(p) {
          if(gs.requests.get(p.id) != null) gs.requests.get(p.id).res.status(200).send(p.getGs(gs));    
      }, this);

      //Clear requests
      gs.requests = new Map();
  }
};