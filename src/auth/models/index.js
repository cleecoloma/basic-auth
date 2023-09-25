'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const users = require('./users-model.js');
const SQL_CONNECTION_STRING =
  process.env.SQL_CONNECTION_STRING || 'sqlite:memory:';
const sequelize = new Sequelize(SQL_CONNECTION_STRING);
const UsersModel = users(sequelize, DataTypes);

module.exports = {
  sequelize,
  UsersModel,
};
