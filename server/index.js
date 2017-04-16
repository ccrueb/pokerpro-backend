// Dependencies 
var engine = require('../engine');
var matchMaker = require('../match-maker');
var database = require('../database');
var logger = require('../engine/storage/logger');
var app = require('express')();

// Define routes
/**
 * place bet
 * @param  {number}} gameId: id of game in which player is betting
 * @param  {number} playerId: id of player that's betting
 * @param {number} bet: amount player is betting
 * @return {object}      gamestate object
 */
app.get('/game/:gameId/:playerId/:bet', function (req, res) {
    engine.addRequest(req, res);
});

/**
 * get game object 
 * @param  {number} gameId: id of game we want game object of 
 * @param  {number} playerId: id of player that's in this game
 * @return {object}      gamestate object
 */
app.get('/game/:gameId/:playerId', function (req, res) {
    engine.addRequest(req, res);
});

app.get('/fastgame/:gameId/:playerId', function (req, res) {
    engine.instantGS(req,res);
});

/**
 * player joins matchmaking queue
 * @param  {number} playerId  id of player that wants to join
 * @return {json}   returns gameId that player joined as well as the player object
 */
app.get('/join/:playerId', function (req, res) {
    matchMaker.addPlayer({ id: req.params.playerId, res: res });
});

/**
 * register a new player in the database
 * @param {number} playerId		 facebook id of player
 * @param {string} playerName    username of player
 * @return {object}              returns player object
 */
app.get('/register/:playerId/:playerName', function (req, res) {
	database.createPlayer({id: req.params.playerId, name: req.params.playerName, res: res});
});

/**
 * return player object in database
 * @param  {number} playerId:  id of player
 * @return {object}   player object corresponding to id
 */
app.get('/playerStats/:playerId', function (req, res) {
	database.findPlayerByID(req.params.playerId, function(err, player){
		if(err){
			logger.error(err);
			res.send(err.toString());
			return;
		}
		res.send(player);
	});
});

/**
 * update stat of a player
 * @param  {number} playerId: id of player we want to update
 * @param {number}  avatarId: new avatarId we want to set
 * @return {object} player object
 */
app.get('/changeStat/:playerId/:statName/:statValue', function (req, res){
	database.changeStat(req.params.playerId, req.params.statName, req.params.statValue, function(err, player){
		if(err){
			logger.error(err);
			res.send(err.toString());
			return;
		}
		res.send(player);
	});
});

app.get('/leave/:gameId/:playerId', function (req, res) {
    //TODO remove player from game
});

exports = module.exports = app;