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

// Process FORM input and put the data on req.body
app.use(express.urlencoded({ extended: true }));

// Signup Route -- create a new user
app.post('/signup', handleSignUp);

// Signin Route -- login with username and password
app.post('/signin', handleSignIn);

// If error is path or method related then throw error 404 else throw error 500
app.use((error, request, response, next) => {
  if (error.path || error.method) {
    error404(error, request, response, next);
  } else {
    error500(error, request, response, next);
  }
});

  module.exports = {
    app,
    start: (port) => {
      app.listen(port, () => {
        console.log('Basic Auth server is running!');
      });
    },
  };
