'use strict';

const handleSignUp = async (request, response) => {
  try {
    request.body.password = await bcrypt.hash(request.body.password, 10);
    const record = await Users.create(request.body);
    response.status(200).json(record);
  } catch (e) {
    response.status(403).send('Error Creating User');
  }
};

module.exports = handleSignUp;
