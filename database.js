const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'postgres',
  host: 'localhost',
  port: '5432',
  username: 'postgres',
  password: "DDateoiyys2331Z&hh",
  database: 'ddate'
});

module.exports = sequelize;