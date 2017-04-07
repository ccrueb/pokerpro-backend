# pokerpro-backend
The Node.js application which powers Poker Pro

# Build and run
The following instructions show how to get up and running with our project:

To clone and install enter the following commands in the terminal
```
git clone https://github.com/ccrueb/pokerpro-backend.git
cd pokerpro-backend
npm install
```
To run the application, from the root of the project directory
```
node production.js
```
This will spin up an HTTP server on localhost listening to port 9000. Through the browser one can interact with the engine using the endpoint specified in the **server** module.
To run tests, from the root of the project
```
npm test
```
This will run all of the Mocha tests that are written in the **test** directory. Also an istanbul code-coverage report will be produced. To view that open the **index.html** file found in **docs/coverage-report**.

# server info
The server is hosted on Digital Ocean. Cal has the login info to access the digital ocean dashboard.
The server was configured using the following [guide](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-16-04). 
To ssh into the server...

```ssh dev@104.131.99.193```
when it prompts for password: ```poker506```

# Resources about building a secure API
[Stack Overflow about handing OAuth on the frontend](http://stackoverflow.com/questions/33860262/how-to-interact-with-back-end-after-successfull-auth-with-oauth-on-front-end)

# Resources on putting a Nodejs application into production
[Article on things not to do](https://hashnode.com/post/10-things-you-shouldnt-do-while-running-nodejs-in-production-cisab2fyu0s9oth5341faywcw)

# Random thoughts
- API calls should be done over HTTPS to prevent man in the middle attacks. This might cost $$ to get the SSL certificate. 
- This is an entire poker engine written in Node. If we get stuck on any part this is great [reference](https://github.com/brunoscopelliti/poker-holdem-engine) 
