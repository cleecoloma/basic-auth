'use strict';

const base64 = require('base-64');

const handleBasicAuth = (request, response, next) => {
  let basicHeaderParts = request.headers.authorization.split(' '); // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop(); // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password
  request.body.username = username;
  request.body.password = password;
  next();
};

module.exports = handleBasicAuth;
