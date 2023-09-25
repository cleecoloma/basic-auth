'use strict';

const supertest = require('supertest');
const server = require('../src/server.js');
const { sequelize } = require('../src/auth/models');
const request = supertest(server.app);

// don't rely on the signup test to work, in order to pass the sign in test
// beforeAll(); // sync db here
// beforeEach(); // create any records required for tests to pass.
// afterEach(); // drop tables / delete records for records that get created between tests
// afterAll(); //drop the tables in the DB

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Testing our auth server', () => {
  test('Will this return a 404 error - bad path', async () => {
    let response = await request.get('/notAnEndpoint');

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Error 404 - Incorrect Path');
  });

  test('Will this return a 404 error - bad method', async () => {
    let response = await request.patch('/signin');

    expect(response.status).toEqual(404);
    expect(response.body.message).toEqual('Error 404 - Incorrect Method');
  });

  test('User should be able to create an account', async () => {
    let createUserResponse = await request.post('/signup').send({
      username: 'Koko',
      password: 'OnlyDogsAllowed',
    });
    expect(createUserResponse.status).toEqual(200);
    expect(createUserResponse.body.username).toEqual('Koko');
  });

  test('User should be able to login to an existing account', async () => {
    let createUserResponse = await request.post('/signup').send({
      username: 'Jojo',
      password: 'DogsGreaterThanCats',
    });

    const username = 'Jojo';
    const password = 'DogsGreaterThanCats';

    let signInUserResponse = await request
      .post('/signin')
      .auth(username, password);

    expect(signInUserResponse.status).toEqual(200);
    expect(signInUserResponse.body.username).toEqual('Jojo');
  });
});
