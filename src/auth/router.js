'use strict';

const { UsersModel } = require('./models');
const bcrypt = require('bcrypt');
const base64 = require('base-64');

const handleSignIn = async (request, response) => {
  let basicHeaderParts = request.headers.authorization.split(' '); // ['Basic', 'am9objpmb28=']
  let encodedString = basicHeaderParts.pop(); // am9objpmb28=
  let decodedString = base64.decode(encodedString); // "username:password"
  let [username, password] = decodedString.split(':'); // username, password

  /*
    Now that we finally have username and password, let's see if it's valid
    1. Find the user in the database by username
    2. Compare the plaintext password we now have against the encrypted password in the db
       - bcrypt does this by re-encrypting the plaintext password and comparing THAT
    3. Either we're valid or we throw an error
  */
  try {
    const user = await UsersModel.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      res.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    response.status(403).send('Invalid Login');
  }
};

const handleSignUp = async (request, response) => {
  // console.log('Request body: ', request.body);
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);
    // console.log('Encrypted password: ', request.body.password);
    const record = await UsersModel.create(request.body);
    response.status(200).json(record);
  } catch (e) {
    response.status(403).send('Error Creating User');
  }
};

module.exports = {
  handleSignIn,
  handleSignUp,
};
