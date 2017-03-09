# pokerpro-backend
The Node.js application which powers Poker Pro

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