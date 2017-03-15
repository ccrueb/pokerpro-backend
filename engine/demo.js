
'use strict';

process.env.NODE_ENV = 'demo';

//Dependencies
const exec = require('child_process').exec;
const chalk = require('chalk');
const engine = require('./index');
const router = require('./router');
var MatchMaker = require('./matchMaker');

// TODO: This event should be used to reply to all requests in request-queue
// I did not know this existed
engine.on('gamestate:updated', function (data, done) {
  done();
});

//Start router
router.start(engine, new MatchMaker(engine));

//Put 3 demo players on seperate processes that send requests to port 9000
startDemoPlayer(1);
startDemoPlayer(2);
startDemoPlayer(3);

//Builds a demo player
function startDemoPlayer(i) {
  const child = exec('node ./index.js', { cwd: `./demo-players/external/` }, function (err, stdout, stderr) {
    if (err) {
      console.log(chalk.bold.red('An error occurred while trying to open child process'), err);
    }
  });
  child.stdout.on('data', data => console.log(chalk.bold.gray(`${i}'s stdout:`), data));
  child.stderr.on('data', data => console.log(chalk.bold.red(`${i}'s stderr:`), data));
}