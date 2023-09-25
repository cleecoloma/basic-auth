'use strict';

// 3rd Party Resources
const express = require('express');
const { handleSignIn, handleSignUp } = require('./auth/router.js');
const error404 = require('./middleware/404.js')
const error500 = require('./middleware/500.js');

// Prepare the express app
const app = express();

// Process JSON input and put the data on req.body
app.use(express.json());

// const sequelize = new Sequelize(process.env.DATABASE_URL);

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
app.post('/signup', handleSignUp);

// Signin Route -- login with username and password
app.post('/signin', handleSignIn);

// make sure our tables are created, start up the HTTP server.
// sequelize
//   .sync()
//   .then(() => {
//     app.listen(3000, () => console.log('server up'));
//   })
//   .catch((e) => {
//     console.error('Could not start server', e.message);
//   });

  module.exports = {
    app,
    start: (port) => {
      app.listen(port, () => {
        console.log('Basic Auth server is running!');
      });
    },
  };
