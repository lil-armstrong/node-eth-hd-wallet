'use strict'
const { Sequelize, Model, DataTypes } = require('sequelize');
const models = require('../models');

module.exports = {
  name: "postgresql",
  version: "1.0.0",
  register: async (server, options)=>{
    const {host, database :{dialect, name, user, password}} = options;
    const sequelize = new Sequelize(name, user, password, {
      dialect,
      logging: (...msg) => console.log(msg),
    });

    try {
      await sequelize.authenticate();
      server.expose('db', sequelize);
      await models.register(sequelize)

      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  }
}
