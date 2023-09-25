'use strict';

const { UsersModel } = require('./models');
const bcrypt = require('bcrypt');

const handleSignIn = async (request, response, next) => {
  let { username, password } = request.body;
  console.log("username and password: ", username, password)
  try {
    const user = await UsersModel.findOne({ where: { username: username } });
    const valid = await bcrypt.compare(password, user.password);
    if (valid) {
      response.status(200).json(user);
    } else {
      throw new Error('Invalid User');
    }
  } catch (error) {
    response.status(403).send('Invalid Login');
  }
};

const handleSignUp = async (request, response) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);
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
