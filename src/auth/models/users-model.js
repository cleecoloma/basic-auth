 'use strict';

const UsersModel = (sequelize, DataTypes) => sequelize.define('User', {
   username: {
     type: DataTypes.STRING,
     allowNull: false,
   },
   password: {
     type: DataTypes.STRING,
     allowNull: false,
   },
 });

 module.exports = UsersModel;